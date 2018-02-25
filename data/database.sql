DROP DATABASE IF EXISTS famazonDB;

CREATE DATABASE famazonDB;

USE famazonDB;

CREATE TABLE Products (
item_id INT NOT NULL,
product_name VARCHAR(150) NULL,
department_name VARCHAR(150) NULL,
price DECIMAL(10, 2) NULL,
stock_quantity INTEGER NULL
);

SELECT * FROM Products;

-- import data before running 'line 19'

ALTER TABLE Products ADD COLUMN position_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
