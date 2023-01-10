import express from "express";
import { createUser, logIn } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", logIn);

export { userRouter };
