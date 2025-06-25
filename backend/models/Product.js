import mongoose from "mongoose";

const Schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    stock: {
        type: Number,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    sold: {
        type: Number,
        default: 0,
    },

    category: {
        type: String,
        required: true,
    },

    approved: { type: Boolean, default: false },
    artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

});

export const Product = mongoose.model("Product", Schema);
