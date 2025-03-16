import { Date, model, Schema, Types } from "mongoose";
import User from "./User";

export type TaskType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  task: string;
  completed: boolean;
  important: boolean;
  myDay: boolean;
  dueDate: Date;
  note: string;
  createdAt: Date;
};

const taskSchema = new Schema<TaskType>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    userId: { type: Schema.Types.ObjectId, ref: User },
    task: String,
    completed: Boolean,
    important: Boolean,
    myDay: Boolean,
    dueDate: Date,
    note: String,
    createdAt: { type: Schema.Types.Date, default: Date.now },
  },
  { collection: "Tasks" }
);

const Task = model<TaskType>("Task", taskSchema);

export { Task };
