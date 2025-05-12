import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Heading from "../../components/atoms/Headings";
import "../../styles/pages/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Remove spaces from password field
    if (name === 'password') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value.replace(/\s/g, '')
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleSignUp = () => {
    navigate("/home"); 
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Heading level={1}>Personal Expense Manager</Heading>
        <p className="login-subtitle">Log in to manage your expenses</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            label="Login"
            variant="primary"
            fullWidth
          />
        </form>
        
        <div className="signup-prompt">
          <span>Don't have an account?</span>
          <Button
            variant="ghost"
            label="Sign Up"
            onClick={handleSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;