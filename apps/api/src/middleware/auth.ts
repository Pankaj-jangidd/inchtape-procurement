import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: "SUPERVISOR" | "PROCUREMENT" | "ADMIN";
      };
    }
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    req.user = verifyToken(token);

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
