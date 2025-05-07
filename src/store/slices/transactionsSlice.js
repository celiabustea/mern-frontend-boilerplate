import { createSlice } from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    recurring: [], // New property for recurring transactions
    loading: false,
    error: null
  },
  reducers: {
    addTransaction: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter(transaction => transaction.id !== action.payload);
    },
    addRecurringTransaction: (state, action) => {
      state.recurring.push(action.payload); // Add recurring transaction
    },
    deleteRecurringTransaction: (state, action) => {
      state.recurring = state.recurring.filter(transaction => transaction.id !== action.payload);
    }
  }
});

export const { addTransaction, deleteTransaction, addRecurringTransaction, deleteRecurringTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;