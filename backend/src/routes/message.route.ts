import { Router } from "express";
import { getConversationsForSidebar, getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

export const messageRoutes = Router();

messageRoutes.use(protectRoute);

messageRoutes.get("/users", getUsersForSidebar);
messageRoutes.get("/conversations", getConversationsForSidebar);
messageRoutes.get("/:id", getMessages);
messageRoutes.post("/send/:id", upload.single("media"), sendMessage);
