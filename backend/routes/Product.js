import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../models/multer.js";
import { createProduct } from "../controller/Product.js";

const router = express.Router();
router.post("/product/new", uploadFiles, isAuth, createProduct);
export default router;
