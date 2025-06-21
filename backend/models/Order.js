import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Order = mongoose.model("Order", Schema);