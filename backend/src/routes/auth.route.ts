import { Router } from "express";
import { checkAuth } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";

export const authRoutes = Router();

authRoutes.get("/check", protectRoute, checkAuth);
