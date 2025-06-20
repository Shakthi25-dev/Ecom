import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {

        const userId = req.login.id;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ user: userId });

        if(!cart) {

            //Create new cart
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }]
            });
        } else {

            //Update existing cart
            const index = cart.items.findIndex(item => item.product.toString() === productId);

            if(index > -1) {
                cart.items[index].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
            await cart.save();

        }
        return res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Remove from cart

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.login.id;
        const { productId } = req.body;

        const cart =  await Cart.findOne({ user: userId });
        if(!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        return res.status(200).json({ message: "Item removed from cart", cart });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Get cart

export const viewCart = async (req, res) => {
    try {
        const userId = req.login.id;

        const cart = await Cart.findOne({ user: userId }).populate({
        path: "items.product",
        model: "Product"  // Explicitly tell Mongoose which model to use
        });
        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        return res.status(200).json({ message: "Your cart", cart });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
