const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

// GET all transactions for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new transaction WITH BUDGET ENFORCEMENT, CURRENCY ENFORCEMENT, AND SPENT UPDATE
router.post('/', authenticateToken, async (req, res) => {
  const { amount, currency, description, category, date, is_recurring, frequency } = req.body;
  const userId = req.user.userId;

  try {
    // 1. Find the relevant budget for this user and category
    const budgetResult = await pool.query(
      'SELECT * FROM budgets WHERE user_id = $1 AND category = $2',
      [userId, category]
    );

    if (budgetResult.rows.length === 0) {
      return res.status(400).json({ message: 'No budget found for this category. Please create a budget first.' });
    }

    const budget = budgetResult.rows[0];

    // 2. ENFORCE CURRENCY MATCH
    if (budget.currency !== currency) {
      return res.status(400).json({
        message: `Currency mismatch: Budget for "${category}" is in "${budget.currency}", but transaction is in "${currency}".`
      });
    }

    // 3. Get up-to-date spent (from budget column)
    const spentSoFar = parseFloat(budget.spent) || 0;
    const remaining = parseFloat(budget.amount) - spentSoFar;

    // 4. Enforce the limit
    if (parseFloat(amount) > remaining) {
      return res.status(400).json({
        message: `Transaction exceeds your remaining budget for "${category}". Remaining: ${remaining}`
      });
    }

    // 5. Insert transaction
    const result = await pool.query(
      `INSERT INTO transactions (user_id, amount, currency, description, category, date, is_recurring, frequency)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, amount, currency, description, category, date, is_recurring, frequency]
    );

    // 6. Update budget's spent field
    await pool.query(
      'UPDATE budgets SET spent = spent + $1 WHERE user_id = $2 AND category = $3',
      [amount, userId, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a transaction
router.put('/:id', authenticateToken, async (req, res) => {
  const { amount, currency, description, category, date, is_recurring, frequency } = req.body;
  const { id } = req.params;
  try {
    // (You could add similar currency/budget checks here if allowing category/currency edits!)
    const result = await pool.query(
      `UPDATE transactions SET amount = $1, currency = $2, description = $3, category = $4, date = $5, is_recurring = $6, frequency = $7
       WHERE id = $8 AND user_id = $9 RETURNING *`,
      [amount, currency, description, category, date, is_recurring, frequency, id, req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a transaction
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    // Get the transaction to know amount, category, user before deleting
    const getResult = await pool.query(
      'SELECT amount, category FROM transactions WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );
    if (getResult.rows.length === 0) return res.status(404).json({ message: 'Transaction not found' });

    const { amount, category } = getResult.rows[0];

    // Delete the transaction
    const result = await pool.query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    // Decrement the spent in the budget (so user regains budget if a transaction is deleted)
    await pool.query(
      'UPDATE budgets SET spent = GREATEST(spent - $1, 0) WHERE user_id = $2 AND category = $3',
      [amount, req.user.userId, category]
    );

    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
