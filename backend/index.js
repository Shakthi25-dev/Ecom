import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./database/db.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;
mongoose.set('strictPopulate', false);

app.use(cors());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import UserRoutes from "./routes/User.js";
import AdminRoutes from "./routes/Admin.js";
import ProductRoutes from "./routes/Product.js";
import CartRoutes from "./routes/Cart.js";
import OrderRoutes from "./routes/Order.js";
import PaymentRoutes from "./routes/Payment.js";

//Static files
app.use("/uploads", express.static("uploads"));

app.use("/api/", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/api/", ProductRoutes);
app.use("/api/", CartRoutes);
app.use("/api/", OrderRoutes);
app.use("/api", PaymentRoutes);

app.listen(port, () => {
    console.log(`Server is running ${port}`);
    connectDB();
});