import * as z from "zod";

export const Order = z.object({
  user_created: z.string("Required").min(1, "Min 1 symbols"),
  cart: z.string("Required").min(1, "Min 1 symbols"),
  first_name: z.string("Required").min(3, "Min 3 symbols"),
  last_name: z.string("Required").min(3, "Min 3 symbols"),
  email: z.email("Required, must be a valid email"),
  phone: z.string().optional(),
  address: z.string("Required").min(10, "Min 10 symbols"),
  payment: z.string("Required").min(1, "Required"),
  delivery: z.string("Required").min(1, "Required"),
  status: z.literal("created"),
});

export type OrderSchemaType = z.infer<typeof Order>;
