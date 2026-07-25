import { Router } from "express";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";

const router = Router();

router.get("/", getOrders);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;