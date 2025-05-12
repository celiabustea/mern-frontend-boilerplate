import React from 'react';
import TransactionCard from '../../molecules/TransactionCard/TransactionCard';
import Heading from '../../atoms/Headings/Heading';
import './reccuringTransactions.css';

const RecurringTransactionsList = ({ transactions = [], onDelete }) => {
  const handleDelete = (transactionId) => {
    if (onDelete) {
      onDelete(transactionId);
    }
  };

  if (!transactions.length) {
    return (
      <div className="empty-state">
        <p>No recurring transactions set up</p>
      </div>
    );
  }

  return (
    <div className="recurring-transactions">
      <Heading level={2}>Recurring Transactions</Heading>
      <div className="transactions-list">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={{
              ...transaction,
              description: `${transaction.description} (${transaction.recurringFrequency})`
            }}
            onDelete={() => handleDelete(transaction.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecurringTransactionsList;