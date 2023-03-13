const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");

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
    return res.status(200).json(await User.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthManager = async (req, res, next) => {
  try {
    const manager = await User.findById(req?.manager?._id).select("-password").lean();
    if (!manager)
      return res.status(400).send("Manager not found, Authorization denied..");
    return res.status(200).json({ ...manager });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
