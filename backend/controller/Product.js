import { Product } from "../models/Product.js";

//Add new product
export const createProduct = async (req, res) => {
    try {
        console.log("req.body:", req.body);  
        console.log("req.file:", req.file);   

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
