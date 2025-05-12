import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Button from "../../components/atoms/Button/Button";
import Heading from "../../components/atoms/Headings/Heading";
import Input from "../../components/atoms/Input/Input";
import Icon from "../../components/atoms/Icons/Icon";
import "../../styles/pages/transactions.css";
import { addTransaction, deleteTransaction, addRecurringTransaction, deleteRecurringTransaction } from '../../store/slices/transactionsSlice';
import { updateBudgetSpent } from '../../store/slices/budgetsSlice';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.items);
  const recurringTransactions = useSelector(state => state.transactions.recurring);
  const allTransactions = [...transactions, ...recurringTransactions];

  const sortedTransactions = [...allTransactions].sort((a, b) => {
    return new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date);
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('monthly');
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().slice(0, 16) // Changed to include hours and minutes
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      isRecurring: isRecurring,
      recurringFrequency: isRecurring ? recurringFrequency : null,
      timestamp: new Date().toISOString()
    };

    if (isRecurring) {
      dispatch(addRecurringTransaction(transaction));
    } else {
      dispatch(addTransaction(transaction));
    }

    // Reset all form states
    setNewTransaction({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().slice(0, 16)
    });
    setIsRecurring(false);
    setRecurringFrequency('monthly');
    setIsModalOpen(false);
  };

  const handleDelete = (transactionId) => {
    const isRecurring = recurringTransactions.some(t => t.id === transactionId);
    
    if (isRecurring) {
      dispatch(deleteRecurringTransaction(transactionId));
    } else {
      dispatch(deleteTransaction(transactionId));
    }
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
        {sortedTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet</p>
          </div>
        ) : (
          sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-header">
                <h3>{transaction.description}</h3>
                <div className="transaction-actions">
                  <span className="transaction-category">{transaction.category}</span>
                  {transaction.isRecurring && (
                    <span className="transaction-frequency">
                      ({transaction.recurringFrequency})
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(transaction.id)}
                    icon={<Icon name="delete" />}
                    className="delete-btn"
                  />
                </div>
              </div>
              <p className="transaction-amount">
                {transaction.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
              <p className="transaction-date">
                {new Date(transaction.timestamp || transaction.date).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          ))
        )}
      </div>

      <Button
        className="add-transaction-btn"
        onClick={() => setIsModalOpen(true)}
        label="Add Transaction"
        variant="primary"
        icon={<Icon name="add" />}
      />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <Heading level={2}>Add New Transaction</Heading>
            <form onSubmit={handleAddTransaction}>
              <Input
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
              <Input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  description: e.target.value
                })}
                required
              />
              <Input
                type="text"
                placeholder="Category"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  category: e.target.value
                })}
                required
              />
              <Input
                type="datetime-local"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  date: e.target.value
                })}
                required
              />

              <div className="recurring-option">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                  />
                  Make this a recurring transaction
                </label>
              </div>

              {isRecurring && (
                <div className="frequency-group">
                  <label>Frequency:</label>
                  <select
                    value={recurringFrequency}
                    onChange={(e) => setRecurringFrequency(e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}

              <div className="modal-buttons">
                <Button
                  type="submit"
                  label="Add Transaction"
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

export default Transactions;
