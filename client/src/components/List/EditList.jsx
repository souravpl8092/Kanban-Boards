import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateList, getLists } from "../../redux/slices/listSlice";
import { IoMdClose } from "react-icons/io";
import "../../styles/ListModal.css";

const EditList = ({ list, onClose }) => {
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.lists);

  const handleEditList = () => {
    dispatch(updateList({ id: list._id, title }))
      .unwrap()
      .then(() => {
        dispatch(getLists());
        onClose();
      })
      .catch((err) => console.error("Failed to edit list:", err));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="list-modal-content" onClick={(e) => e.stopPropagation()}>
        <IoMdClose className="close-icon" onClick={onClose} />
        <h2>Edit List</h2>
        <input
          type="text"
          placeholder="Enter new title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <button
          className="confirm-btn"
          onClick={handleEditList}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span> Updating List...
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditList;
