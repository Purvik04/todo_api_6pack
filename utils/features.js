import jwt from "jsonwebtoken"

export const sendCookie = (user, res, statusCode=200, message)=>{
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    
    return res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    }).json({
        success: true,
        message,
    })

}

//samesite none because frontend and backend 2 alg url uper kam karta hashe and for none secure must be true
//samesite deployment time pr kam ave localhost pr use karie to cookie set nay thay

// process.env.NODE_ENV === "Development" ? "lax" :
//process.env.NODE_ENV === "Development" ? false : 