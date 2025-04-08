import express from "express";
import { createTask, deleteTask, editTask, profile } from "../controllers";
import { userAuth } from "../middleware";

const authRouter = express.Router();

authRouter.get("/:username", userAuth, profile);
authRouter.post("/createTask", userAuth, createTask);
authRouter.post("/editTask", userAuth, editTask);
authRouter.delete("/deleteTask", userAuth, deleteTask);

export { authRouter };
