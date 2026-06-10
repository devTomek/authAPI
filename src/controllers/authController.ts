import { Request, Response } from "express";
import { loginSchema } from "../schemas/login.js";
import * as authService from "../services/authService.js";

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    const errorMessage = parsed.error.issues[0]?.message ?? "Invalid request";

    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
    return;
  }

  try {
    const result = await authService.login(parsed.data);

    if (!result) {
      const errorMessage = "Invalid email or password";

      console.error(errorMessage);
      res.status(401).json({ error: errorMessage });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
