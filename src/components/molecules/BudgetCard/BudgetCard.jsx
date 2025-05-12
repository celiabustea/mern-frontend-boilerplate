import React from 'react';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icons/Icon';
import Heading from '../../atoms/Headings/Heading';
import './BudgetCard.css';

const BudgetCard = ({ budget, onDelete }) => {
  const { category, amount, spent, currency } = budget;

  return (
    <div className="budget-card">
      <div className="budget-card-header">
        <Heading level={3}>{category}</Heading>
        <Button
          variant="ghost"
          icon={<Icon name="delete" />}
          onClick={() => onDelete(budget.id)}
          className="delete-btn"
        />
      </div>
      <div className="budget-info">
        <p className="budget-amount">
          Budget: {amount.toLocaleString('en-US', {
            style: 'currency',
            currency: currency
          })}
        </p>
        <p className="remaining-amount">
          Remaining: {(amount - (spent || 0)).toLocaleString('en-US', {
            style: 'currency',
            currency: currency
          })}
        </p>
      </div>
      <div className="progress-container">
        <div
          className={`progress-fill ${(spent / amount) > 0.9 ? 'danger' : 
            (spent / amount) > 0.7 ? 'warning' : ''}`}
          style={{ 
            width: `${Math.min((spent / amount) * 100, 100)}%`
          }}
        />
      </div>
    </div>
  );
};

export default BudgetCard;