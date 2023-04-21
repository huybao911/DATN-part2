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
    applyStatus: {
      type: String,
      default:"Chờ phê duyệt",
    },
    notiApplyJob: {
      type: String,
      default:"Chờ phê duyệt",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplyJob", ApplyJob);
