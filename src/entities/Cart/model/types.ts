import type { CartApiType, CartProductApiType } from "~/src/entities/Cart";

export type CartProductType = Omit<
  CartProductApiType,
  "user_created" | "id"
> & {
  id?: string;
  user_created?: string;
};

export type CartType = Omit<CartApiType, "user_created" | "id"> & {
  user_created?: string;
};
