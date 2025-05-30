const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

// Get all budgets for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM budgets WHERE user_id = $1 ORDER BY id DESC',
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new budget
router.post('/', authenticateToken, async (req, res) => {
  const { category, amount, currency } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO budgets (user_id, category, amount, currency) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.userId, category, amount, currency]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a budget
router.put('/:id', authenticateToken, async (req, res) => {
  const { category, amount, currency } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE budgets SET category = $1, amount = $2, currency = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [category, amount, currency, id, req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Budget not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a budget
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM budgets WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Budget not found' });
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
