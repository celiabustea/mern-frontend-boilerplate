import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../atoms/Icons/Icon';
import Heading from '../atoms/Headings/Heading';
import '../../styles/components/organisms/organisms.css';

const SidebarLink = ({ to, icon, children, isActive }) => (
  <Link
    to={to}
    className={`sidebar-link ${isActive ? 'active' : ''}`}
  >
    <Icon name={icon} />
    <span>{children}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/home', label: 'Dashboard', icon: 'dashboard' },
    { path: '/home/transactions', label: 'Transactions', icon: 'money' },
    { path: '/home/budgets', label: 'Budgets', icon: 'budget' },
    { path: '/home/reports', label: 'Reports', icon: 'chart' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Heading level={2}>Expense Tracker</Heading>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <SidebarLink
            key={item.path}
            to={item.path}
            icon={item.icon}
            isActive={location.pathname === item.path}
          >
            {item.label}
          </SidebarLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;