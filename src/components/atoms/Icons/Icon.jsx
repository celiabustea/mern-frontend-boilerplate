import React from 'react';
import { 
  MdDelete, 
  MdAdd, 
  MdClose, 
  MdDashboard, 
  MdAttachMoney, 
  MdPieChart,
  MdBarChart,
  MdLogout,
  MdSearch,
  MdMenu,
  MdSettings
} from 'react-icons/md';
import './icons.css';

const Icon = ({ name, className = "", onClick, size = "1.25em" }) => {
  const icons = {
    delete: <MdDelete size={size} />,
    add: <MdAdd size={size} />,
    close: <MdClose size={size} />,
    dashboard: <MdDashboard size={size} />,
    money: <MdAttachMoney size={size} />,
    budget: <MdPieChart size={size} />,
    chart: <MdBarChart size={size} />,
    logout: <MdLogout size={size} />,
    search: <MdSearch size={size} />,
    menu: <MdMenu size={size} />,
    settings: <MdSettings size={size} />
  };

  return (
    <span 
      className={`icon ${className}`} 
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {icons[name]}
    </span>
  );
};

export default Icon;