export { default as ProductCard } from "./ui/ProductCard/ProductCard.vue";
export { default as ProductDetails } from "./ui/ProductDetails/ProductDetails.vue";

export { type ApiProductType } from "./api/types";
export { type ProductCardType, type ProductDetailsType } from "./model/types";

export { useProductStore } from "./model/stores/product";
export {
  getProduct,
  getProducts,
  getProductRating,
  getProductReviewsCount,
} from "./api/index";
