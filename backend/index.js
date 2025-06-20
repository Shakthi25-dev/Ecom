import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./database/db.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
mongoose.set('strictPopulate', false);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import UserRoutes from "./routes/User.js";
import ProductRoutes from "./routes/Product.js";
import CartRoutes from "./routes/Cart.js";
import OrderRoutes from "./routes/Order.js";

//Static files
app.use("/uploads", express.static("uploads"));

app.use("/api/", UserRoutes);
app.use("/api/", ProductRoutes);
app.use("/api/", CartRoutes);
app.use("/api/", OrderRoutes)

app.listen(port, () => {
    console.log(`Server is running ${port}`);
    connectDB();
});