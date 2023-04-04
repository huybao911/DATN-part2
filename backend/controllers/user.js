const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Post = require("../models/Post");

exports.register = async (req, res, next) => {
  const { username, email, password, role, department } = req.body;

  if (!username || !email || !password || !role)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const userObj = { username, email, role, department };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    let getRole = await Role.findById(userObj.role);

    let getDepartment = await Department.findById(userObj.department);
    // userObj.department = getDepartment;

    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(201)
      .json(getRole.keyRole === "user" ? { token, user: { ...user._doc, password: null }, getRole } : { token, admin: { ...user._doc, password: null }, getRole }) //role: getRole, department: getDepartment

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    let getRole = await Role.findById(user.role);

    if (!user) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    let getRole = await Role.findById(user.role);
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ user: { ...user }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getPosts = async (req, res) => {
  const smanagerRole = await User.find({ role: "640cc3c229937ffacc4359f8" });
  const smanagerPost = await Post.find({ approver: smanagerRole }).populate("poster").populate("approver");
  try {
    return res.status(200).json(smanagerPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.storagePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { storages: true },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.unstoragePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { storages: false },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getPostStorage = async (req, res) => {
  const PostStorage = await Post.find({ storages: "true" }).populate("poster").populate("approver");
  try {
    return res.status(200).json(PostStorage);
  } catch (error) {
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