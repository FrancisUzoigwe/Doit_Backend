"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.viewOneTask = exports.viewUserTasks = exports.updateTask = exports.createTask = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID } = req.params;
        const { content, topic } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const task = yield taskModel_1.default.create({ user: userID, topic, content });
        (_a = user.tasks) === null || _a === void 0 ? void 0 : _a.push(task === null || task === void 0 ? void 0 : task._id);
        user.save();
        return res.status(201).json({
            message: "Task created successfully",
            data: task,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error creating task",
            data: error.message,
        });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, taskID } = req.params;
        const { content, topic } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const task = yield taskModel_1.default.findById(taskID);
        if (!task) {
            return res.status(400).json({
                message: "Task not found",
            });
        }
        task.content = content;
        task.topic = topic;
        yield task.save();
        return res.status(200).json({
            message: "Task updated successfully",
            data: task,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error updating task",
            data: error.message,
        });
    }
});
exports.updateTask = updateTask;
const viewUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const tasks = yield taskModel_1.default.find({ user: userID }).sort({
            createdAt: -1,
        });
        return res.status(200).json({
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error fetching tasks",
            data: error.message,
        });
    }
});
exports.viewUserTasks = viewUserTasks;
const viewOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, taskID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const task = yield taskModel_1.default.findOne({ _id: taskID, user: userID });
        if (!task) {
            return res.status(400).json({
                message: "Task not found for this user",
            });
        }
        return res.status(200).json({
            message: "Task retrieved successfully",
            data: task,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error fetching task",
            data: error.message,
        });
    }
});
exports.viewOneTask = viewOneTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { userID, taskID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const task = yield taskModel_1.default.findById(taskID);
        if (!task) {
            return res.status(400).json({
                message: "Task not found",
            });
        }
        if (((_b = task === null || task === void 0 ? void 0 : task.user) === null || _b === void 0 ? void 0 : _b.toString()) !== userID) {
            return res.status(401).json({
                message: "Unauthorized access to task",
            });
        }
        yield task.deleteOne();
        user.tasks = (_c = user === null || user === void 0 ? void 0 : user.tasks) === null || _c === void 0 ? void 0 : _c.filter((taskId) => taskId.toString() !== taskID);
        yield user.save();
        return res.status(200).json({
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error deleting task",
            data: error.message,
        });
    }
});
exports.deleteTask = deleteTask;
