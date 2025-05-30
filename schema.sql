CREATE TABLE test_table (id SERIAL PRIMARY KEY);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budgets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('RON', 'USD', 'EUR', 'GBP', 'JPY')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('RON','USD', 'EUR', 'GBP', 'JPY')),
  description TEXT,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  frequency TEXT CHECK (
    frequency IN ('monthly', 'weekly', 'yearly')
  ),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    (is_recurring = TRUE AND frequency IS NOT NULL) OR 
    (is_recurring = FALSE AND frequency IS NULL)
  )
);