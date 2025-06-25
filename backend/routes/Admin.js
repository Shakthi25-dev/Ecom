import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/authorize.js";
import {
  getPendingArtisans,
  verifyArtisan,
  getPendingProducts,
  approveProduct,
  rejectProduct
} from "../controller/Admin.js";

const router = express.Router();

router.get("/artisans/pending", isAuth, isAdmin, getPendingArtisans);
router.put("/artisans/:id/verify", isAuth, isAdmin, verifyArtisan);
router.get("/products/pending", isAuth, isAdmin, getPendingProducts);
router.put("/products/:id/approve", isAuth, isAdmin, approveProduct);
router.put("/products/:id/reject", isAuth, isAdmin, rejectProduct);

export default router;
