CREATE DATABASE seller_db;

USE seller_db;

CREATE TABLE sellers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    aadhar BIGINT(12) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
