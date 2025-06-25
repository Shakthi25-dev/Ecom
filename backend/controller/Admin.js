import { User } from "../models/User.js";
import { Product } from "../models/Product.js";

// ✅ Get unverified artisans
export const getPendingArtisans = async (req, res) => {
  try {
    const users = await User.find({ role: "artisan", verified: false });
    res.status(200).json({ artisans: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Verify artisan
export const verifyArtisan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "artisan") {
      return res.status(404).json({ message: "Artisan not found" });
    }

    user.verified = true;
    await user.save();
    res.status(200).json({ message: "Artisan verified", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get unapproved products
export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ approved: false }).populate("artisan", "name email");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve product
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.approved = true;
    await product.save();
    res.status(200).json({ message: "Product approved", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Reject (delete) product
export const rejectProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product rejected and deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
