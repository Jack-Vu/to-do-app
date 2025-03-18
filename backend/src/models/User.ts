import { model, Schema, Types } from "mongoose";
import { TaskType } from "./Task";
import sanitizeHtml from "sanitize-html";

export type UserType = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  tasks: TaskType[];
};

const userSchema = new Schema<UserType>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (value: string) => sanitizeHtml(value.trim()),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (value: string) => value.toLowerCase(),
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { collection: "Users" }
);

const User = model<UserType>("User", userSchema);

export default User;
