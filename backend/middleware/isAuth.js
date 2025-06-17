import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Middleware to check if the user is authenticated
export const isAuth = async (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Auth header missing or invalid");
            return res.status(403).json({
                message: "Please Login to access",
            });
        }

        const token = authHeader.split(" ")[1];

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.login = await User.findById(decodedData._id);
        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        return res.status(403).json({
            message: "Please Login to access",
        });
    }
};
