import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getTasks } from "../../redux/slices/taskSlice";
import { IoMdClose } from "react-icons/io";
import "../../styles/TaskModal.css";

const AddTask = ({ onClose, listId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !listId) return;

    const newTask = { title, description, priority, dueDate, list: listId };

    dispatch(addTask(newTask))
      .unwrap()
      .then(() => {
        dispatch(getTasks());
        setTitle("");
        setDescription("");
        setPriority("Low");
        setDueDate("");
        onClose();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <IoMdClose className="close-icon" onClick={onClose} />
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={loading}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Creating New Task...
              </>
            ) : (
              "Add Task"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
