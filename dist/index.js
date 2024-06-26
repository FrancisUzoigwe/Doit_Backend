"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainApp_1 = require("./mainApp");
const doitDB_1 = require("./config/doitDB");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
(0, mainApp_1.mainApp)(app);
const Server = app.listen(port, () => {
    (0, doitDB_1.doitDB)();
});
process.on("uncaughtException", (err) => {
    console.log("Server is shutting down due to uncaught exception", err.message);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Server is shutting down due to unhandled rejection", reason.message);
    Server.close(() => {
        process.exit(1);
    });
});
