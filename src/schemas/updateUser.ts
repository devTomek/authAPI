import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.email().optional(),
  password: z.string().min(1).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
