import React, { useState } from "react";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const username = user ? user : "Guest";

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <h1>Kanban Board</h1>
      <div className="user-menu" onClick={toggleUserMenu}>
        <FaUserCircle className="user-icon" />
        <span>
          <i>{username}</i>
        </span>
        <FaChevronDown className="dropdown-icon" />
        {userMenuOpen && (
          <div className="user-dropdown">
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="logout-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
