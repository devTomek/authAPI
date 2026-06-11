import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import { getJwtSecret } from "../utils/getJwtSecret.js";

export async function requireJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const [scheme, token] = authHeader?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    console.error("Missing bearer token");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    await jwtVerify(token, getJwtSecret());
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
}
