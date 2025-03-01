import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { updateTask, getTasks } from "../../redux/slices/taskSlice";
import "../../styles/TaskModal.css";

const EditTask = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0];
  };

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(formatDate(task.dueDate));
  const listId = task.listId;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      _id: task._id,
      title,
      description,
      priority,
      dueDate,
      list: listId,
    };

    dispatch(updateTask({ id: task._id, updatedTask }))
      .unwrap()
      .then(() => {
        dispatch(getTasks());
        onClose();
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <IoMdClose className="close-icon" onClick={onClose} />
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
          <textarea
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
                <span className="spinner"></span> Updating Task...
              </>
            ) : (
              "Update Task"
            )}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
