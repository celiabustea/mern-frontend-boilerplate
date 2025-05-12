import React from 'react';
import Icon from '../../atoms/Icons/Icon';
import Heading from '../../atoms/Headings/Heading';
import './TransactionCard.css';

const TransactionCard = ({ transaction, onDelete }) => {
  const { id, description, amount, category, date, isRecurring, recurringFrequency } = transaction;

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (onDelete) {
      onDelete(id); // Pass just the ID
    }
  };

  return (
    <div className="transaction-card">
      <div className="transaction-header">
        <Heading level={3}>{description}</Heading>
        <div className="transaction-actions">
          <span className="transaction-category">{category}</span>
          {isRecurring && (
            <span className="transaction-frequency">
              ({recurringFrequency})
            </span>
          )}
          <Icon 
            name="delete" 
            onClick={handleDelete}
            className="delete-icon"
          />
        </div>
      </div>
      <p className="transaction-amount">
        {amount.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </p>
      <p className="transaction-date">
        {new Date(date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  );
};

export default TransactionCard;