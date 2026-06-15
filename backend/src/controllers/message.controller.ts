import type { NextFunction, Request, Response } from "express";
import { hasImageKitConfig, uploadChatMedia } from "../lib/imagekit";
import Message from "../models/message.model";
import User from "../models/user.model";

export const getUsersForSidebar = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-clerkId");

		res.status(200).json(filteredUsers);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getUsersForSidebar:", error.message);
		} else {
			console.error("Error in getUsersForSidebar:", error);
		}

		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getConversationsForSidebar = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const loggedInUserId = req.user._id;

		const conversations = await Message.aggregate([
			//! 1. Keep only the messages I sent or received.
			{
				$match: {
					$or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
				},
			},

			//! 2. Collapse them into one row per chat partner, noting our latest message time.
			{
				$group: {
					//! The partner is the other person on the message (not me).
					_id: { $cond: [{ $eq: ["$senderId", loggedInUserId] }, "$receiverId", "$senderId"] },
					lastMessageAt: { $max: "$createdAt" },
				},
			},
			//! 3. Put the most recent conversation at the top.
			{ $sort: { lastMessageAt: -1 } },
			//! 4. Look up each partner's user profile (comes back as an array).
			{ $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
			//! 5. Pull that profile out of the array and make it the document.
			{ $replaceRoot: { newRoot: { $first: "$user" } } },
			//! 6. Hide the private clerkId field from the result.
			{ $project: { clerkId: 0 } },
		]);

		res.status(200).json(conversations);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getConversationsForSidebar:", error.message);
		} else {
			console.error("Error in getConversationsForSidebar:", error);
		}

		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userToChatId = req.params.id as string;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: myId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getMessages:", error.message);
		} else {
			console.error("Error in getMessages:", error);
		}

		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text } = req.body;
		const receiverId = req.params.id as string;
		const senderId = req.user._id;

		let imageUrl: string | undefined;
		let videoUrl: string | undefined;

		if (req.file) {
			if (!hasImageKitConfig()) {
				return res.status(500).json({ message: "Media upload is not configured." });
			}

			const url = await uploadChatMedia(req.file);
			if (req.file.mimetype.startsWith("video/")) videoUrl = url;
			else imageUrl = url;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imageUrl,
			video: videoUrl,
		});

		await newMessage.save();

		res.status(201).json(newMessage);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in sendMessage:", error.message);
		} else {
			console.error("Error in sendMessage:", error);
		}

		res.status(500).json({ message: "Internal Server Error" });
	}
};
