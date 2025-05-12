// src/pages/reports.jsx

import React from "react";
import "../../styles/pages/reports.css";
import { 
  BarChart, Bar, 
  LineChart, Line,
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Reports = () => {
  // Sample data - pana vine databaseu
  const monthlyData = [
    { month: 'Jan', spent: 2400, budget: 3000 },
    { month: 'Feb', spent: 1398, budget: 3000 },
    { month: 'Mar', spent: 2800, budget: 3000 },
    { month: 'Apr', spent: 3908, budget: 3000 },
    { month: 'May', spent: 2800, budget: 3000 },
    { month: 'Jun', spent: 2300, budget: 3000 },
  ];

  const categoryData = [
    { name: 'Food', value: 400 },
    { name: 'Transport', value: 300 },
    { name: 'Shopping', value: 300 },
    { name: 'Bills', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Financial Reports</h1>
        <p>View your spending patterns and budget analysis</p>
      </div>

      <div className="reports-summary">
        <div className="summary-card">
          <h3>Total Spending</h3>
          <p>$3,240.00</p>
        </div>
        <div className="summary-card">
          <h3>Monthly Average</h3>
          <p>$2,600.00</p>
        </div>
        <div className="summary-card">
          <h3>Budget Status</h3>
          <p className="status-good">On Track</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Spending vs Budget</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="spent" fill="#1e293b" />
              <Bar dataKey="budget" fill="#94a3b8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="spent" 
                stroke="#1e293b" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
