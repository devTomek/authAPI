import { Request, Response } from "express";
import { createUserSchema } from "../schemas/createUser.js";
import * as userService from "../services/userService.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createUser(req: Request, res: Response) {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
    return;
  }

  try {
    const user = await userService.createUser(parsed.data);

    if (!user) {
      console.error("Email already registered");
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
