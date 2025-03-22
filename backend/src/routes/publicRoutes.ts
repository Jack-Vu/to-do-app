import express from "express";
import { login, signup } from "../controllers";

const publicRoutes = express.Router();

publicRoutes.post("/login", login);
publicRoutes.post("/signup", signup);


export { publicRoutes };
