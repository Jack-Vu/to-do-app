import express from "express";
import { createTask, profile } from "../controllers";
import { userAuth } from "../middleware";

const authRouter = express.Router();

authRouter.get("/profile/:username", userAuth, profile);
authRouter.post("/createTask", userAuth, createTask)
// authRouter.post("/signup", signup);

export { authRouter };
