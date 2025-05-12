import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';

const Navbar = ({ 
  onSearch,
  username = "User"
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <SearchBar onSearch={onSearch} />
      </div>
      
      <div className="navbar-right">
        <span className="username">Welcome, {username}</span>
        <Button
          variant="ghost"
          label="Logout"
          onClick={handleLogout}
          size="small"
        />
      </div>
    </nav>
  );
};

export default Navbar;