import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  description: z.string().optional(),
  coverImg: z.string().url().optional(),
  img: z.string().url().optional(),
});
