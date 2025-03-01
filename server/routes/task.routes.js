const express = require("express");
const taskRouter = express.Router();
const authMiddleware = require("../middleware/authenticate.middleware");

const {
  createTask,
  getTasks,
  updateTask,
  reorderTasks,
  deleteTask,
} = require("../controllers/task.controller");

taskRouter.use(authMiddleware);
taskRouter.route("/").get(getTasks).post(createTask);
taskRouter.route("/:id").patch(updateTask).delete(deleteTask);
taskRouter.route("/reorder").put(reorderTasks);

module.exports = taskRouter;
