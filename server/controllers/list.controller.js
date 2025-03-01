const listModel = require("../models/list.model");

// Create List
const createList = async (req, res) => {
  const { title } = req.body;
  try {
    const newList = new listModel({ title, user: req.user.id });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lists for a user
const getList = async (req, res) => {
  try {
    const lists = await listModel.find({ user: req.user.id });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lists" });
  }
};

// Update a list
const updateList = async (req, res) => {
  const { title } = req.body;
  try {
    const updatedList = await listModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title },
      { new: true }
    );
    if (!updatedList)
      return res.status(404).json({ message: "List not found" });
    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ message: "Error updating list" });
  }
};

// Delete List
const deleteList = async (req, res) => {
  try {
    const list = await listModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!list) return res.status(404).json({ message: "List not found" });

    await list.deleteOne();
    res.json({ message: "List and associated tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting list" });
  }
};

module.exports = {
  createList,
  getList,
  updateList,
  deleteList,
};
