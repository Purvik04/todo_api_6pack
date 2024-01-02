import express from "express";
import userrouter from "./routes/user.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express();

config({
    path: './data/config.env'
})

//using middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    methods: ["GET","POST","PUT", "DELETE"],
    credentials: true,
}))

//using routes
app.use("/api/v1/users",userrouter)
app.use("/api/v1/tasks",taskRouter)

app.get("/", (req, res) => {
    res.send("Nice work")
})

//express error handling middleware 
app.use(errorMiddleware)
