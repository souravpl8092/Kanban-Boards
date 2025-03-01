import React from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import "../styles/ListModal.css";

const ConfirmDelete = ({ onClose, onConfirm, itemType }) => {
  const { loading: listsLoading } = useSelector((state) => state.lists);
  const { loading: tasksLoading } = useSelector((state) => state.tasks);
  const isLoading = listsLoading || tasksLoading;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="list-modal-content" onClick={(e) => e.stopPropagation()}>
        <IoMdClose className="close-icon" onClick={onClose} />
        <h3>Are you sure?</h3>
        <p>
          Do you really want to delete this {itemType}? This action cannot be
          undone.
        </p>
        <div className="list-modal-actions">
          <button className="cancel-btn" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            className="delete-btn"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
