import * as z from "zod";

export const Subscription = z.object({
  form: z.number(),
  values: z.array(
    z.object({
      value: z.email(),
      field: z.number(),
    }),
  ),
});

export type SubscriptionType = z.infer<typeof Subscription>;
