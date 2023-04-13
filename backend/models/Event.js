const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        nameEvent: {
            type: String,
            trim: true,
            required: [true, "NameEvent is required"],
        },
        quantityUser: {
            type: Number,
            trim: true,
            required: [true, "QuantityUser is required"],
        },
        job: {
            type: Array,
            required: [true, "Job is required"],
            default:[],
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
            type: String,
            trim: true,
            required: [true, "Costs is required"],
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
