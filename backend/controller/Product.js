import { Product } from "../models/Product.js";
import { rm } from "fs";
import mongoose from "mongoose";

//Add new product
export const createProduct = async (req, res) => {
    try {
      
        if (req.login.role != "admin") {
            return res.status(403).json({
                message: "Unauthorized Access",
            });
        }

        const { title, description, category, price, stock } = req.body;
        const image = req.file;

        if (!image) {
            return res.status(400).json({
                message: "Please select the image",
            });
        }

        const product = await Product.create({
            title,
            description,
            category,
            price,
            stock,
            image: image?.path,
        });

        return res.status(201).json({
            message: "Product details added successfully",
            product,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

//Fetch all products
export const fetchAllProduct = async (req, res) => {
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
    try{
        if (req.login.role != "admin") {
                return res.status(403).json({
                    message: "Unauthorized Access",
                });
        
        }  

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
            message: "Invalid Product ID format",
            });
        }

        const product = await Product.findById(req.params.id);

        //Check if the product is exist
        if (!product) {
            return res.status(403).json({
                message: "Inavalid Product Details",
            });
        }

        //Delete image from Db
        rm(product.image, () => {
            console.log("Image Deleted");
        });

        await product.deleteOne();
        return res.json({
            message: "Product details successfully deleted",
        });


    } catch (error){
          return res.status(500).json({
            message: error.message,
        });
    }
}

//Update products

export const updateProducts = async (req, res) => {
    try {

        if (req.login.role != "admin"){
            return res.status(403).json({
                message: "Unauthorized Access",
            });
        }
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ 
                message: "Invalid Product ID format",
            });
        }

        const existingProduct = await Product.findById(req.params.id);
        if (!existingProduct) {
            return res.status(404).json({ 
                message: "Product not found" 
            });
        }

        const { title, description, category, price, stock } = req.body;
        const newImage = req.file;

        //Delete old image if new image is uploaded
        if (newImage && existingProduct.image) {
            rm(existingProduct.image, () => {
                console.log("Old image deleted");
            });
        }

        //Update values
        if (title) existingProduct.title = title;
        if (description) existingProduct.description = description;
        if (category) existingProduct.category = category;
        if (price) existingProduct.price = price;
        if (stock) existingProduct.stock = stock;

        if (newImage) {
            existingProduct.image = newImage.path;
        }

        await existingProduct.save();

        return res.status(200).json({
            message: "Product updated successfully",
        });
    } catch (error) {
        return res.status(500).json({ 
            message: error.message 
        });

    }
};


