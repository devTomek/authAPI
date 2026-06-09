import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";
import type { CreateUserInput } from "../schemas/createUser.js";

export async function createUser(input: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(input.password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return { ok: true, user };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { ok: false, reason: "EMAIL_EXISTS" };
    }

    throw error;
  }
}
