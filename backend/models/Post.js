const mongoose = require("mongoose");
const filter = require("../util/filter");
const PostStorage = require("./PostStorage");

const PostSchema = new mongoose.Schema(
  {
    poster: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

// PostSchema.pre("remove", async function (next) {
//   console.log(this._id);
//   await PostStorage.deleteMany({ postId: this._id });
//   next();
// });

module.exports = mongoose.model("Post", PostSchema);
