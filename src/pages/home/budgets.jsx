import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addBudget, deleteBudget } from '../../store/slices/budgetsSlice';
import "./budgets.css";

const Budgets = () => {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budgets.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    currency: "USD" 
  });

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" }
  ];

  const handleDelete = (id) => {
    dispatch(deleteBudget(id));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setNewBudget({
      ...newBudget,
      amount: value
    });
  };

  const handleAddBudget = (e) => {
    e.preventDefault();
    const budget = {
      id: Date.now(),
      category: newBudget.category,
      amount: parseFloat(newBudget.amount),
      currency: newBudget.currency,
      spent: 0
    };
    dispatch(addBudget(budget));
    setNewBudget({ category: "", amount: "", currency: "USD" });
    setIsModalOpen(false);
  };

  return (
    <div className="budgets-container">
      <div className="budgets-header">
        <h1>Budget Overview</h1>
        <p>Manage and track your budget categories</p>
      </div>

      <div className="budgets-summary">
        <div className="summary-card">
          <h3>Total Budgeted</h3>
          <p>
            {budgets.reduce((total, budget) => total + budget.amount, 0)
              .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
          </p>
        </div>
        <div className="summary-card">
          <h3>Total Categories</h3>
          <p>{budgets.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p>
            {budgets.reduce((total, budget) => total + (budget.spent || 0), 0)
              .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
          </p>
        </div>
      </div>

      <div className="budget-list">
        {budgets.length === 0 ? (
          <div className="empty-state">
            <p>No budget categories yet. Click the button below to add one!</p>
          </div>
        ) : (
          budgets.map((budget) => (
            <div key={budget.id} className="budget-card">
              <div className="budget-card-header">
                <h3>{budget.category}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(budget.id)}
                >
                  🗑️
                </button>
              </div>
              <p className="budget-amount">
                {budget.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: budget.currency
                })}
              </p>
              <p className="spent-label">Spent:</p>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(budget.spent / budget.amount) * 100 || 0}%` }}
                ></div>
              </div>
              <p className="spent-amount">
                {(budget.spent || 0).toLocaleString('en-US', {
                  style: 'currency',
                  currency: budget.currency
                })}
              </p>
            </div>
          ))
        )}
      </div>

      <button
        className="add-budget-btn"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Budget Category
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Budget Category</h2>
            <form onSubmit={handleAddBudget}>
              <input
                type="text"
                placeholder="Category Name"
                value={newBudget.category}
                onChange={(e) => setNewBudget({
                  ...newBudget,
                  category: e.target.value
                })}
                required
              />
              <div className="amount-group">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Amount"
                  value={newBudget.amount}
                  onChange={handleAmountChange}
                  required
                />
                <select
                  value={newBudget.currency}
                  onChange={(e) => setNewBudget({
                    ...newBudget,
                    currency: e.target.value
                  })}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit">Add Budget</button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;