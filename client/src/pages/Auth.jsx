import React, { useState } from "react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "../styles/Home.css";

const Auth = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Kanban Board</h1>
        <p>Organize your workflow efficiently and stay productive!</p>
      </header>

      <div className="home-buttons">
        <button className="login-btn" onClick={openLogin}>
          <FaSignInAlt className="button-icon" /> Login
        </button>
        <button className="signup-btn" onClick={openSignup}>
          <FaUserPlus className="button-icon" /> Sign Up
        </button>
      </div>
      {isLoginOpen && (
        <Login onClose={() => setIsLoginOpen(false)} openSignup={openSignup} />
      )}
      {isSignupOpen && (
        <Signup onClose={() => setIsSignupOpen(false)} openLogin={openLogin} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Auth;
