import express from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
import { doitDB } from "./config/doitDB";
env.config();

const app = express();

const port: number = parseInt(process.env.PORT!);

mainApp(app);
const Server = app.listen(port, () => {
  doitDB();
});

process.on("uncaughtException", (err: any) => {
  console.log("Server is shutting down due to uncaught exception", err.message);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(
    "Server is shutting down due to unhandled rejection",
    reason.message
  );

  Server.close(() => {
    process.exit(1);
  });
});
