import { model, Schema, Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
}, {collection: "Users"});

const User = model<IUser>("User", userSchema);

export default User;
