import { Date, model, Schema, Types } from "mongoose";
import { User } from "./User";
import sanitizeHtml from "sanitize-html";

type TaskType = {
  _id: Types.ObjectId;
  creatorId: Types.ObjectId;
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
    creatorId: { type: Schema.Types.ObjectId, ref: User, required: true },
    task: {
      type: String,
      required: true,
      trim: true,
      set: (value: string) => sanitizeHtml(value),
    },
    completed: Boolean,
    important: Boolean,
    myDay: Boolean,
    dueDate: Date,
    note: {
      type: String,
      trim: true,
      set: (value: string) => sanitizeHtml(value),
    },
    createdAt: { type: Schema.Types.Date, default: Date.now },
  },
  { collection: "Tasks" }
);

const Task = model<TaskType>("Task", taskSchema);

export { Task, TaskType };
