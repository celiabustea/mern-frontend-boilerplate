import { createSlice } from '@reduxjs/toolkit';

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addBudget: (state, action) => {
      state.items.push(action.payload);
    },
    deleteBudget: (state, action) => {
      state.items = state.items.filter(budget => budget.id !== action.payload);
    },
    updateBudgetSpent: (state, action) => {
      const { budgetId, amount } = action.payload;
      const budget = state.items.find(b => b.id === budgetId);
      if (budget) {
        budget.spent = (budget.spent || 0) + amount;
      }
    }
  }
});

export const { addBudget, deleteBudget, updateBudgetSpent } = budgetsSlice.actions;
export default budgetsSlice.reducer;