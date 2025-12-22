import type { DirectusItems } from "nuxt-directus";
import type { ApiFilterType, CollectionType } from "~/src/shared/api";
import type { ProductCardType, ProductDetailsType } from "../types";
import {
  getProduct,
  getProducts,
  getProductRating as getRating,
  getProductReviewsCount as getReviewsCount,
} from "../../api";
import type { ApiProductsCount } from "../../api/types";

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

  const saveProduct = (item: ProductDetailsType) => {
    product.value = item;
  };

  const getOneProduct = async (
    collection: CollectionType,
    slug: string | null,
  ): Promise<ProductDetailsType | undefined> => {
    const products = await getProduct(collection, slug);
    if (products[0]) {
      saveProduct(products[0]);
      return products[0];
    }
  };

  const getProductReviewsInfo = async (id: number) => {
    const rating = (await getRating(id)).data[0]?.avg.rating;
    const count = (await getReviewsCount(id)).data[0]?.count.rating;
    return { rating, count };
  };

  return {
    products,
    getAllProducts,
    setProducts,
    product,
    saveProduct,
    getOneProduct,
    getProductReviewsInfo,
  };
});
