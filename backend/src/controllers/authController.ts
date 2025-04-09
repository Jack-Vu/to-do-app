import { Request, Response } from "express";
import { User } from "../models/User";
import { Task } from "../models/Task";

const profile = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const loggedInUser = req.body.decoded._id;
    const userProfile = await User.findOne({ username });
    if (userProfile) {
      if (userProfile._id.toString() !== loggedInUser) {
        throw new Error("Unauthorized");
      }
      const userTasks = await Task.find({ creatorId: loggedInUser }).sort({
        createdAt: -1,
      });
      res.status(200).send({
        userProfile,
        userTasks,
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
    const userExist = await User.findOne({ _id: req.body.decoded._id });
    if (!userExist) {
      throw new Error("Unauthorized");
    }
    const task = new Task(req.body);
    await task.save();
    const usersTasks = await Task.find({
      creatorId: req.body.decoded._id,
    }).sort({
      createdAt: -1,
    });
    console.log(usersTasks);
    res.status(201).send(usersTasks);
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message;
    if (errorMessage === "Unauthorized") {
      res.status(404).send({ message: errorMessage });
    }
    res.status(500).send("Server Error");
  }
};

const editTask = async (req: Request, res: Response) => {
  try {
    const taskToEdit = await Task.findById({ _id: req.body.taskId });
    if (taskToEdit) {
      if (taskToEdit?.creatorId.toString() !== req.body.decoded._id) {
        throw new Error("Unauthorized");
      }
      const updatedTask = taskToEdit.set(req.body.edit);
      console.log(updatedTask);
      await updatedTask.save();
      const userTasks = await Task.find({
        creatorId: req.body.decoded._id,
      }).sort({
        createdAt: -1,
      });
      res.status(200).send({ userTasks });
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (req: Request, res: Response) => {
  console.log("we here");

  try {
    const taskToDelete = await Task.findById({ _id: req.body.taskId });
    if (taskToDelete) {
      if (taskToDelete?.creatorId.toString() !== req.body.decoded._id) {
        throw new Error("Unauthorized");
      }
      await Task.findByIdAndDelete({ _id: req.body.taskId });
      const userTasks = await Task.find({
        creatorId: req.body.decoded._id,
      }).sort({
        createdAt: -1,
      });
      res.status(200).send({ userTasks });
    }
  } catch (error) {
    console.error(error);
  }
};

const addStep = async (req: Request, res: Response) => {
  try {
    const taskToEdit = await Task.findById({ _id: req.body.taskId });
    if (taskToEdit) {
      if (taskToEdit?.creatorId.toString() !== req.body.decoded._id) {
        throw new Error("Unauthorized");
      }
      taskToEdit.steps.push(req.body.newStep);
      console.log("Yo we lit", taskToEdit);

      await taskToEdit.save();
      const userTasks = await Task.find({
        creatorId: req.body.decoded._id,
      }).sort({
        createdAt: -1,
      });
      res.status(200).send({ userTasks });
    }
  } catch (error) {
    console.error(error);
  }
};

const editStep = async (req: Request, res: Response) => {
  console.log("editing steps");
  try {
    const taskToEdit = await Task.findById({ _id: req.body.taskId });
    if (taskToEdit) {
      if (taskToEdit?.creatorId.toString() !== req.body.decoded._id) {
        throw new Error("Unauthorized");
      }
      const setIndex = taskToEdit.steps.findIndex(
        (step) => step._id.toString() === req.body.stepId
      );
      console.log(setIndex);
      console.log(taskToEdit.steps[setIndex]);

      if (req.body.editType === "completed") {
        taskToEdit.steps[setIndex].completed =
          !taskToEdit.steps[setIndex].completed;
      }
      if (req.body.editType === "description") {
        taskToEdit.steps[setIndex].description = req.body.description;
      }
      console.log("Yo we lit", taskToEdit.steps[0]);
      console.log("Edit", req.body.description);

      await taskToEdit.save();
      const userTasks = await Task.find({
        creatorId: req.body.decoded._id,
      }).sort({
        createdAt: -1,
      });
      res.status(200).send({ userTasks });
    }
  } catch (error) {
    console.error(error);
  }
};

export { profile, createTask, editTask, deleteTask, addStep, editStep };
