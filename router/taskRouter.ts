import express from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  viewOneTask,
  viewUserTasks,
} from "../controller/taskController";

const router = express.Router();
router.route("/:userID/create-task").post(createTask);
router.route("/:userID/:taskID/update-task").patch(updateTask);
router.route("/:userID/:taskID/delete-task").delete(deleteTask);
router.route("/:userID/view-all-task").get(viewUserTasks);
router.route("/:userID/:taskID/view-one-task").get(viewOneTask);

export default router;
