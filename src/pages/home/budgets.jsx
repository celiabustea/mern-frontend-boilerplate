import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBudget, deleteBudget } from "../../store/slices/budgetsSlice";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Heading from "../../components/atoms/Headings/Heading";
import Icon from "../../components/atoms/Icons/Icon";
import "../../styles/pages/budgets.css";

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
        <Heading level={1}>Budget Overview</Heading>
        <p className="budgets-subtitle">Manage and track your budget categories</p>
      </div>

      <div className="budgets-summary">
        <div className="summary-card">
          <Heading level={3}>Total Budgeted</Heading>
          <p>
            {budgets.reduce((total, budget) => total + budget.amount, 0)
              .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
          </p>
        </div>
        <div className="summary-card">
          <Heading level={3}>Total Categories</Heading>
          <p>{budgets.length}</p>
        </div>
        <div className="summary-card">
          <Heading level={3}>Total Spent</Heading>
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
                <Heading level={3}>{budget.category}</Heading>
                <Button
                  variant="ghost"
                  icon={<Icon name="delete" />}
                  onClick={() => handleDelete(budget.id)}
                  className="delete-btn"
                />
              </div>
              <div className="budget-info">
                <p className="budget-amount">
                  Budget: {budget.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: budget.currency
                  })}
                </p>
                <p className="remaining-amount">
                  Remaining: {(budget.amount - (budget.spent || 0)).toLocaleString('en-US', {
                    style: 'currency',
                    currency: budget.currency
                  })}
                </p>
              </div>
              <div className="progress-container">
                <div
                  className={`progress-fill ${(budget.spent / budget.amount) > 0.9 ? 'danger' : 
                    (budget.spent / budget.amount) > 0.7 ? 'warning' : ''}`}
                  style={{ 
                    width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <Button
        className="add-budget-btn"
        onClick={() => setIsModalOpen(true)}
        label="Add Budget"
        variant="primary"
        icon={<Icon name="add" />}
      />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <Heading level={2}>Add New Budget Category</Heading>
            <form onSubmit={handleAddBudget}>
              <Input
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
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Amount"
                  value={newBudget.amount}
                  onChange={handleAmountChange}
                  required
                />
                <Input
                  type="select"
                  value={newBudget.currency}
                  onChange={(e) => setNewBudget({
                    ...newBudget,
                    currency: e.target.value
                  })}
                  options={currencies.map(currency => ({
                    value: currency.code,
                    label: `${currency.code} (${currency.symbol})`
                  }))}
                />
              </div>
              <div className="modal-buttons">
                <Button
                  type="submit"
                  label="Add Budget"
                  variant="primary"
                />
                <Button
                  type="button"
                  label="Cancel"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;