import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['user', 'artisan', 'admin'],
        default: "user",
    },

    verified: {
        type: Boolean,
        default: false,
    },

    contact: {
        type: String,
        required: true,
    },

}, {timestamps: true}

);

export const User = mongoose.model("User", schema);