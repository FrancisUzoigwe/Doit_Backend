"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.route("/create-account").post(userController_1.registerAccount);
router.route("/signin-account").post(userController_1.signinAccount);
router.route("/:userID/update-account").patch(userController_1.updateUserInfo);
router.route("/:userID/delete-account").post(userController_1.deleteUserInfo);
router.route("/:userID/get-one-account").get(userController_1.getOneUser);
router.route("/get-all-account").get(userController_1.getAllUsers);
exports.default = router;
