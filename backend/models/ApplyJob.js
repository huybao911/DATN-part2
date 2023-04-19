const mongoose = require("mongoose");

const ApplyJob = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "JobEvent",
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

module.exports = mongoose.model("ApplyJob", ApplyJob);
