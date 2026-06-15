import express from "express";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import job from "./lib/cron";
import { connectDB } from "./lib/db";
import { app, server } from "./lib/socket";
import { authRoutes } from "./routes/auth.route";
import { messageRoutes } from "./routes/message.route";
import { clerkWebhookRouter } from "./webhooks/clerk.webhook";

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL;
const PUBLIC_DIR = path.join(process.cwd(), "public");

app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhookRouter);

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
	res.status(200).json({ ok: true });
});

//! Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (fs.existsSync(PUBLIC_DIR)) {
	app.use(express.static(PUBLIC_DIR));

	app.get("/{*any}", (req, res, next) => {
		res.sendFile(path.join(PUBLIC_DIR, "index.html"), (err) => {
			if (err) next(err);
		});
	});
}

const startServer = async () => {
	await connectDB();

	server.listen(PORT, () => {
		console.log(`Server is up and running on port ${PORT}`);
	});

	if (process.env.NODE_ENV === "production") {
		job.start();
	}
};

startServer();
