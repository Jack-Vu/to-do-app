import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const signup = async (req: Request, res: Response) => {
  try {
    const [usernameExist, emailExist] = await Promise.all([
      User.findOne({ username: req.body.username }).exec(),
      User.findOne({ email: req.body.email }).exec(),
    ]);
    if (usernameExist) {
      return res.status(400).send({ message: "Username already in use" });
    }
    if (emailExist) {
      return res.status(400).send({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "Account has been created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

export { signup };
