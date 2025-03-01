import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, getLists } from "../../redux/slices/listSlice";
import { IoMdClose } from "react-icons/io";
import "../../styles/TaskModal.css";

const AddList = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.lists);

  const handleAddList = () => {
    if (!title.trim() || loading) return;

    dispatch(addList({ title }))
      .unwrap()
      .then(() => {
        dispatch(getLists());
        onClose();
      })
      .catch((err) => console.error("Failed to add list:", err));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="list-modal-content" onClick={(e) => e.stopPropagation()}>
        <IoMdClose className="close-icon" onClick={onClose} />
        <h2>Add List</h2>
        <input
          type="text"
          placeholder="Enter List Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <button
          className="confirm-btn"
          onClick={handleAddList}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span> Creating New List...
            </>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddList;
