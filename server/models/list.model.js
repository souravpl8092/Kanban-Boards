const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

listSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const taskModel = require("./task.model");
    await taskModel.deleteMany({ list: this._id });
    next();
  }
);

const listModel = mongoose.model("list", listSchema);

module.exports = listModel;
