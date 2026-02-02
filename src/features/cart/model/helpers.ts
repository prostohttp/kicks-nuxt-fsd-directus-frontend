import type {
  CartInStoreType,
  CartProductApi,
  CartWithoutPopulatedProductApi,
  ProductCartInStoreType,
} from "~/src/entities/Cart";
import type { OptionValueApi } from "~/src/entities/Option";

export const productOptionsHash = (product: CartProductApi) => {
  return product.options
    .map((el) => el.option_values_id)
    .sort()
    .join("|");
};

export const productOptionsHashFromCart = (product: ProductCartInStoreType) => {
  return product.options
    .map((el) => el.option_values_id.id)
    .sort()
    .join("|");
};

export const cartWithUnfilledOptions = (
  cart: CartInStoreType,
): CartWithoutPopulatedProductApi => {
  return {
    ...cart,
    product: cart.product.map((el) => ({
      ...el,
      product: el.product.id,
      options: el.options.map((opt) => ({
        option_values_id: opt.option_values_id.id,
      })),
    })),
  } as CartWithoutPopulatedProductApi;
};

export const transformOptions = (options: OptionValueApi[]) => {
  return options.map((opt) => ({
    option_values_id: {
      ...opt,
    },
  }));
};
