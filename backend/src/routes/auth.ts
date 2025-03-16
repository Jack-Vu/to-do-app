import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

router.post("/login", async (req: Request, resp: Response) => {
  console.log(req.body);

  try {
    const user = await User.create(req.body);

    console.log("user saved");
    resp.status(201).json(user);
    console.log(user);
  } catch (error) {
    console.log("BIG ERROR");
    resp.send("Something Went Wrong");
  }
});

router.post("/signup", async (req: Request, resp: Response) => {
  console.log(req.body);

  try {
    const user = await User.create(req.body);

    console.log("user saved");
    resp.status(201).json(user);
    console.log(user);
  } catch (error) {
    console.log("BIG ERROR");
    resp.send("Something Went Wrong");
  }
});

export { router };
