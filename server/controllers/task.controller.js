const taskModel = require("../models/task.model");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, list } = req.body;
    await taskModel.updateMany({ list }, { $inc: { order: 1 } });

    const newTask = new taskModel({
      title,
      description,
      dueDate,
      priority,
      list,
      user: req.user.id,
      order: 1,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ user: req.user.id })
      .populate("list", "title")
      .exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, list } = req.body;

  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, dueDate, priority, list },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

const reorderTasks = async (req, res) => {
  const { taskId, newOrder, listId } = req.body;

  try {
    if (!taskId || newOrder === undefined || !listId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const taskToMove = await taskModel.findById(taskId);
    if (!taskToMove) {
      return res.status(404).json({ message: "Task not found" });
    }

    const oldOrder = taskToMove.order;
    if (newOrder === oldOrder) {
      return res.status(200).json({ message: "Task order remains unchanged" });
    }

    const tasks = await taskModel.find({ list: listId }).sort("order");

    if (newOrder < oldOrder) {
      await taskModel.updateMany(
        { list: listId, order: { $gte: newOrder, $lt: oldOrder } },
        { $inc: { order: 1 } }
      );
    }
    else {
      await taskModel.updateMany(
        { list: listId, order: { $gt: oldOrder, $lte: newOrder } },
        { $inc: { order: -1 } }
      );
    }
    taskToMove.order = newOrder;
    await taskToMove.save();

    res.status(200).json({ message: "Task order updated successfully" });
  } catch (error) {
    console.error("Error reordering tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  reorderTasks,
  deleteTask,
};
