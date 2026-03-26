import * as z from "zod";

export const Order = z.object({
  cart: z.string("Required").min(1, "Min 1 symbols"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.email("Required, must be a valid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
  payment: z.string("Required").min(1, "Min 1 symbols"),
  delivery: z.string("Required").min(1, "Min 1 symbols"),
  status: z.enum(["created", "paid", "canceled", "done"]),
});

export type OrderSchemaType = z.infer<typeof Order>;
