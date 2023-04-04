const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const Post = require("../models/Post");
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
    if (!manager)
      return res.status(400).send("Manager not found, Authorization denied..");
    return res.status(200).json({ manager: { ...manager }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.createPost = async (req, res) => {
  const { poster, approver, title, content, image } = req.body;
  const { id } = req.params;
  const userPost = await User.findById({_id:id});
  const imagePath = image.replace(/^.*\\/, "");
  if ( !title || !content|| !image)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const newPost = new Post({
      poster: userPost,
      approver: null,
      title,
      content,
      image:imagePath,
      storages:false,
    });
    await newPost.save();

    if (!req.manager) return res.status(400).send("You dont have permission");
    return res
      .status(201)
      .json({ manager: { newPost } })
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
  const managerPost = await Post.find({poster:managerUser._id}).populate("poster")
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
  try {
    if (!req.manager) return res.status(400).send("You dont have permission");
    const post = await Post.findById(id).lean();
    if (!post) return res.status(400).send("Post does not exist");
    const postObj = { ...req.body };
    const newPost = await Post.findByIdAndUpdate(
      { _id: id },
      { ...postObj },
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
