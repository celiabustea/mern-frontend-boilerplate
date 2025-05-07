import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Sidebar.css';

const SideBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className='sidebar'>
            <h2>Expense Tracker</h2>
            <ul>
                <li>
                    <Link to="/home">Dashboard</Link>
                </li>
                <li>
                    <Link to="/home/transactions">Transactions</Link>
                </li>
                <li>
                    <Link to="/home/budgets">Budgets</Link>
                </li>
                <li>
                    <Link to="/home/reports">Reports</Link>
                </li>
                <li>
                    <Link to="#" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;