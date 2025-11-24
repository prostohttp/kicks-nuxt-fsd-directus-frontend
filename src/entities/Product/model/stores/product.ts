import type { CollectionType } from "~/src/shared/api";
import type { ProductCardType, ProductDetailsType } from "../types";
import { getProduct, getProducts } from "../../api";
import type { ApiProductsCount } from "../../api/types";

export const useProductStore = defineStore("products", () => {
  const products = ref<ProductCardType[]>([]);
  const getAllProducts = (
    collection: CollectionType,
    meta: ApiProductsCount,
    limit?: number,
    filter?: Record<string, unknown>,
    page?: number,
    sort?: string,
  ) => {
    return getProducts(collection, meta, limit, filter, page, sort);
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
