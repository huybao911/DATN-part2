const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Event = require("../models/Event");
const EventStorage = require("../models/EventStorage");
const ApplyJob = require("../models/ApplyJob");
const JobEvent = require("../models/JobEvent");

exports.register = async (req, res, next) => {
  const { username, email, password, role, department, fullName, birthday, mssv, classUser, phone, address } = req.body;

  if (!username || !email || !password || !role)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const userObj = { username, email, role, department, fullName, birthday, mssv, classUser, phone, address };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    let getRole = await Role.findById(userObj.role);

    let getDepartment = await Department.findById(userObj.department);

    const token = sign({ user, getRole, getDepartment }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(200)
      .json(getRole.keyRole === "user" ? { token, user: { ...user._doc, password: null, fullName: null, birthday: null, mssv: null, classUser: null, phone: null, address: null }, getRole } : getRole.keyRole === "admin" ? { token, admin: { ...user._doc, password: null }, getRole }: getRole.keyRole === "smanager" ? { token, smanager: { ...user._doc, password: null }, getRole } : { token, manager: { ...user._doc, password: null }, getRole }) //role: getRole, department: getDepartment

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).lean();
    let getRole = await Role.findById(user.role);
    let getDepartment = await Department.findById(user.department);

    if (!user) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { email, password, resetPass } = req.body;
  if (!email || !password || !resetPass)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(400).send("Gmail does not exist");
    const hashedPwd = await hash(password, 12);
    const passwordObj = {
      password: hashedPwd,
    };
    const isMatch = await compare(resetPass, passwordObj.password);
    if (!isMatch) return res.status(400).send("Mật khẩu không trùng khớp");
    const newPass = await User.findOneAndUpdate(
      { email: user.email },
      { password: passwordObj.password },
      { new: true }
    );
    return res.status(200).json(newPass);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    let getRole = await Role.findById(user.role);
    let getDepartment = await Department.findById(user.department);
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ user: { ...user }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getEvents = async (req, res) => {
  const smanagerRole = await User.find({ role: "640cc3c229937ffacc4359f8" });
  const smanagerEvent = await Event.find({ approver: smanagerRole }).populate("poster").populate("approver");
  try {
    return res.status(200).json(smanagerEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.storageEvent = async (req, res) => {
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const eventStorage = await Event.findById({ _id: id });
  try {
    if (!eventStorage) {
      throw new Error("Event does not exist");
    }
    const existingEventStorage = await EventStorage.findOne({ eventId: eventStorage, userId: userStorage, });

    if (existingEventStorage) {
      throw new Error("Event is already storage");
    }

    const newEventStorage = new EventStorage({
      eventId: eventStorage,
      userId: userStorage,
    });
    await newEventStorage.save();

    res.status(200).json(newEventStorage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.unstorageEvent = async (req, res) => {
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const eventStorage = await Event.findById({ _id: id });
  try {
    if (!eventStorage) {
      throw new Error("Event does not exist");
    }
    const RemoveEventStorage = await EventStorage.findOne({ eventId: eventStorage, userId: userStorage });

    if (!RemoveEventStorage) {
      throw new Error("Event is already not storage");
    }
    await RemoveEventStorage.remove();

    res.status(200).send("EventStorage has been deleted");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getEventStorage = async (req, res) => {
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const findEventStorage = await EventStorage.find({ userId: userStorage }).populate("userId").populate({ path: "eventId", populate: [{ path: "poster" }] });
  try {
    return res.status(200).json(findEventStorage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.applyJob = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const jobUserApply = await JobEvent.findById({ _id: id });
  try {
    if (!jobUserApply) {
      throw new Error("ApplyJob does not exist");
    }
    const existingJobUserApply = await ApplyJob.findOne({ jobId: jobUserApply, userId: userApplyJob, });

    if (existingJobUserApply) {
      throw new Error("ApplyJob is already apply");
    }

    const newJobUserApply = new ApplyJob({
      jobId: jobUserApply,
      userId: userApplyJob,
    });
    await newJobUserApply.save();

    res.status(200).json(newJobUserApply);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.unapplyJob = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const jobUserApply = await JobEvent.findById({ _id: id });
  try {
    if (!jobUserApply) {
      throw new Error("ApplyJob does not exist");
    }
    const RemoveJobUserApply = await ApplyJob.findOne({ jobId: jobUserApply, userId: userApplyJob });

    if (!RemoveJobUserApply) {
      throw new Error("ApplyJob is already not apply");
    }
    await RemoveJobUserApply.remove();

    res.status(200).send("ApplyJob has been deleted");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getJobApplyJob = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  const findJobUserApply = await ApplyJob.find({ userId: userApplyJob }).populate("userId").populate({ path: "jobId", populate: [{ path: "event" }] });
  try {
    return res.status(200).json(findJobUserApply);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getProfileUser = async (req, res, next) => {
  const userProfile = await User.findById(req?.user?._id).populate("role").populate("department");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    return res.status(200).json([userProfile]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, department, fullName, birthday, mssv, classUser, phone, address } = req.body;
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const profileUserObj = {
      username: username,
      email: email,
      department: department,
      fullName: fullName,
      birthday: birthday,
      mssv: mssv,
      classUser: classUser,
      phone: phone,
      address: address,
    };
    const newProfileUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        username: profileUserObj.username,
        email: profileUserObj.email,
        department: profileUserObj.department,
        fullName: profileUserObj.fullName,
        birthday: profileUserObj.birthday,
        mssv: profileUserObj.mssv,
        classUser: profileUserObj.classUser,
        phone: profileUserObj.phone,
        address: profileUserObj.address,
      },
      { new: true }
    );
    return res.status(200).json(newProfileUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    return res.status(200).json(await Department.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};