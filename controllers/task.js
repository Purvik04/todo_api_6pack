import Task from "../models/task.js"
import ErrorHandler from "../middleware/error.js"
import mongoose from "mongoose";

export const newTask = async(req,res,next)=>{

    try {
        const { userId, title, description } = req.body;
        
        await Task.create({
            title,
            description,
            user: userId,
        })

        return res.status(201).json({
            success: true,
            message: "task created successfully"
        });
    } catch (error) {
        next(error);
    }

}

export const getMyTasks = async (req,res,next)=>{

    try {
        const {userId} = req.body;
        // const userid = req.user._id;

        const tasks = await Task.find({ user: userId });

        return res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req,res,next)=>{

    try {
        const { taskId, title, description, isCompleted } = req.body;
        // const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if (!task) {
            //next function ma error pass karo atle app.use nu error handling middleware automatic call thay
            return next(new ErrorHandler("Task Not Found", 404))
        }

        task.title = title;
        task.description = description;
        task.isCompleted = isCompleted;

        await task.save();

        return res.status(200).json({
            success: true,
            task,
        })
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req,res,next)=>{

   try {
        const {taskId} = req.body;
    //    const { taskId } = req.params;

       const task = await Task.findByIdAndDelete(taskId);

       if (!task) {
           return next(new ErrorHandler("Task Not Found", 404))
       }

       return res.status(200).json({
           success: true,
           message: "Task deleted successfully"
       })
   } catch (error) {
        next(error);
   }
}