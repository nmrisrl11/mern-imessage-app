import mongoose, { type Document, type Types } from "mongoose";

export interface IMessage extends Document {
	senderId: Types.ObjectId;
	receiverId: Types.ObjectId;
	text?: string;
	image?: string;
	video?: string;
}

const messageSchema = new mongoose.Schema<IMessage>(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
		},
		image: {
			type: String,
		},
		video: {
			type: String,
		},
	},
	{ timestamps: true },
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
