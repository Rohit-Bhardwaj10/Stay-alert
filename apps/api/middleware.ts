import type { Request, Response, NextFunction } from "express";

export const authmiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["authentication"] as string;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.userId = userId;
  return next();
};
