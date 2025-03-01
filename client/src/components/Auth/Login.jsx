import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Auth.css";

const Login = ({ onClose, openSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("🎉 Login Successful! Redirecting to Kanban Board...");
      })
      .catch((err) => console.error("Login failed:", err));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <IoMdClose className="close-icon" onClick={onClose} />
        <h2>Login</h2>

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          className="auth-btn"
          type="submit"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span> Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {error && <p className="error-message">{error}</p>}

        <p className="switch-text">
          Don't have an account? <span onClick={openSignup}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
