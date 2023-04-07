const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Post = require("../models/Post");
const PostStorage = require("../models/PostStorage");
const ApplyJob = require("../models/ApplyJob");

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

    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(201)
      .json(getRole.keyRole === "user" ? { token, user: { ...user._doc, password: null, fullName: null, birthday: null, mssv: null, classUser: null, phone: null, address: null }, getRole } : { token, admin: { ...user._doc, password: null }, getRole }) //role: getRole, department: getDepartment

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
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
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const postStorage = await Post.findById({ _id: id });
  try {
    if (!postStorage) {
      throw new Error("Post does not exist");
    }
    const existingPostStorage = await PostStorage.findOne({ postId: postStorage, userId: userStorage, });

    if (existingPostStorage) {
      throw new Error("Post is already storage");
    }

    const newPostStorage = new PostStorage({
      postId: postStorage,
      userId: userStorage,
    });
    await newPostStorage.save();

    res.status(200).json(newPostStorage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.unstoragePost = async (req, res) => {
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const postStorage = await Post.findById({ _id: id });
  try {
    if (!postStorage) {
      throw new Error("Post does not exist");
    }
    const RemovePostStorage = await PostStorage.findOne({ postId: postStorage, userId: userStorage });

    if (!RemovePostStorage) {
      throw new Error("Post is already not storage");
    }
    await RemovePostStorage.remove();

    res.status(200).send("PostStorage has been deleted");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getPostStorage = async (req, res) => {
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const findPostStorage = await PostStorage.find({ userId: userStorage }).populate("userId").populate({path:"postId",populate:[{path:"poster"}]});
  try {
    return res.status(200).json(findPostStorage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.applyJob = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const postApplyJob = await Post.findById({ _id: id });
  try {
    if (!postApplyJob) {
      throw new Error("Post does not exist");
    }
    const existingPostApplyJob = await ApplyJob.findOne({ postId: postApplyJob, userId: userApplyJob, });

    if (existingPostApplyJob) {
      throw new Error("Post is already apply");
    }

    const newPostApplyJob = new ApplyJob({
      postId: postApplyJob,
      userId: userApplyJob,
    });
    await newPostApplyJob.save();

    res.status(200).json(newPostApplyJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.unapplyJob = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  const { id } = req.params;
  const postApplyJob = await Post.findById({ _id: id });
  try {
    if (!postApplyJob) {
      throw new Error("Post does not exist");
    }
    const RemovePostApplyJob = await ApplyJob.findOne({ postId: postApplyJob, userId: userApplyJob });

    if (!RemovePostApplyJob) {
      throw new Error("Post is already not apply");
    }
    await RemovePostApplyJob.remove();

    res.status(200).send("PostApplyJob has been deleted");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getPostApplyJob = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  const findPostApplyJob = await ApplyJob.find({ userId: userApplyJob }).populate("userId").populate({path:"postId",populate:[{path:"poster"}]});
  try {
    return res.status(200).json(findPostApplyJob);
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