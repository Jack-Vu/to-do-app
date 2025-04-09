import express from "express";
import {
  addStep,
  createTask,
  deleteStep,
  deleteTask,
  editStep,
  editTask,
  profile,
  promoteStep,
} from "../controllers";
import { userAuth } from "../middleware";

const authRouter = express.Router();

authRouter.get("/:username", userAuth, profile);
authRouter.post("/createTask", userAuth, createTask);
authRouter.post("/editTask", userAuth, editTask);
authRouter.delete("/deleteTask", userAuth, deleteTask);
authRouter.post("/addStep", userAuth, addStep);
authRouter.post("/editStep", userAuth, editStep);
authRouter.post("/promoteStep", userAuth, promoteStep);
authRouter.post("/deleteStep", userAuth, deleteStep);

export { authRouter };
