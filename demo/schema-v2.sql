-- SchemaLens GitHub Action Demo — Schema v2 (PR / Staging)
-- This file is used by the SchemaLens GitHub Action demo workflow.
-- See: https://schemalens.tech/github-action.html

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  email_verified_at TIMESTAMP,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  shipped_at TIMESTAMP,
  tracking_number VARCHAR(100)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
