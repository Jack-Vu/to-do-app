// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDb } from "./config/db";
import { router } from "./routes/auth";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200,
};

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

connectDb();

app.use("/auth", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Our Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
