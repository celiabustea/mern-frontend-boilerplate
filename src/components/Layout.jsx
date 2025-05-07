import React from 'react';
import SideBar from "../pages/home/SideBar"; 
import { Outlet } from "react-router-dom"; 
import './Layout.css'; 

const Layout = () => {
  return (
    <div className="layout-container">
      <SideBar />
      <div className="main-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
