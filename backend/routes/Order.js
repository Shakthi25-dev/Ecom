import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { placeOrder, getUserOrder, getAllOrders } from "../controller/Order.js";

const router = express.Router();

router.post("/order", isAuth, placeOrder);
router.get("/order/user", isAuth, getUserOrder);
router.get("/order/all", isAuth, getAllOrders);

export default router;
