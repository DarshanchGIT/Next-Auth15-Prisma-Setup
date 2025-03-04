import { z } from "zod";

export const userSignupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(5, "Password must be at least 5 characters"),
});
