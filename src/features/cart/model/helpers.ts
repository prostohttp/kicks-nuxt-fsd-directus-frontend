import type { CartProductType } from "~/src/entities/Cart";

export const productOptionsHash = (product?: CartProductType) => {
  return product?.options
    .map((el) => el.option_values_id)
    .sort()
    .join("|");
};
