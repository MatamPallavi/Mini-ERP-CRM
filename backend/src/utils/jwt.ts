import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};