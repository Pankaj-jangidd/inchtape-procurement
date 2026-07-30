import { Request, Response, NextFunction } from "express";
import { loginSchema } from "./auth.schema.js";
import * as authService from "./auth.service.js";

export const health = (_req: Request, res: Response) => {
  res.json({
    message: "Auth module is working 🚀",
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = loginSchema.parse(req.body);

    const result = await authService.login(body);

    res.json(result);
  } catch (err) {
    next(err);
  }
};
