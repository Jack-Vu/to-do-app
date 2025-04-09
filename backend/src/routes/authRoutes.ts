import express from "express";
import {
  addStep,
  createTask,
  deleteTask,
  editStep,
  editTask,
  profile,
} from "../controllers";
import { userAuth } from "../middleware";

const authRouter = express.Router();

authRouter.get("/:username", userAuth, profile);
authRouter.post("/createTask", userAuth, createTask);
authRouter.post("/editTask", userAuth, editTask);
authRouter.delete("/deleteTask", userAuth, deleteTask);
authRouter.post("/addStep", userAuth, addStep);
authRouter.post("/editStep", userAuth, editStep);

export { authRouter };
