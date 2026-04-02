import { Request, Response } from "express";
import { generateToken } from "../lib/utils";
import { ENV } from "../lib/env";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import {
  sendPasswordResetEmail,
  sendPasswordResetEmailSuccess,
} from "../emails/emailHandler";
import { send } from "process";

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id.toString(), res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invaild user data" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password!);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id.toString(), res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } catch (error: any) {
    console.error("error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 3600000);

    user.passwordResetToken = resetToken;
    user.passwordResetExpiresAt = resetTokenExpiresAt;
    await user.save();

    sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpiresAt = null;

    await user.save();

    sendPasswordResetEmailSuccess(user.email);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }

    generateToken((req.user as any)._id, res);

    res.redirect(`${ENV.CLIENT_URL}/auth/google/success`);
  } catch (error: any) {
    console.error("Error in Google auth callback:", error.message);
    res.redirect(`${ENV.CLIENT_URL}/login?error=server_error`);
  }
};
