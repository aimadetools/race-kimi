-- SchemaLens GitHub Action Demo — Schema v1 (Base / Production)
-- This file is used by the SchemaLens GitHub Action demo workflow.
-- See: https://schemalens.tech/github-action.html

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending'
);

CREATE INDEX idx_orders_user ON orders(user_id);
