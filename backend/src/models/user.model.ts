import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>({
	username: {type: String, required: true, trim: true, unique: true},
	password: {type: String, required: true }
});

export const UserModel = model("User", userSchema);