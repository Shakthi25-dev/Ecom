import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../models/multer.js";
import { createProduct, fetchAllProduct, fetchSingleProduct, deleteProduct, updateProducts } from "../controller/Product.js";

const router = express.Router();
router.post("/product/new", uploadFiles, isAuth, createProduct);
router.get("/product/all-products", fetchAllProduct);
router.get("/product/single/:id", fetchSingleProduct);
router.delete("/product/:id", isAuth, deleteProduct);
router.put("/product/:id", uploadFiles, isAuth, updateProducts);


export default router;
