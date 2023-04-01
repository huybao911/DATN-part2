const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const Post = require("../models/Post");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const smanager = await User.findOne({ username }).lean();
    let getRole = await Role.findById(smanager.role);

    if (!smanager) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "smanager")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, smanager.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ smanager, getRole }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, smanager, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().populate("role").populate("department"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getPost = async (req, res) => {
  const smanagerUser = await User.findById(req?.smanager?._id);
  const smanagerDepartment = await User.find({department:smanagerUser.department});
  const smanagerPost = await Post.find({poster:smanagerDepartment}).populate("poster");
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json(smanagerPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthsuperManager = async (req, res, next) => {
  try {
    const smanager = await User.findById(req?.smanager?._id).select("-password").lean();
    let getRole = await Role.findById(smanager.role);
    if (!smanager)
      return res.status(400).send("Supermanager not found, Authorization denied..");
    return res.status(200).json({ smanager:{...smanager}, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
