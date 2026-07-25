import { Request, Response } from "express";
import pool from "../db";

// Get All Customers
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching customers" });
  }
};

// Add Customer
export const addCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body;

    const result = await pool.query(
      `INSERT INTO customers(name,email,phone,address)
       VALUES($1,$2,$3,$4)
       RETURNING *`,
      [name, email, phone, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding customer" });
  }
};

// Update Customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    const result = await pool.query(
      `UPDATE customers
       SET name=$1, email=$2, phone=$3, address=$4
       WHERE id=$5
       RETURNING *`,
      [name, email, phone, address, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating customer" });
  }
};

// Delete Customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM customers WHERE id=$1",
      [id]
    );

    res.status(200).json({
      message: "Customer Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};