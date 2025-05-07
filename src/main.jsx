import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

import Login from "./pages/home/Login";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Transactions from "./pages/home/transactions";
import Budgets from "./pages/home/budgets";
import Reports from "./pages/home/reports";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Navigate to="/login" replace /> 
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "budgets",
        element: <Budgets />,
      },
      {
        path: "reports",
        element: <Reports />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);