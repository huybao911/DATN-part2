const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        nameEvent: {
            type: String,
            trim: true,
            required: [true, "NameEvent is required"],
        },
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
                created: { type: Date, default: Date.now }
            },
        ],
        quantityUser: {
            type: Number,
            default: 0,
        },
        job: {
            type: Array,
            required: [true, "Job is required"],
            default: [],
        },
        location: {
            type: String,
            trim: true,
            required: [true, "Location is required"],
        },
        departmentEvent:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },
        costs: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: true,
          },
        dayStart: {
            type: String,
            trim: true,
            required: [true, "DayStart is required"],
        },
        dayEnd: {
            type: String,
            trim: true,
            required: [true, "DayEnd is required"],
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


module.exports = mongoose.model("Event", eventSchema);
