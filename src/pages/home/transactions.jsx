import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, deleteTransaction, addRecurringTransaction, deleteRecurringTransaction } from '../../store/slices/transactionsSlice';
import { updateBudgetSpent } from '../../store/slices/budgetsSlice';
import "./transactions.css";

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.items);
  const recurringTransactions = useSelector(state => state.transactions.recurring); // Get recurring transactions
  const budgets = useSelector(state => state.budgets.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    isRecurring: false, // Whether the transaction is recurring
    recurringFrequency: "" // Frequency of the recurring transaction
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };

    if (transaction.isRecurring) {
      dispatch(addRecurringTransaction(transaction)); // Add to recurring transactions
    } else {
      dispatch(addTransaction(transaction)); // Add to regular transactions
    }

    // Update budget spent amount
    if (transaction.category) {
      const budget = budgets.find(b => b.category === transaction.category);
      if (budget) {
        dispatch(updateBudgetSpent({
          budgetId: budget.id,
          amount: transaction.amount
        }));
      }
    }

    setNewTransaction({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      isRecurring: false,
      recurringFrequency: ""
    });
    setIsModalOpen(false);
  };

  const handleDelete = (transaction) => {
    dispatch(deleteTransaction(transaction.id));
    
    // Also update the budget spent amount
    if (transaction.category) {
      const budget = budgets.find(b => b.category === transaction.category);
      if (budget) {
        dispatch(updateBudgetSpent({
          budgetId: budget.id,
          amount: -transaction.amount // Subtract the amount from spent
        }));
      }
    }
  };

  const handleDeleteRecurring = (transaction) => {
    dispatch(deleteRecurringTransaction(transaction.id));
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1>Transactions</h1>
        <p>Track your spending across different categories</p>
      </div>

      <div className="transactions-summary">
        <div className="summary-card">
          <h3>Total Transactions</h3>
          <p>{transactions.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p>
            {transactions.reduce((total, trans) => total + trans.amount, 0)
              .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
          </p>
        </div>
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet. Click the button below to add one!</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-header">
                <h3>{transaction.description}</h3>
                <div className="transaction-actions">
                  <p className="transaction-category">{transaction.category}</p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(transaction)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="transaction-amount">
                {transaction.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
              <p className="transaction-date">{transaction.date}</p>
            </div>
          ))
        )}
      </div>

      <div className="recurring-transactions">
        <h2>Recurring Transactions</h2>
        {recurringTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No recurring transactions yet.</p>
          </div>
        ) : (
          recurringTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-header">
                <h3>{transaction.description}</h3>
                <div className="transaction-actions">
                  <p className="transaction-category">{transaction.category}</p>
                  <p className="transaction-frequency">{transaction.recurringFrequency}</p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRecurring(transaction)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="transaction-amount">
                {transaction.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
              <p className="transaction-date">{transaction.date}</p>
            </div>
          ))
        )}
      </div>

      <button
        className="add-transaction-btn"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Transaction
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Transaction</h2>
            <form onSubmit={handleAddTransaction}>
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  amount: e.target.value
                })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  description: e.target.value
                })}
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  category: e.target.value
                })}
                required
              />
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  date: e.target.value
                })}
                required
              />
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={newTransaction.isRecurring}
                    onChange={(e) => setNewTransaction({
                      ...newTransaction,
                      isRecurring: e.target.checked,
                      recurringFrequency: e.target.checked ? "monthly" : "" // Default to "monthly" if checked
                    })}
                  />
                  Recurring Transaction
                </label>
              </div>

              {newTransaction.isRecurring && (
                <div className="frequency-group">
                  <label htmlFor="recurringFrequency">Frequency:</label>
                  <select
                    id="recurringFrequency"
                    value={newTransaction.recurringFrequency}
                    onChange={(e) => setNewTransaction({
                      ...newTransaction,
                      recurringFrequency: e.target.value
                    })}
                    required
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
              <div className="modal-buttons">
                <button type="submit">Add Transaction</button>
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

export default Transactions;
