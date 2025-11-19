import * as z from "zod";

export const Register = z.object({
  email: z.email("Required, and must be a valid email"),
  password: z.string("Required").min(8, { error: "Min 8 symbols" }),
});

export type RegisterType = z.infer<typeof Register>;
