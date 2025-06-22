import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { placeOrder, getUserOrder, getAllOrders, updateOrderStatus } from "../controller/Order.js";

const router = express.Router();

router.post("/order", isAuth, placeOrder);
router.get("/order/user", isAuth, getUserOrder);
router.get("/order/all", isAuth, getAllOrders);
router.put("/order/:id", isAuth, updateOrderStatus);

export default router;
