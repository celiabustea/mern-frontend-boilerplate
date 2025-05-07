import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleSignUp = () => {
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Personal Expense Manager</h1>
        <p className="login-subtitle">Log in to start managing your money smarter and more efficiently.</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={handleSignUp}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;