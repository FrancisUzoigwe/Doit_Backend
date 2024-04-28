import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
export const registerAccount = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({ userName, email, password: hashed });

    return res.status(201).json({
      message: "Acccount created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error creating account",
      data: error,
    });
  }
};

export const signinAccount = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password || "");
      if (check) {
        return res.status(200).json({
          message: "Signed in successfully",
          data: user,
        });
      } else {
        return res.status(401).json({
          message: "Invalid password or email address",
        });
      }
    } else {
      return res.status(401).json({
        message: "Account not found",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error signing in",
      data: error.message,
    });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, lastName } = req.body;
    const user = await userModel.findByIdAndUpdate(
      userID,
      { firstName, lastName },
      { new: true }
    );

    return res.status(201).json({
      message: "Account info updated successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error updating user info",
      data: error.message,
    });
  }
};

export const deleteUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndDelete(userID);
    return res.status(201).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error deleting user",
      data: error.message,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: ` Viewing ${users.length} users`,
      data: users,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error getting users",
      data: error.message,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "Account successfully gotten",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error getting one user",
      data: error.message,
    });
  }
};
