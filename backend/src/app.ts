import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Fundsroom ERP Backend Running 🚀");
});

// API Routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

export default app;