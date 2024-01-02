import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";

const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticated,newTask)

taskRouter.get("/mytasks", isAuthenticated,getMyTasks)

taskRouter.route("/:taskId").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default taskRouter;