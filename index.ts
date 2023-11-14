import express from "express";
import { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
// import * as dotenv from "dotenv";
import userRouter from "./routes/users";
const app = express();
// dotenv.config();

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://localhost/Dashboard";

mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", (error: any) => console.error(error));
db.once("open", () => console.log("Connected to mongodb"));

app.use("/v1/api", userRouter);
app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Dashboard")
})
app.listen(3009, () =>
  console.log(`Server connected at port number 3009`)
);
