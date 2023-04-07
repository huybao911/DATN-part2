const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
    },
    role:
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Role",
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    department:
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Department",
    },
    fullName: {
      type: String,
      trim: true,
    },
    birthday: {
      type: String,
      trim: true,
    },
    mssv: {
      type: String,
      trim: true,
    },
    classUser: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


module.exports = mongoose.model("User", userSchema);
