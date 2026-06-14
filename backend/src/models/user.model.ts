import mongoose, { type Document } from "mongoose";

export interface IUser extends Document {
	clerkId: string;
	email: string;
	fullName: string;
	profilePic: string;
}

const userSchema = new mongoose.Schema<IUser>(
	{
		clerkId: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		fullName: { type: String, required: true },
		profilePic: { type: String, default: "" },
	},
	{ timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
