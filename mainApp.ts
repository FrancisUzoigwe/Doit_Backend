import { Application, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";
import user from "./router/userRouter";
export const mainApp = (app: Application) => {
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.use(morgan("dev"));
  app.get("/api/v2", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Success!!...",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  });

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Success!!...",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  });

  app.use("/api/v2", user);
};
