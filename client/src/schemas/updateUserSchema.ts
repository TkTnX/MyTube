import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().max(100).optional(),
  email: z.string().optional(),
  description: z.string().optional(),
  coverImg: z.string().url().optional(),
  img: z.string().url().optional(),
});
