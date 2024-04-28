import mongoose, { Document, model, Schema } from "mongoose";

interface iUser {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  tasks?: {}[];
}

interface iUserData extends iUser, Document {}
const userModel = new Schema<iUserData>(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    tasks: [{ type: mongoose.Types.ObjectId, ref: "tasks" }],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
