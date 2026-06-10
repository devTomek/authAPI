import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { prisma } from "../lib/db.js";
import type { LoginInput } from "../schemas/login.js";

const select = {
  id: true,
  email: true,
  password: true,
  createdAt: true,
  updatedAt: true,
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return new TextEncoder().encode(secret);
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
    select,
  });

  if (!user) {
    return undefined;
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    return undefined;
  }

  const accessToken = await new SignJWT({
    sub: String(user.id),
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getJwtSecret());

  const { password, ...publicUser } = user;

  return {
    accessToken,
    user: publicUser,
  };
}
