import { Request, Response } from "express";
import { createUserSchema } from "../schemas/createUser.js";
import { updateUserSchema } from "../schemas/updateUser.js";
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
    const errorMessage = parsed.error.issues[0]?.message ?? "Invalid request";

    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
    return;
  }

  try {
    const user = await userService.createUser(parsed.data);

    if (!user) {
      const errorMessage = "Email already registered";

      console.error(errorMessage);
      res.status(409).json({ error: errorMessage });
      return;
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    const errorMessage = "Invalid user id";

    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
    return;
  }

  const parsed = updateUserSchema.safeParse(req.body);

  if (!parsed.success) {
    const errorMessage = parsed.error.issues[0]?.message ?? "Invalid request";

    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
    return;
  }

  try {
    const user = await userService.updateUser(id, parsed.data);

    if (!user) {
      const errorMessage = "Unable to update user";

      console.error(errorMessage);
      res.status(400).json({ error: errorMessage });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    const errorMessage = "Invalid user id";

    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
    return;
  }

  try {
    const user = await userService.deleteUser(id);

    if (!user) {
      const errorMessage = "Unable to delete user";

      console.error(errorMessage);
      res.status(400).json({ error: errorMessage });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
