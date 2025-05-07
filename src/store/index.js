import { configureStore } from '@reduxjs/toolkit';
import budgetsReducer from './slices/budgetsSlice';
import transactionsReducer from './slices/transactionsSlice';

export const store = configureStore({
  reducer: {
    budgets: budgetsReducer,
    transactions: transactionsReducer
  }
});