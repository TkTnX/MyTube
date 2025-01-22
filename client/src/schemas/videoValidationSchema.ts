import { z } from "zod";

export const validationSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  category: z.string().min(2).max(100),
  videoUrl: z.string().url(),
  previewUrl: z.string().min(3),
});

