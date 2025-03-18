import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { connectDb };
