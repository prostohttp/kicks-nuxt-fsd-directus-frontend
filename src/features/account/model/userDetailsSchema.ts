import * as z from "zod";

export const UserDetails = z.object({
  email: z.email("Required, must be a valid email"),
  first_name: z.string("Required").min(3, "Min 3 symbols"),
  last_name: z.string("Required").min(3, "Min 3 symbols"),
  gender: z.enum(["male", "female"]).optional(),
  address: z.string().optional(),
  password: z.string().optional(),
  avatar: z.string().optional(),
});

export type UserDetailsSchemaType = z.infer<typeof UserDetails>;
