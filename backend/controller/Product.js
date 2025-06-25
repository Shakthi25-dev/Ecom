import { Product } from "../models/Product.js";
import { rm } from "fs";
import mongoose from "mongoose";

//Add new product
export const createProduct = async (req, res) => {
  try {
    if (req.login.role !== "artisan") {
      return res.status(403).json({ message: "Only artisans can add products." });
    }

    const { title, description, category, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      title,
      description,
      category,
      price,
      image: req.file.filename,
      artisan: req.login.id,
      approved: false,
    });

    return res.status(201).json({ message: "Product created", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Fetch all products
export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find();
        return res.status(200).json({message: "List of products", product});
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

};

//Fetch single product
export const fetchSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        return res.status(200).json({
            message: "Product Details", product
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

};

//Delete the product
export const deleteProduct = async (req, res) => {
  try {
    if (req.login.role !== "artisan") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.artisan.toString() !== req.login.id) {
      return res.status(403).json({ message: "You do not own this product" });
    }

    if (product.image) {
      rm(`uploads/${product.image}`, (err) => {
        if (err) console.error("Error deleting image:", err);
        else console.log("Image deleted");
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//Update products
export const updateProducts = async (req, res) => {
  try {
    if (req.login.role !== "artisan") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.artisan.toString() !== req.login.id) {
      return res.status(403).json({ message: "You do not own this product" });
    }

    const { title, description, category, price, stock } = req.body;
    const newImage = req.file;

    if (newImage && existingProduct.image) {
      rm(`uploads/${existingProduct.image}`, (err) => {
        if (err) console.error("Failed to delete old image:", err);
        else console.log("Old image deleted");
      });
    }

    if (title) existingProduct.title = title;
    if (description) existingProduct.description = description;
    if (category) existingProduct.category = category;
    if (price) existingProduct.price = price;
    if (stock) existingProduct.stock = stock;
    if (newImage) existingProduct.image = newImage.filename;

    await existingProduct.save();

    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Filter products

export const filterProducts = async (req, res) => {
  try {
    const { category, sort } = req.query;

    // Build filter query
    let query = {};
    if (category) {
      query.category = category;
    }

    // Build sort logic
    let sortOption = {};
    if (sort === "price_low_to_high") {
      sortOption.price = 1;
    } else if (sort === "price_high_to_low") {
      sortOption.price = -1;
    }

    const products = await Product.find(query).sort(sortOption);
    return res.status(200).json({ message: "Filtered products", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



