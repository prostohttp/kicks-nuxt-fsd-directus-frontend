import type { ApiFilterType, CollectionType } from "~/src/shared/api";
import type { ProductCardType, ProductDetailsType } from "../types";
import { getProduct, getProducts } from "../../api";
import type { ApiProductsCount } from "../../api/types";
import type { DirectusItems } from "nuxt-directus";

export const useProductStore = defineStore("products", () => {
  const products = ref<DirectusItems<ProductCardType>>();
  const getAllProducts = (
    collection: CollectionType,
    meta: ApiProductsCount,
    limit?: number,
    filter?: ApiFilterType,
    page?: number,
    sort?: string,
  ) => {
    return getProducts(collection, meta, limit, filter, page, sort);
  };
  const setProducts = (data: DirectusItems<ProductCardType>) => {
    products.value = data;
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
    setProducts,
    product,
    getOneProduct,
  };
});
