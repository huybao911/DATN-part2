const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const Department = require("../models/Department");
const ApplyJob = require("../models/ApplyJob");
const Event = require("../models/Event");
const JobEvent = require("../models/JobEvent");
paginate = require("../util/paginate");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const manager = await User.findOne({ username }).lean();
    let getRole = await Role.findById(manager.role);

    if (!manager) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "manager")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, manager.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ manager, getRole }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, manager, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().populate("role").populate("department"));
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.getUser = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id).populate("role").populate("department");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json([managerUser]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthManager = async (req, res, next) => {
  try {
    const manager = await User.findById(req?.manager?._id).select("-password").lean();
    let getRole = await Role.findById(manager.role);
    let getDepartment = await Department.findById(manager.department);
    if (!manager)
      return res.status(400).send("Manager not found, Authorization denied..");
    return res.status(200).json({ manager: { ...manager }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getEvent = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerEvent = await Event.find({ poster: managerUser._id }).populate("poster").populate("approver").populate("departmentEvent").populate({ path: "comments", populate: [{ path: "commenter" }] });
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(managerEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.createEvent = async (req, res) => {
  const { nameEvent,comments, job, location, dayStart, dayEnd, image } = req.body;
  const managerUser = await User.findById(req?.manager?._id);
  const managerDepartment = await Department.findOne({ _id: managerUser.department });
  const imagePath = image.replace(/^.*\\/, "");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    if (!nameEvent || !location || !dayStart || !dayEnd ||!image)
    return res.status(400).send("Please fill in all the required fields!")
    const newEvent = new Event({
      nameEvent,
      poster: managerUser,
      approver: null,
      comments,
      job,
      location,
      departmentEvent:managerDepartment,
      dayStart,
      dayEnd,
      image: imagePath,
    });
    await newEvent.save();

    return res
      .status(200)
      .json(newEvent)
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const getJobEvent = await JobEvent.find({event:id});
  const getQuantity = getJobEvent.map((job) => job.quantity);
  const sumQuantity = getQuantity.reduce((a,b) => a+b);

  const getTotalJob = getJobEvent.map((job) => job.total);
  const sumTotalJob = getTotalJob.reduce((a,b) => a+b);
  
  const { nameEvent, poster, approver, location, dayStart, dayEnd, image } = req.body;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    const event = await Event.findById(id).lean();
    if (!event) return res.status(400).send("Event does not exist");
    const eventObj = {
      nameEvent: nameEvent,
      poster: poster,
      approver: approver,
      quantityUser: sumQuantity,
      job: getJobEvent,
      location: location,
      costs: sumTotalJob,
      dayStart: dayStart,
      dayEnd: dayEnd,
      image:image,
    };
    const newEvent = await Event.findByIdAndUpdate(
      { _id: id },
      {
        nameEvent: eventObj.nameEvent,
        poster: eventObj.poster,
        approver: eventObj.approver,
        quantityUser: eventObj.quantityUser,
        job: eventObj.job,
        location: eventObj.location,
        costs: eventObj.costs,
        dayStart: eventObj.dayStart,
        dayEnd: eventObj.dayEnd,
        image: eventObj.image,
      },
      { new: true }
    );
    return res.status(200).json(newEvent);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    await Event.deleteOne({ _id: id });
    return res.status(200).send("Event has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobEvents = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerEvent = await Event.find({ departmentEvent: managerUser.department}).populate("departmentEvent");
  const managerJobEvent = await JobEvent.find({ event: managerEvent}).populate("event");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(managerJobEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createNewJobEvent = async (req, res) => {
  const { nameJob,event, quantity, unitPrice, jobDescription} = req.body;
  totalJob = quantity * unitPrice;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    if (!nameJob || !event || !quantity ||!unitPrice ||!jobDescription) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    const NewJobEvent = new JobEvent({
      nameJob: nameJob,
      event: event,
      quantity: quantity,
      quantityRemaining: quantity,
      unitPrice: unitPrice,
      total: totalJob,
      jobDescription: jobDescription,
    });
    await NewJobEvent.save();

    res.status(200).json(NewJobEvent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateJobEvent = async (req, res, next) => {
  const { id } = req.params;
  const { nameJob,event, quantity,quantityRemaining, unitPrice, jobDescription} = req.body;
  totalJob = quantity * unitPrice;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    const jobEvent = await JobEvent.findById(id).lean();
    if (!jobEvent) return res.status(400).send("JobEvent does not exist");
    const jobEventObj = { 
      nameJob: nameJob,
      event: event,
      quantity:quantity,
      quantityRemaining: quantityRemaining,
      unitPrice:unitPrice,
      total:totalJob,
      jobDescription:jobDescription,
     };
    const newJobEvent = await JobEvent.findByIdAndUpdate(
      { _id: id },
      { 
        nameJob: jobEventObj.nameJob,
        event: jobEventObj.event,
        quantity: jobEventObj.quantity,
        quantityRemaining: jobEventObj.quantityRemaining,
        unitPrice: jobEventObj.unitPrice,
        total: jobEventObj.total,
        jobDescription: jobEventObj.jobDescription,
       },
      { new: true }
    );
    return res.status(200).json(newJobEvent);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteJobEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    await JobEvent.deleteOne({ _id: id });
    return res.status(200).send("JobEvent has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobUserApply = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerPost = await Event.find({ poster: managerUser._id }).populate("poster");
  const managerJob = await JobEvent.find({ event: managerPost }).populate("event");
  const findJobUserApply = await ApplyJob.find({ jobId: managerJob, applyStatus:"Chờ phê duyệt" }).populate({ path: "jobId", populate: [{ path: "event" }] }).populate("userId");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(findJobUserApply);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCTV = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerPost = await Event.find({ poster: managerUser._id }).populate("poster");
  const managerJob = await JobEvent.find({ event: managerPost }).populate("event");
  const findCTV = await ApplyJob.find({ jobId: managerJob, applyStatus:"Duyệt" }).populate({ path: "jobId", populate: [{ path: "event" }] }).populate("userId");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(findCTV);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.approveUserApplyJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    const applyJob = await ApplyJob.findById(id).lean();
    const jobEvent = await JobEvent.findById(applyJob.jobId);
    quantityRe = jobEvent.quantityRemaining - 1;
    const event = await Event.findById(jobEvent.event);
    const getJobEvent = await JobEvent.find({event:event._id});
    if (!applyJob) return res.status(400).send("ApplyJob does not exist");
    const applyJobObj = { 
      applyStatus: "Duyệt",
      notiApplyJob:"Bạn đã ứng tuyển thành công",
     };
     const eventObj = {
      job: getJobEvent,
    };
    const newApplyJob = await ApplyJob.findByIdAndUpdate(
      { _id: id },
      { 
        applyStatus: applyJobObj.applyStatus,
        notiApplyJob: applyJobObj.notiApplyJob,
       },
      { new: true }
    );
    await JobEvent.findByIdAndUpdate(
      { _id: jobEvent._id },
      { 
        quantityRemaining: quantityRe,
       },
       { new: true }
    );
    await Event.findByIdAndUpdate(
      { _id: event._id },
      {
        job: eventObj.job,
      },
      { new: true }
    );
    return res.status(200).json(newApplyJob);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.unapproveUserApplyJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    const applyJob = await ApplyJob.findById(id).lean();
    if (!applyJob) return res.status(400).send("ApplyJob does not exist");
    const applyJobObj = { 
      applyStatus: "Không Duyệt",
      notiApplyJob:"Bạn đã ứng tuyển thất bại",
     };
    const newApplyJob = await ApplyJob.findByIdAndUpdate(
      { _id: id },
      { 
        applyStatus: applyJobObj.applyStatus,
        notiApplyJob: applyJobObj.notiApplyJob,
       },
      { new: true }
    );
    return res.status(200).json(newApplyJob);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};



