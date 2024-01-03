import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";

const taskRouter = express.Router();

//for app
taskRouter.post("/new", newTask),

taskRouter.post("/mytasks", getMyTasks),

taskRouter.put("/updateTask",updateTask),

taskRouter.delete("/deleteTask",deleteTask)


export default taskRouter;


//for web
// taskRouter.post("/new", isAuthenticated,newTask)

// taskRouter.get("/mytasks", isAuthenticated,getMyTasks)

// taskRouter.route("/:taskId").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)