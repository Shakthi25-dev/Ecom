import { Product } from "../models/Product.js";
import { rm } from "fs";

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
        return res.status(200).json({
            message: "List of products", product
        });
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
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(403).json({
                message: "Inavalid Product Details",
            });
        }

        //Removing the image
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


