import express from "express";
import {
  deleteUserInfo,
  getAllUsers,
  getOneUser,
  registerAccount,
  signinAccount,
  updateUserInfo,
} from "../controller/userController";

const router = express.Router();
router.route("/create-account").post(registerAccount);
router.route("/signin-account").post(signinAccount);
router.route("/:userID/update-account").patch(updateUserInfo);
router.route("/:userID/delete-account").post(deleteUserInfo);
router.route("/:userID/get-one-account").get(getOneUser);
router.route("/get-all-account").get(getAllUsers);
export default router;
