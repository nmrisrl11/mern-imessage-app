import type { NextFunction, Request, Response } from "express";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	res.status(200).json(req.user);
};
