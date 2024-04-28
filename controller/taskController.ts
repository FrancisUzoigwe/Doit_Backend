import { Request, Response } from "express";
import userModel from "../model/userModel";
import taskModel from "../model/taskModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { content, topic } = req.body;
    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const task = await taskModel.create({ user: userID, topic, content });
    user.tasks?.push(task?._id);
    user.save();
    return res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error creating task",
      data: error.message,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
      const { userID, taskID } = req.params;
      const { content, topic } = req.body;
  
      const user = await userModel.findById(userID);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
  
      const task = await taskModel.findById(taskID);
      if (!task) {
        return res.status(400).json({
          message: "Task not found",
        });
      }
  
      task.content = content;
      task.topic = topic;
      await task.save();
  
      return res.status(200).json({
        message: "Task updated successfully",
        data: task,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error updating task",
        data: error.message,
      });
    }
  };
  
  export const viewUserTasks = async (req: Request, res: Response) => {
    try {
      const { userID } = req.params;
  
      const user = await userModel.findById(userID);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
  
      const tasks = await taskModel.find({ user: userID });
  
      return res.status(200).json({
        message: "Tasks retrieved successfully",
        data: tasks,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error fetching tasks",
        data: error.message,
      });
    }
  };
  
  export const viewOneTask = async (req: Request, res: Response) => {
    try {
      const { userID, taskID } = req.params;
  
      const user = await userModel.findById(userID);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
  
      const task = await taskModel.findOne({ _id: taskID, user: userID });
      if (!task) {
        return res.status(400).json({
          message: "Task not found for this user",
        });
      }
  
      return res.status(200).json({
        message: "Task retrieved successfully",
        data: task,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error fetching task",
        data: error.message,
      });
    }
  };
  

  export const deleteTask = async (req: Request, res: Response) => {
    try {
      const { userID, taskID } = req.params;
  
      const user = await userModel.findById(userID);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
  
      const task = await taskModel.findById(taskID);
      if (!task) {
        return res.status(400).json({
          message: "Task not found",
        });
      }
  
      if (task?.user?.toString() !== userID) {
        return res.status(401).json({
          message: "Unauthorized access to task",
        });
      }
  
      await task.deleteOne();
  
      user.tasks = user?.tasks?.filter(taskId => taskId.toString() !== taskID);
      await user.save();
  
      return res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error deleting task",
        data: error.message,
      });
    }
  };
  
