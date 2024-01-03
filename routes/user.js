import express  from "express";
import { userRegister, getAllUsers, userLogin, getMyProfile, logoutUser} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const userrouter = express.Router();

userrouter.get("/all",getAllUsers)

userrouter.post("/register", userRegister)

userrouter.post("/login",userLogin )

userrouter.get("/logout",isAuthenticated,logoutUser )

// static url /userid
//dynamic url /userid/:id means /userid sudhinu static url aagal nu dynamic jene req.params thi access thay
//dynamic route function ne last ma rakhvu bcs js top to bottom compile thay
userrouter.get("/me",getMyProfile); 
// userrouter.get("/me",isAuthenticated,getMyProfile);

export default userrouter;