import express from "express";
import { login, signup } from "../controllers";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);


export { router };
