import mongoose from "mongoose";
import moongoose from "mongoose";
import env from "dotenv";
env.config();

export const doitDB = () => {
  mongoose.connect(process.env.STRING!).then(() => {
    console.log("Database connection established");
  });
};
