const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    poster: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    approver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        commenter: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        contentComment: {
          type: String,
          trim: true,
        },
      }
    ],
    // commenter: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   default:0,
    // },
    // contentComment: {
    //   type: String,
    //   trim: true,
    //   default:"",
    // },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
    title: {
      type: String,
      required: true,
      maxLength: [80, "Must be no more than 80 characters"],
    },
    content: {
      type: String,
      required: true,
      maxLength: [8000, "Must be no more than 8000 characters"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
