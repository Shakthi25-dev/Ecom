import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { placeOrder, getUserOrder, getAllOrders, updateOrderStatus, getOrdersByDate } from "../controller/Order.js";

const router = express.Router();

router.post("/orders", isAuth, placeOrder);
router.get("/orders/user", isAuth, getUserOrder);
router.get("/orders/all", isAuth, getAllOrders);
router.get("/orders", isAuth, getOrdersByDate);
router.put("/orders/:id", isAuth, updateOrderStatus);

export default router;
