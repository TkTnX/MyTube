import { z } from "zod";

export const playlistValidationSchema = z.object({
  title: z.string().min(3).max(100),
  authorClerkId: z.string(),
});
