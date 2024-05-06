"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controller/taskController");
const router = express_1.default.Router();
router.route("/:userID/create-task").post(taskController_1.createTask);
router.route("/:userID/:taskID/update-task").patch(taskController_1.updateTask);
router.route("/:userID/:taskID/delete-task").delete(taskController_1.deleteTask);
router.route("/:userID/view-all-task").get(taskController_1.viewUserTasks);
router.route("/:userID/:taskID/view-one-task").get(taskController_1.viewOneTask);
exports.default = router;
