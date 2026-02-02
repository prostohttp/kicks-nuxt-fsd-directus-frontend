export { default as ProductCard } from "./ui/ProductCard/ProductCard.vue";
export { default as ProductDetails } from "./ui/ProductDetails/ProductDetails.vue";
export { default as CompactProductCard } from "./ui/CompactProductCard/CompactProductCard.vue";

export type { ApiProductType } from "./api/types";
export type {
  ProductCardType,
  ProductDetailsType,
  ProductOptionsType,
} from "./model/types";
export { useProductOrderStore } from "./model/stores/order";

export { useProductStore } from "./model/stores/product";
export {
  getProductApi,
  getProductOptionsApi,
  getProductsApi,
  getProductRatingApi,
  getProductReviewsCountApi,
} from "./api/index";
