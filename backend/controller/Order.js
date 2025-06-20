import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.login.id;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if(!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        //Calculate total
        const totalCost = cart.items.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);

        const order = await Order.create({
            user: userId,
            items: cart.items,
            totalCost
        });

        //Clear cart
        await cart.deleteOne();

        return res.status(201).json({ message: "Order placed successfully", order });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Get user orders

export const getUserOrder = async (req, res) => {
    try {
        const orders = await order.find({ user: req.login.id }).populate("items.product");
        return res.status(200).json({ message: "Your Orders", orders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//View orders (Admin)

export const getAllOrders = async (req, res) => {
    try {
        if (req.login.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const orders = await Order.find()
            .populate("items.product")
            .populate("user", "name email");

        return res.status(200).json({
            message: "All orders",
            orders
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
