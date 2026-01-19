export { useCartStore } from "./model/stores/cart";

export type { CartApiType, CartProductApiType } from "./api/types";
export { getUserCartApi } from "./api/index";

export {
  LOCAL_CART_KEY,
  type CartProductType,
  type CartType,
  type RawSavedCartType,
} from "./model/types";
export { updataLocalStorageByKey } from "./model/helpers";

export { default as CartCount } from "./ui/CartCount/CartCount.vue";
