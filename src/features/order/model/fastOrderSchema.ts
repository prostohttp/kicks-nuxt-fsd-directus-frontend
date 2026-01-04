import * as z from "zod";

export const FastOrder = z.object({
  name: z.string("Required").min(1, "Min 1 symbols"),
  email: z.email("Required, must be a valid email"),
  comment: z.string("Required").max(150, "max 150 symbols"),
  status: z.enum(["inProgress", "done"]),
  product: z.number().optional(),
  product_count: z.number().min(1).max(5),
  options: z.array(z.object({ option_values_id: z.string() })),
});

export type FastOrderType = z.infer<typeof FastOrder>;
