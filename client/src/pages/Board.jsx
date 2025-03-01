import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLists, removeList } from "../redux/slices/listSlice";
import {
  getTasks,
  updateTask,
  reorderTask,
  removeTask,
} from "../redux/slices/taskSlice";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import AddList from "../components/List/AddList";
import EditList from "../components/List/EditList";
import AddTask from "../components/Task/AddTask";
import Task from "../components/Task/TaskCard";
import EditTask from "../components/Task/EditTask";
import ConfirmDelete from "../components/ConfirmDelete";
import Navbar from "../components/Navbar";
import Tooltip from "../components/Tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import LoadingCard from "../components/LoadingCard";
import { ToastContainer } from "react-toastify";
import "../styles/Board.css";

const Board = () => {
  const dispatch = useDispatch();
  const { lists, loading: listsLoading } = useSelector((state) => state.lists);
  const { tasks, loading: tasksLoading } = useSelector((state) => state.tasks);
  const isLoading = listsLoading || tasksLoading;
  const [addListOpen, setAddListOpen] = useState(false);
  const [editListOpen, setEditListOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(getLists());
    dispatch(getTasks()).finally(() => setInitialLoad(false));
  }, [dispatch]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) {
      const listTasks = [...tasks]
        .filter((task) => task.list._id === source.droppableId)
        .sort((a, b) => a.order - b.order);

      const movedTask = listTasks.splice(source.index, 1)[0];

      listTasks.splice(destination.index, 0, movedTask);

      tasks.map((task) =>
        task._id === movedTask._id
          ? { ...task, order: destination.index }
          : task
      );

      dispatch(
        reorderTask({
          taskId: movedTask._id,
          newOrder: destination.index,
          listId: source.droppableId,
        })
      );

      return;
    }

    const updatedTask = { list: destination.droppableId };
    tasks.map((task) =>
      task._id === draggableId
        ? { ...task, list: { _id: destination.droppableId } }
        : task
    );

    dispatch(updateTask({ id: draggableId, updatedTask }))
      .unwrap()
      .then(() => dispatch(getTasks()));
  };

  const openEditList = (list) => {
    setSelectedList(list);
    setEditListOpen(true);
  };

  const openDeleteConfirm = (item, type) => {
    setSelectedItem(item);
    setDeleteType(type);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    if (deleteType === "list") {
      dispatch(removeList(selectedItem._id))
        .unwrap()
        .then(() => {
          dispatch(getLists());
          setConfirmDeleteOpen(false);
        });
    } else if (deleteType === "task") {
      dispatch(removeTask(selectedItem._id))
        .unwrap()
        .then(() => {
          dispatch(getTasks());
          setConfirmDeleteOpen(false);
        });
    }
  };

  const openEditTask = (task, listId) => {
    setSelectedTask({ ...task, listId });
    setEditTaskOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div className="add-list-btn">
        <button onClick={() => setAddListOpen(true)}>
          <FaPlus />
          <i>New List</i>
        </button>
      </div>
      {initialLoad && isLoading && (
        <div className="loading-container">
          <ClipLoader
            color="#635dff"
            size={100}
            cssOverride={{ borderWidth: "4px" }}
          />
        </div>
      )}

      {!initialLoad && isLoading && (
        <div className="kanban-container">
          {[1, 2, 3].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      )}

      {!isLoading && lists.length === 0 ? (
        <div className="no-data-container">
          <p className="no-data">
            <i>No Lists Available</i>
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="kanban-container">
            {lists.map((list) => {
              const filteredTasks = tasks.filter(
                (task) => task.list._id === list._id
              );

              return (
                <div key={list._id} className="kanban-list">
                  <div className="kanban-list-header">
                    <div className="kanban-list-title">
                      <span
                        className="list-dot"
                        style={{ backgroundColor: list.color }}
                      ></span>
                      <h2>{list.title}</h2>
                      <span className="task-count">{filteredTasks.length}</span>
                    </div>
                    <Tooltip text="New Task" position="top">
                      <button
                        className="add-task-btn"
                        onClick={() => {
                          setSelectedList(list._id);
                          setAddTaskOpen(true);
                        }}
                      >
                        <FaPlus />
                      </button>
                    </Tooltip>
                  </div>

                  <Droppable droppableId={list._id.toString()}>
                    {(provided) => (
                      <div
                        className="kanban-tasks"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {filteredTasks.length > 0 ? (
                          <Task
                            tasks={filteredTasks}
                            openEditTask={(task) =>
                              openEditTask(task, list._id)
                            }
                            openDeleteConfirm={openDeleteConfirm}
                          />
                        ) : (
                          <p className="no-tasks">No tasks available</p>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* Edit & Delete Buttons */}
                  <div className="kanban-list-actions">
                    <button
                      className="edit-list-btn"
                      onClick={() => openEditList(list)}
                    >
                      <FaEdit /> <i>Edit List</i>
                    </button>
                    <button
                      className="delete-list-btn"
                      onClick={() => openDeleteConfirm(list, "list")}
                    >
                      <FaTrash /> <i>Delete List</i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}

      {addListOpen && <AddList onClose={() => setAddListOpen(false)} />}
      {editListOpen && selectedList && (
        <EditList list={selectedList} onClose={() => setEditListOpen(false)} />
      )}
      {confirmDeleteOpen && selectedItem && (
        <ConfirmDelete
          onClose={() => setConfirmDeleteOpen(false)}
          onConfirm={handleDelete}
          itemType={deleteType}
        />
      )}
      {addTaskOpen && (
        <AddTask onClose={() => setAddTaskOpen(false)} listId={selectedList} />
      )}
      {editTaskOpen && selectedTask && (
        <EditTask task={selectedTask} onClose={() => setEditTaskOpen(false)} />
      )}
    </div>
  );
};

export default Board;
