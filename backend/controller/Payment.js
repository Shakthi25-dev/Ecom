import { razorpayInstance } from "../config/razorpayInstance.js";
import crypto  from "crypto";

export const checkout = async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        return res.status(200).json({ 
            success: true, 
            order,
            amountInRupees: amount
         });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Payement verification

export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
    .createHmac("shak2523", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

    if (expectedSignature === razorpay_signature) {
        return res.status(200).json({ success: true, message: "Payment Verified" });
    } else {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }

};