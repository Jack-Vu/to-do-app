import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";

const verifyAsync = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
};

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized: no token provided");
  }
  try {
    const decoded = await verifyAsync(token, jwtConfig.secret as string);
    req.body = decoded;
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
