import { Date, model, Schema, Types } from "mongoose";
import { User } from "./User";
import sanitizeHtml from "sanitize-html";
import { StepSchema, StepType } from "./Step";

type TaskType = {
  _id: Types.ObjectId;
  creatorId: Types.ObjectId;
  task: string;
  completed: boolean;
  important: boolean;
  myDay: boolean;
  dueDate: Date;
  repeatInterval: "Daily" | "Weekdays" | "Weekly" | "Monthly" | "Yearly";
  note: string;
  createdAt: Date;
  steps: [StepType];
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
    repeatInterval: String,
    note: {
      type: String,
      trim: true,
      set: (value: string) => sanitizeHtml(value),
    },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    steps: [StepSchema],
  },
  { collection: "Tasks" }
);

const Task = model<TaskType>("Task", taskSchema);

export { Task, TaskType };
