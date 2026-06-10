import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";
import type { CreateUserInput } from "../schemas/createUser.js";

type CreatedUser = {
  id: number;
  email: string;
  createdAt: Date;
};

export async function createUser(
  input: CreateUserInput,
): Promise<CreatedUser | undefined> {
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

    return user;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return undefined;
    }

    throw error;
  }
}
