import mongoose from "mongoose";
import { setServers } from "node:dns/promises"

setServers(["1.1.1.1", "8.8.8.8"]);

export async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URI

        if(!mongoUri) {
            throw new Error("MONGO_URI is required")
        }

        const connect = await mongoose.connect(mongoUri)

        console.log("MongoDB connected", connect.connection.host)
    } catch (error) {
        console.error("MongoDB connection error: ", error.message)
        process.exit(1)
    }
}