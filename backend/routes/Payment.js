import express from "express";
import { checkout, paymentVerification } from "../controller/Payment.js";
import { isAuth } from "../middleware/isAuth.js"

const router = express.Router();

router.post("/checkout", isAuth, checkout);
router.post("/payment-verify", paymentVerification);

export default router;
