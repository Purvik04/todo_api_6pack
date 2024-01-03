import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const getAllUsers = async (req, res) => {
    const user = await User.find();
    if(!user){
        return res.status(404).json({
            success: false,
            message: "no user found"
        })
    }
    res.status(200).json({
        success:true,
        user
    })
}

export const userRegister = async (req, res,next) => {

    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User Already Exist", 400))
        }

        const hashedpwd = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedpwd,
        })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        return res.status(201).json({
            success: true,
            token,
            message: "Registered Successfully",
        })
        // sendCookie(user, res, 201, "Registered Successfully")
    } catch (error) {
        next(error);
    }

}

export const userLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400))
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new ErrorHandler("Invalid Email or Password", 400))
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        return res.status(200).json({
            success: true,
            token,
            message:` welcome back ${ user.name }`,
        })
        // sendCookie(user, res, 200, `welcome back ${user.name}`)
    } catch (error) {
        next(error);
    }

}

export const getMyProfile = async (req, res) => {

    const {token}= req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id); 

    return res.status(200).json({
        success: true,
        user,
    })

    // return res.status(200).json({
    //     success: true,
    //     user: req.user,
    // })
}

export const logoutUser = (req,res)=>{

    return res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message: "LoggedOut Successfully"
    })
}



