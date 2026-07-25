import { Request, Response } from "express";
import pool from "../db";

// Get All Orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Add Order
export const addOrder = async (req: Request, res: Response) => {
  try {
    const { customer_name, product_name, quantity, total_price } = req.body;

    const result = await pool.query(
      `INSERT INTO orders(customer_name, product_name, quantity, total_price)
       VALUES($1,$2,$3,$4)
       RETURNING *`,
      [customer_name, product_name, quantity, total_price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error adding order" });
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { customer_name, product_name, quantity, total_price } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET customer_name = $1,
           product_name = $2,
           quantity = $3,
           total_price = $4
       WHERE id = $5
       RETURNING *`,
      [customer_name, product_name, quantity, total_price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error updating order" });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
};