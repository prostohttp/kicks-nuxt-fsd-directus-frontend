export { useCartStore } from "./model/stores/cart";

export type {
  CartTypeApi,
  CartWithoutPopulatedProductApi,
  CartProductApi,
  CartProductWithoutPopulatedProductApi,
} from "./api/types";
export {
  getUserCartApi,
  getUserCartApiWithProductAndOptions,
} from "./api/index";

export {
  LOCAL_CART_KEY,
  type CartInStoreType,
  type ProductCartInStoreType,
  type OptionsProductCartInStoreType,
  type OptionValueProductCartInStoreType,
} from "./model/types";

export { updataLocalStorageByKey } from "./model/helpers";

export { default as CartCount } from "./ui/CartCount/CartCount.vue";
