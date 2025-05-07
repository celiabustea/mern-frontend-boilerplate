import React from "react";
import { useSelector } from 'react-redux';
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const transactions = useSelector(state => state.transactions.items);
  const budgets = useSelector(state => state.budgets.items);

  const recentTransactions = transactions.slice(-3);
  const totalBalance = transactions.reduce((sum, trans) => sum + trans.amount, 0);
  const monthlySpending = transactions
    .filter(trans => trans.amount < 0)
    .reduce((sum, trans) => sum + Math.abs(trans.amount), 0);

  // Format currency consistently
  const formatCurrency = (amount, currency = 'USD') => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: currency
    });
  };

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h1>Welcome back!</h1>
        <p>Here's your financial overview</p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Balance</h3>
          <p className="balance-amount">{formatCurrency(totalBalance)}</p>
        </div>
        <div className="summary-card">
          <h3>Monthly Spending</h3>
          <p className="spending-amount">{formatCurrency(monthlySpending)}</p>
        </div>
        <div className="summary-card">
          <h3>Active Budgets</h3>
          <p>{budgets.length}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card recent-transactions">
          <div className="card-header">
            <h2>Recent Transactions</h2>
            <Link to="/home/transactions" className="view-all">View All →</Link>
          </div>
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <h4>{transaction.description}</h4>
                  <span className="transaction-category">{transaction.category}</span>
                </div>
                <div className="transaction-details">
                  <span className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </span>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <p className="empty-state">No recent transactions</p>
            )}
          </div>
        </div>

        <div className="dashboard-card budget-overview">
          <div className="card-header">
            <h2>Budget Overview</h2>
            <Link to="/home/budgets" className="view-all">View All →</Link>
          </div>
          <div className="budget-list">
            {budgets.map((budget) => (
              <div key={budget.id} className="budget-item">
                <h4>{budget.category}</h4>
                <div className="budget-info">
                  <span>
                    {formatCurrency(budget.spent || 0, budget.currency)} / {formatCurrency(budget.amount, budget.currency)}
                  </span>
                </div>
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${Math.min((budget.spent || 0) / budget.amount * 100, 100)}%`,
                      backgroundColor: (budget.spent || 0) > budget.amount ? '#ef4444' : '#2563eb'
                    }}
                  />
                </div>
              </div>
            ))}
            {budgets.length === 0 && (
              <p className="empty-state">No budgets created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
