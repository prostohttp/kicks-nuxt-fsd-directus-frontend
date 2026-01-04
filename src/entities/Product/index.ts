export { default as ProductCard } from "./ui/ProductCard/ProductCard.vue";
export { default as ProductDetails } from "./ui/ProductDetails/ProductDetails.vue";
export { default as FastOrderProductCard } from "./ui/FastOrderProductCard/FastOrderProductCard.vue";

export type { ApiProductType } from "./api/types";
export type { ProductCardType, ProductDetailsType } from "./model/types";
export { useProductOrderStore } from "./model/stores/order";

export { useProductStore } from "./model/stores/product";
export {
  getProduct,
  getProducts,
  getProductRating,
  getProductReviewsCount,
} from "./api/index";
