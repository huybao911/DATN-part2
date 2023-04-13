const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const Department = require("../models/Department");
const Post = require("../models/Post");
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

exports.createPost = async (req, res) => {
  const { title, content, image, event, jobEvent, comments } = req.body;
  const { id } = req.params;
  const userPost = await User.findById({ _id: id });
  const imagePath = image.replace(/^.*\\/, "");
  
  if (!title || !content || !image || !event || !jobEvent)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const newPost = new Post({
      poster: userPost,
      approver: null,
      comments,
      title,
      content,
      event,
      jobEvent,
      image: imagePath,
    });
    await newPost.save();

    if (!req.manager) return res.status(400).send("You dont have permission");
    return res
      .status(200)
      .json(newPost)
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// exports.getPost = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!req.manager) return res.status(400).send("You dont have permission");
//     return res.status(200).json(await Post.findById({_id:id}).populate("poster"));
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

exports.getPost = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerPost = await Post.find({ poster: managerUser._id }).populate("poster").populate("event").populate("jobEvent").populate({ path: "comments", populate: [{ path: "commenter" }] });
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(managerPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.getPosts = async (req, res) => {
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(await Post.find().populate("poster").populate("approver"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { poster, approver, title, content, image } = req.body;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    const post = await Post.findById(id).lean();
    const imagePath = image.replace(/^.*\\/, "");
    if (!post) return res.status(400).send("Post does not exist");
    const postObj = {
      poster: poster,
      approver: approver,
      title: title,
      content: content,
      image: imagePath,
    };
    const newPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        poster: postObj.poster,
        approver: postObj.approver,
        title: postObj.title,
        content: postObj.content,
        image: postObj.image,
      },
      { new: true }
    );
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    await Post.deleteOne({ _id: id });
    return res.status(200).send("Post has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getEvents = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerEvent = await Event.find({ departmentEvent: managerUser.department }).populate("departmentEvent");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(managerEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getPostUserApply = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerPost = await Post.find({ poster: managerUser._id }).populate("poster");
  const findPostUserApply = await ApplyJob.find({ postId: managerPost }).populate({ path: "postId", populate: [{ path: "event" }] }).populate("userId");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(findPostUserApply);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobEvents = async (req, res) => {
  const managerUser = await User.findById(req?.manager?._id);
  const managerEvent = await Event.find({ departmentEvent: managerUser.department}).populate("departmentEvent");
  const managerJobEvent = await JobEvent.find({ eventId: managerEvent}).populate("eventId");
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    return res.status(200).json(managerJobEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};
