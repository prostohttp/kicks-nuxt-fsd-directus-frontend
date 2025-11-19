import * as z from "zod";

export const Login = z.object({
  email: z.email("Required, and must be a valid email"),
  password: z.string("Required"),
});

export type LoginType = z.infer<typeof Login>;
