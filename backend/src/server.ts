// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config";
import { authRouter, publicRoutes } from "./routes";


dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200,
};

const app: Express = express();
const port = process.env.PORT;

app.use(express.json()); // Enables JSON parsing for incoming requests
app.use(express.urlencoded({ extended: true })); // Handles form data

app.use(cors(corsOptions));

connectDb();

app.use("/auth", authRouter);
app.use(publicRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Our Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
