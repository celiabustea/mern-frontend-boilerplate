import React from 'react';
import Navbar from '../organisms/Navbar';
import Sidebar from '../organisms/Sidebar';
import TransactionsList from '../organisms/TransactionsList';
import RecurringTransactionsList from '../organisms/RecurringTransactionsList';

const DashboardTemplate = ({ 
  children,
  transactions = [],
  recurringTransactions = [],
  onDeleteTransaction,
  onDeleteRecurring,
  username,
  onSearch
}) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar 
          username={username}
          onSearch={onSearch}
        />
        <div className="dashboard-content">
          {children}
          <div className="dashboard-widgets">
            <TransactionsList 
              transactions={transactions}
              onDelete={onDeleteTransaction}
            />
            <RecurringTransactionsList 
              transactions={recurringTransactions}
              onDelete={onDeleteRecurring}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;