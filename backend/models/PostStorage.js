const mongoose = require("mongoose");

const PostStorage = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostStorage", PostStorage);
