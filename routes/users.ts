import express from "express";
import { getUser } from "../controllers/users";
const userRouter = express.Router();
import { authCreateUser } from "../controllers/users";

userRouter.post("/signin", getUser);
userRouter.post("/signup", authCreateUser);
export default userRouter;
