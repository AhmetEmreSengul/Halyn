import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../lib/env";
import User from "../models/User";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET!);
    if (!decoded)
      return res.status(401).json({ message: "Unauhtorized invalid token" });

    const userId = typeof decoded === "string" ? undefined : decoded.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error: any) {
    console.error("Error in protectRoute", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
