import express from "express";
import { userCreate, userLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/signup",userCreate);

export default userRouter;