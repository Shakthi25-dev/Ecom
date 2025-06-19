import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import UserRoutes from "./routes/User.js";
import ProductRoutes from "./routes/Product.js";

//Static files
app.use("/uploads", express.static("uploads"));

app.use("/api/", UserRoutes);
app.use("/api/", ProductRoutes);

app.listen(port, () => {
    console.log(`Server is running ${port}`);
    connectDB();
});