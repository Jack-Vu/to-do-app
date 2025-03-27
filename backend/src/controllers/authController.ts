import { Request, Response } from "express";
import { User } from "../models/User";
import { Task } from "../models/Task";

const profile = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const loggedInUser = req.body._id;
    const userProfile = await User.findOne({ username });
    if (userProfile) {
      if (userProfile._id.toString() !== loggedInUser) {
        throw new Error("Unauthorized");
      }
      const tasks = await Task.find({ creatorId: loggedInUser });
      res.status(200).send({
        userProfile,
        tasks,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(404).send({ message: errorMessage });
    console.error(error);
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    const usersTasks = await Task.find({ creatorId: req.body._id });
    res.status(201).send(usersTasks);
  } catch (error) {
    console.error(error);
  }
};

export { profile, createTask };
