import type { CartApiType, CartProductApiType } from "~/src/entities/Cart";

export type CartProductType = Omit<
  CartProductApiType,
  "user_created" | "id"
> & {
  id?: string;
  user_created?: string;
};

export type CartType = Omit<CartApiType, "user_created" | "id"> & {
  id?: string;
  user_created?: string;
};

export type RawSavedCartType = Omit<
  CartApiType,
  "user_created" | "id" | "product"
> & {
  id?: string;
  user_created?: string;
  product: string[];
};

export const LOCAL_CART_KEY = "kicks-cart";
