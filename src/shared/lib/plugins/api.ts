import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType } from "~/src/shared/api";

export default defineNuxtPlugin(() => {
  const { getItemById, getSingletonItem, createItems, getItems } =
    useDirectusItems();

  const getAll = <T>(
    collection: CollectionType,
    params?: DirectusQueryParams,
  ) => {
    return getItems<T>({
      collection,
      params,
    });
  };

  const getById = <T>(
    collection: CollectionType,
    id: string,
    params?: DirectusQueryParams,
  ) => {
    return getItemById<T>({
      collection: collection,
      id,
      params,
    });
  };

  const getSingleton = <T>(
    collection: CollectionType,
    params: DirectusQueryParams,
  ) => {
    return getSingletonItem<T>({
      collection,
      params,
    });
  };

  const create = <T>(collection: CollectionType, items: T[]) => {
    return createItems<T>({ collection, items });
  };

  const api = {
    getById,
    getSingleton,
    create,
    getAll,
  };

  return {
    provide: {
      api,
    },
  };
});
