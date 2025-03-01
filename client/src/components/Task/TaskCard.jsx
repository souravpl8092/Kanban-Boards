import React from "react";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { Draggable } from "@hello-pangea/dnd";
import "../../styles/Task.css";
import Tooltip from "../Tooltip";

const Task = ({ tasks, openEditTask, openDeleteConfirm }) => {
  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

  const DateFormat = (dates) => {
    const date = new Date(dates);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="kanban-tasks">
      {sortedTasks.length > 0 ? (
        sortedTasks.map((task, index) => (
          <Draggable
            key={task._id.toString()}
            draggableId={task._id.toString()}
            index={index}
          >
            {(provided) => (
              <div
                key={task._id}
                className="kanban-task"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="task-due-date">
                  <FaCalendarAlt /> {DateFormat(task.dueDate)}
                </div>

                <span
                  className={`task-priority priority-${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

                <h3>{task.title}</h3>
                <p>
                  <i>{task.description}</i>
                </p>

                <div className="task-actions">
                  <Tooltip text="Edit Task" position="top">
                    <button
                      className="edit-task-btn"
                      onClick={() => openEditTask(task, task.list._id)}
                    >
                      <FaEdit />
                    </button>
                  </Tooltip>

                  <Tooltip text="Delete Task" position="left">
                    <button
                      className="delete-task-btn"
                      onClick={() => openDeleteConfirm(task, "task")}
                    >
                      <FaTrash />
                    </button>
                  </Tooltip>
                </div>
              </div>
            )}
          </Draggable>
        ))
      ) : (
        <p className="no-tasks">No tasks available</p>
      )}
    </div>
  );
};

export default Task;
