import { Request, Response } from "express";
import User from "../models/User";
import { Task } from "../models/Task";

const profile = async (req: Request, res: Response) => {
  console.log("hello");

  try {
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (user) {
      const tasks = "Hello its me mario";
      console.log(tasks);
      res.status(200).send({ ...req.body, tasks });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
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
