import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";
import type { CreateUserInput } from "../schemas/createUser.js";
import type { UpdateUserInput } from "../schemas/updateUser.js";

const select = {
  id: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select,
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
      select,
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

export async function updateUser(id: number, input: UpdateUserInput) {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: input.email,
        password: input.password
          ? await bcrypt.hash(input.password, 12)
          : undefined,
      },
      select,
    });

    return user;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      console.error("User not found");
      return undefined;
    }

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      console.error("Email already registered");
      return undefined;
    }

    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
      select,
    });

    return user;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      console.error("User not found");
      return undefined;
    }

    throw error;
  }
}
