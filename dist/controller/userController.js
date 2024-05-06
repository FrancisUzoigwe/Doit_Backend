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
exports.getOneUser = exports.getAllUsers = exports.deleteUserInfo = exports.updateUserInfo = exports.signinAccount = exports.registerAccount = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({ userName, email, password: hashed });
        return res.status(201).json({
            message: "Acccount created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error creating account",
            data: error,
        });
    }
});
exports.registerAccount = registerAccount;
const signinAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user.password || "");
            if (check) {
                return res.status(200).json({
                    message: "Signed in successfully",
                    data: user,
                });
            }
            else {
                return res.status(401).json({
                    message: "Invalid password or email address",
                });
            }
        }
        else {
            return res.status(401).json({
                message: "Account not found",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error signing in",
            data: error.message,
        });
    }
});
exports.signinAccount = signinAccount;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { firstName, lastName } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(userID, { firstName, lastName }, { new: true });
        return res.status(201).json({
            message: "Account info updated successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error updating user info",
            data: error.message,
        });
    }
});
exports.updateUserInfo = updateUserInfo;
const deleteUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error deleting user",
            data: error.message,
        });
    }
});
exports.deleteUserInfo = deleteUserInfo;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            message: ` Viewing ${users.length} users`,
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error getting users",
            data: error.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: "Account successfully gotten",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error getting one user",
            data: error.message,
        });
    }
});
exports.getOneUser = getOneUser;
