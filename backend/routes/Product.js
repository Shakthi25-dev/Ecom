import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../models/multer.js";
import { createProduct, getAllProduct, fetchSingleProduct, deleteProduct, updateProducts, filterProducts } from "../controller/Product.js";

const router = express.Router();
router.post("/products/new", uploadFiles, isAuth, createProduct);
router.get("/products", getAllProduct);
router.get("/products/single/:id", fetchSingleProduct);
router.delete("/products/:id", isAuth, deleteProduct);
router.put("/products/:id", uploadFiles, isAuth, updateProducts);
router.get("/products/filter", filterProducts);



export default router;
