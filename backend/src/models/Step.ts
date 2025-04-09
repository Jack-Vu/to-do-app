import { Date, Schema, Types } from "mongoose";
import sanitizeHtml from "sanitize-html";

type StepType = {
  _id: Types.ObjectId;
  description: string;
  completed: boolean;
  createdAt: Date;
};

const StepSchema = new Schema<StepType>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  description: {
    type: String,
    required: true,
    trim: true,
    set: (value: string) => sanitizeHtml(value),
  },
  completed: Boolean,
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

export { StepSchema, StepType };
