import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input/Input';
import Heading from '../atoms/Heading';

const LoginTemplate = ({
  onLogin,
  onSignUp,
  loading = false,
  error = null
}) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Heading level={1}>Welcome Back</Heading>
        <p className="login-subtitle">Please sign in to continue</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <Button
            type="submit"
            label={loading ? "Loading..." : "Sign In"}
            disabled={loading}
            fullWidth
            className="login-button"
          />
        </form>

        <p className="signup-prompt">
          Don't have an account?{' '}
          <Button
            variant="ghost"
            label="Sign Up"
            onClick={onSignUp}
          />
        </p>
      </div>
    </div>
  );
};

export default LoginTemplate;