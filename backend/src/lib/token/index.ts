import jwt from "jsonwebtoken";
import { Response } from "express";

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;
type Cookie = {
  res: Response;
  userId: string;
};

export const setJwtAuthCookie = ({ res, userId }: Cookie) => {
  const payload = { userId };
  const expiresIn = process.env.JWT_EXPIRES_IN as Time;
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(payload, secret, {
    audience: ["user"],
    expiresIn: expiresIn || "7d",
  });

  return res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
};

export const clearJwtAuthCookie = (res: Response) =>
  res.clearCookie("accessToken", { path: "/" });

/**
 * --------------------------------------------
 * Generate JWT Token
 * --------------------------------------------
 */

export function generateJwtToken(payload: { userId: string }) {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d", // token valid for 7 days
    audience: "user", // must match your passport-jwt audience
    algorithm: "HS256",
  });
}
