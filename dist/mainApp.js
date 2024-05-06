"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const taskRouter_1 = __importDefault(require("./router/taskRouter"));
const mainApp = (app) => {
    app.use((0, express_1.json)());
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }));
    app.use((0, morgan_1.default)("dev"));
    app.get("/api/v2", (req, res) => {
        try {
            return res.status(200).json({
                message: "Success!!...",
            });
        }
        catch (error) {
            console.log(error.message);
        }
    });
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Success!!...",
            });
        }
        catch (error) {
            console.log(error.message);
        }
    });
    app.use("/api/v2", userRouter_1.default);
    app.use("/api/v2", taskRouter_1.default);
};
exports.mainApp = mainApp;
