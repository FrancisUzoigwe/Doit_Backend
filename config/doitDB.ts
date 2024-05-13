import mongoose from "mongoose";


const url: string =
  "mongodb+srv://kossyuzoigwe:kossyuzoigwe@francisuzoigwe.3irljsp.mongodb.net/doit";

export const doitDB = () => {
  mongoose.connect(url).then(() => {
    console.log("Database connection established");
  });
};
