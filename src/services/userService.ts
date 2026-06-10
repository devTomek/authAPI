import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";
import type { CreateUserInput } from "../schemas/createUser.js";

const userSelect = {
  id: true,
  email: true,
  createdAt: true,
} as const;

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: userSelect,
  });
}

export async function createUser(input: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(input.password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
      select: userSelect,
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
