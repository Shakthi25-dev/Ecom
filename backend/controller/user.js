import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendmail.js";


//User Registration
export const registerUser = async (req, res) => {
    try {
        
        const {name, email, password, contact} = req.body;

        let existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({
                message: "User Email Already Exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(Math.random() * 100000);

        existingUser = { name, email, hashPassword, contact};



        const activation = jwt.sign({ existingUser, otp }, process.env.ACTIVATION_SECRET, {
            expiresIn: "5m",
        });

        const message = `Please verify your account using otp, your otp is ${otp}`;
        await sendMail(email, "Welcome", message);

        return res.status(200).json({
            message: "Otp Sent to your mail",
            activation,        
        });

    } catch (error) {
       return res.status(500).json({
            message:error.message,
        });
    }
};

//Verify otp

export const verifyOtp = async (req, res) => {
    try{

        const { otp, activation } = req.body;
        
        const Verify = jwt.verify(activation, process.env.ACTIVATION_SECRET);

        if(!Verify) {
            return res.json({
                message:  "OTP Expired",
            });
        }

        if (Verify.otp != otp) {
            return res.json({
                message: "Wrong OTP",
            });
        }

        await User.create({
            name: Verify.existingUser.name,
            email: Verify.existingUser.email,
            password: Verify.existingUser.hashPassword,
            contact: Verify.existingUser.contact,

        });

        return res.status(200).json({
            message: "User Registration Success!",
        });

    } catch (error) {
         return res.status(500).json({
            message:error.message,
         });

    }

};

//User login

export const userlogin = async (req, res) => {
    try {

        const { email, password } = req.body; 

        //check user email 
        const login = await User.findOne({ email });
        if(!login) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        //check password

        const matchPassword = await bcrypt.compare(password, login.password);
        if(!matchPassword) {
            return res.status(400).json({
                message: "Invalid Credentials",
            })
        }

        //Generate signed token 
        const token = jwt.sign({ _id: login._id }, process.env.JWT_SECRET, { expiresIn: "15d" });

        const { password: userPassword, ...UserDetails } = login.toObject();

        return res.status(200).json({
            message: "Welcome" +  login.name,
            token,
            UserDetails,
        });

    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

//User Profile

export const userProfile = async (req, res) => {
    console.log(req.login._id);
    try {
        const profile = await User.findById(req.login._id).select("-password");

        return res.status(200).json({
            profile,  
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
