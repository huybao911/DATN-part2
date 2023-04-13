const mongoose = require("mongoose");

const JobEvent = new mongoose.Schema(
  {
    nameJob: {
        type: String,
        trim: true,
        required: [true, "NameJob is required"],
    },
    eventId: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobEvent", JobEvent);
