import { Request, Response } from "express";
import pool from "../db";

// Get All Products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error: any) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
      code: error.code,
    });
  }
};
// Add Product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity } = req.body;

    const result = await pool.query(
      `INSERT INTO products(name,price,quantity)
       VALUES($1,$2,$3)
       RETURNING *`,
      [name, price, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Error adding product",
      error: error.message,
      code: error.code,
    });
  }
};
// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name=$1, price=$2, quantity=$3
       WHERE id=$4
       RETURNING *`,
      [name, price, quantity, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id=$1",
      [id]
    );

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};