CREATE DATABASE productsdb;

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price  NUMERIC (5, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at  timestamp NOT NULL,
    updated_at  timestamp NOT NULL
);