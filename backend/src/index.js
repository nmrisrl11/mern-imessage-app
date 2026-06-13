import express from "express"
import "dotenv/config"
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(clerkMiddleware())

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`);
    });
}

startServer();