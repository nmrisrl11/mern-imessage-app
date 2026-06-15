import http from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, { cors: { origin: [allowedOrigin] } });

//! Online users map = { userId: socketId }
const userSocketMap: Record<string, string> = {};

function getReceiverSocketId(userId: string) {
	return userSocketMap[userId];
}

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId as string;

	if (userId) userSocketMap[userId] = socket.id;

	//! io.emit() sends event to everyone - broadcast
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	//! socket.on is used to listen for events
	socket.on("disconnect", () => {
		if (userId) delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, getReceiverSocketId, io, server };
