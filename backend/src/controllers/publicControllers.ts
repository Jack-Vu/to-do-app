import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";

const signup = async (req: Request, res: Response) => {
  try {
    const [usernameExist, emailExist] = await Promise.all([
      User.findOne({ username: req.body.username }).exec(),
      User.findOne({ email: req.body.email }).exec(),
    ]);
    if (usernameExist) {
      throw new Error("Username has been taken");
    }
    if (emailExist) {
      throw new Error("Email has been taken");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "Account has been created" });
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message;
    if (
      errorMessage === "Username has been taken" ||
      errorMessage === "Email has been taken"
    ) {
      res.status(400).send({ message: errorMessage });
    } else {
      res.status(500).send({ message: "Server error" });
    }
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select(
      "+password"
    );
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ _id: user._id }, jwtConfig.secret as string, {
          expiresIn: jwtConfig.expiresIn,
        });
        res.status(200).send(token);
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message;
    if (errorMessage === "User not found") {
      res.status(404).send({ message: errorMessage });
    } else if (errorMessage === "Invalid credentials") {
      res.status(400).send({ message: errorMessage });
    } else {
      res.status(500).send({ message: "Server error" });
    }
  }
};



export { signup, login };
