import React from 'react';
import TransactionCard from '../molecules/TransactionCard';
import Heading from '../atoms/Headings/Heading';
import Button from '../atoms/Button';

const TransactionsList = ({ 
  transactions = [], 
  onDelete,
  onAdd,
  title = "Recent Transactions",
  emptyMessage = "No transactions found",
  showViewAll = true
}) => {
  return (
    <div className="transactions-widget">
      <div className="widget-header">
        <Heading level={2}>{title}</Heading>
        {showViewAll && transactions.length > 0 && (
          <Button
            variant="ghost"
            label="View All"
            onClick={onAdd}
            size="small"
          />
        )}
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p className="empty-state">{emptyMessage}</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onDelete={() => onDelete(transaction.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionsList;