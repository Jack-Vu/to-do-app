import { model, Schema, Types } from "mongoose";
import { TaskType } from "./Task";

export type UserType = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  tasks: TaskType[];
};

const userSchema = new Schema<UserType>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { collection: "Users" }
);

const User = model<UserType>("User", userSchema);

export default User;
