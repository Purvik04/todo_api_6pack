import Task from "../models/task.js"
import ErrorHandler from "../middleware/error.js"

export const newTask = async(req,res,next)=>{

    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user
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
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

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
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if (!task) {
            //next function ma error pass karo atle app.use nu error handling middleware automatic call thay
            return next(new ErrorHandler("Task Not Found", 404))
        }

        task.isCompleted = !(task.isCompleted);

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
       const { taskId } = req.params;

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