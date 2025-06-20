import express from "express";
import { addToCart, removeFromCart, viewCart } from "../controller/Cart.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/cart/add", isAuth, addToCart);
router.delete("/cart/remove", isAuth, removeFromCart);
router.get("/cart", isAuth, viewCart);



export default router;