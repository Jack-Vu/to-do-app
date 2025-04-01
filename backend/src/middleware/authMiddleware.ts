import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      throw new Error("Unauthorized: no token provided");
    }
    const decoded = jwt.verify(token, jwtConfig.secret as string);
    req.body = { ...req.body, decoded };
    next();
  } catch (error) {
    console.log(error);
    const errorMessage = (error as Error).message;
    if (errorMessage === "Unauthorized: no token provided") {
      res.status(400).send({ message: errorMessage });
    } else {
      res.status(403).send({ message: "Forbidden: Invalid token" });
    }
  }
};

export { userAuth };
