import type { CollectionType } from "~/src/shared/api";
import type { ProductCardType, ProductDetailsType } from "../types";
import { getProduct, getProducts } from "../../api";

export const useProductStore = defineStore("products", () => {
  const products = ref<ProductCardType[]>([]);

  const getAllProducts = (
    collection: CollectionType,
    limit?: number,
    filter?: Record<string, unknown>,
  ): Promise<ProductCardType[]> => {
    return getProducts(collection, limit, filter);
  };

  const product = ref<ProductDetailsType>();

  const getOneProduct = (
    collection: CollectionType,
    id: number,
  ): Promise<ProductDetailsType> => {
    return getProduct(collection, id);
  };

  return {
    products,
    getAllProducts,
    product,
    getOneProduct,
  };
});
