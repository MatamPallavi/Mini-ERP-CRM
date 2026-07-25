import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

// Dummy user (later we'll fetch from PostgreSQL)
const demoUser = {
  id: 1,
  name: "Admin",
  email: "admin@fundsroom.com",
  password: bcrypt.hashSync("admin123", 10),
  role: "Admin",
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email & password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Check email
    if (email !== demoUser.email) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, demoUser.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT
    const token = generateToken(demoUser);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};