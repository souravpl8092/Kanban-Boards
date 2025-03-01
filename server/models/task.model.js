const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    dueDate: { type: Date, required: true },
    list: { type: mongoose.Schema.Types.ObjectId, ref: "list", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
