import { model, Schema, Types } from "mongoose";
import sanitizeHtml from "sanitize-html";

type UserType = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isNew: boolean;
};

const userSchema = new Schema<UserType>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (value: string) => sanitizeHtml(value.trim()),
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (value: string) => sanitizeHtml(value.trim()),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (value: string) => sanitizeHtml(value.trim()),
    },
    email: {
      type: String,
      required: function () {
        return this.isNew;
      },
      unique: true,
      trim: true,
      set: (value: string) => value.toLowerCase(),
    },
    password: { type: String, required: true, minlength: 6, select: false },
  },
  { collection: "Users" }
);

const User = model<UserType>("User", userSchema);

export { User, UserType };
