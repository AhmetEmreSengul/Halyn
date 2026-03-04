import jwt from "jsonwebtoken";
import { IngredientRule } from "../models/IngredientRule";
import { Response } from "express";
import { ENV } from "./env";

export const generateToken = (userId: string, res: Response) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};

export const analyzeIngredients = async (ingredientsText: string) => {
  if (!ingredientsText) {
    return {
      status: "unknown",
      confidence: 0,
      reasons: ["No ingredient data available"],
    };
  }

  const normalized = ingredientsText.toLowerCase();
  const rules = await IngredientRule.find({ isActive: true });

  const matchedRules = rules.filter((rule) =>
    normalized.includes(rule.keyword),
  );

  if (matchedRules.length === 0) {
    return {
      status: "halal",
      confidence: 85,
      reasons: ["No suspicious ingredients detected"],
    };
  }

  const haramRules = matchedRules.filter((r) => r.status === "haram");
  if (haramRules.length > 0) {
    return {
      status: "haram",
      confidence: 100,
      reasons: haramRules.map((r) => `Contains ${r.keyword}`),
    };
  }

  let confidence = 85;

  matchedRules.forEach((rule) => {
    confidence -= rule.confidenceImpact;
  });

  confidence = Math.max(confidence, 30);

  return {
    status: "doubtful",
    confidence,
    reasons: matchedRules.map((r) => `Contains ${r.keyword}`),
  };
};
