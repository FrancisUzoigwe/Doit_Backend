import mongoose, { Document, model, Schema } from "mongoose";

interface iTask {
  user?: {};
  content?: string;
  topic?: string;
}

interface iTaskData extends iTask, Document {}

const taskModel = new Schema<iTaskData>(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    content: { type: String, required: true },
    topic: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<iTaskData>("tasks", taskModel);
