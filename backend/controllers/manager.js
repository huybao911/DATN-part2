const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const PostStorage = require("../models/PostStorage");
const Post = require("../models/Post");
paginate = require("../util/paginate");
const cooldown = new Set();

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
  const { poster, title, content, image } = req.body;
  const { id } = req.params;
  const userPost = await User.findById({_id:id});
  const imagePath = image.replace(/^.*\\/, "");
  if ( !title || !content|| !image)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const newPost = new Post({
      poster: userPost,
      title,
      content,
      image:imagePath,
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
    return res.status(200).json(await Post.find().populate("poster"));
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

exports.setStoraged = async (posts, userId) => {
  let searchCondition = {};
  if (userId) searchCondition = { userId };

  const userPostStorages = await PostStorage.find(searchCondition); //userId needed

  posts.forEach((post) => {
    userPostStorages.forEach((userPostStorage) => {
      if (userPostStorage.postId.equals(post._id)) {
        post.liked = true;
        return;
      }
    });
  });
};

exports.getUserStoragedPosts = async (req, res) => {
  try {
    const likerId = req.params.id;
    const { userId } = req.body;
    let { page, sortBy } = req.query;

    if (!sortBy) sortBy = "-createdAt";
    if (!page) page = 1;

    let posts = await PostStorage.find({ userId: likerId })
      .sort(sortBy)
      .populate({ path: "postId", populate: { path: "poster" } })
      .lean();

    posts = paginate(posts, 10, page);

    const count = posts.length;

    let responsePosts = [];
    posts.forEach((post) => {
      responsePosts.push(post.postId);
    });

    if (userId) {
      await setLiked(responsePosts, userId);
    }

    return res.json({ data: responsePosts, count });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

exports.storagePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post does not exist");
    }

    const existingPostStorage = await PostStorage.findOne({ postId, userId }).populate("Post").populate("User");

    if (existingPostStorage) {
      throw new Error("Post is already storage");
    }

    await PostStorage.create({
      postId,
      userId,
    });

    await post.save();

    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.unstoragePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post does not exist");
    }

    const existingPostStorage = await PostStorage.findOne({ postId, userId });

    if (!existingPostStorage) {
      throw new Error("Post is already not storage");
    }

    await existingPostStorage.remove();

    await post.save();

    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
