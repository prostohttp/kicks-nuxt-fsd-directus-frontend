import type { DirectusItems } from "nuxt-directus";
import { CollectionType, type ApiFilterType } from "~/src/shared/api";
import type { ProductCardType, ProductDetailsType } from "../types";
import {
  getProductApi,
  getProductsApi,
  getProductRatingApi,
  getProductReviewsCountApi,
  getProductOptionsApi,
} from "../../api";
import type { ApiProductsCount } from "../../api/types";

export const useProductStore = defineStore("products", () => {
  const products = ref<DirectusItems<ProductCardType>>();

  const getProducts = (
    collection: CollectionType,
    meta: ApiProductsCount,
    limit?: number,
    filter?: ApiFilterType,
    page?: number,
    sort?: string,
  ) => {
    return getProductsApi(collection, meta, limit, filter, page, sort);
  };
  const setProducts = (data: DirectusItems<ProductCardType>) => {
    products.value = data;
  };

  const product = ref<ProductDetailsType>();

  const saveProduct = (item: ProductDetailsType) => {
    product.value = item;
  };

  const getProduct = async (
    slug: string | null,
  ): Promise<ProductDetailsType | undefined> => {
    const products = await getProductApi(CollectionType.PRODUCTS, slug);
    return products[0];
  };

  const getProductReviewsInfo = async (id: number) => {
    const rating = (await getProductRatingApi(id)).data[0]?.avg.rating;
    const count = (await getProductReviewsCountApi(id)).data[0]?.count.rating;
    return { rating, count };
  };

  const getProductOptions = async (optionIds: string[]) => {
    return await getProductOptionsApi(optionIds);
  };

  return {
    products,
    getProducts,
    setProducts,
    product,
    saveProduct,
    getProduct,
    getProductReviewsInfo,
    getProductOptions,
  };
});
