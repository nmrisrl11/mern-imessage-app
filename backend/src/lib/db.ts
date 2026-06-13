import { setServers } from "node:dns/promises";
import mongoose from "mongoose";

setServers(["1.1.1.1", "8.8.8.8"]);

export async function connectDB() {
	try {
		const mongoUri = process.env.MONGO_URI;

		if (!mongoUri) {
			throw new Error("MONGO_URI is required");
		}

		const connect = await mongoose.connect(mongoUri);

		console.log("MongoDB connected", connect.connection.host);
	} catch (error) {
		if (error instanceof Error) {
			console.error("MongoDB connection error:", error.message);
		} else {
			console.error("MongoDB connection error:", error);
		}
		process.exit(1);
	}
}
