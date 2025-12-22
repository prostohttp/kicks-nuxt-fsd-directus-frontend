import type {
  DirectusAuthCredentials,
  DirectusItems,
  DirectusMetaQueryParams,
  DirectusQueryParams,
  DirectusRegisterCredentials,
} from "nuxt-directus";
import type { CollectionType } from "~/src/shared/api";

export default defineNuxtPlugin(() => {
  const { getItemById, getSingletonItem, createItems, updateItem, getItems } =
    useDirectusItems();
  const { login, logout, createUser } = useDirectusAuth();

  const getAll = <T>(
    collection: CollectionType,
    params?: DirectusMetaQueryParams,
  ): Promise<DirectusItems<T>> => {
    return getItems<T>({
      collection,
      params,
    }) as unknown as Promise<DirectusItems<T>>;
  };

  const getAllRaw = <T>(
    collection: CollectionType,
    params?: DirectusQueryParams,
  ): Promise<T[]> => {
    return getItems<T>({
      collection,
      params,
    });
  };

  const getAllBySlug = <T>(
    collection: CollectionType,
    params?: DirectusQueryParams,
  ): Promise<T[]> => {
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

  const update = <T extends object>(
    collection: CollectionType,
    id: string,
    item: T,
    params?: DirectusQueryParams,
  ) => {
    return updateItem<T>({ collection, id, item, params });
  };

  const loginUser = ({ email, password }: DirectusAuthCredentials) => {
    return login({ email, password });
  };

  const logOutUser = () => {
    return logout();
  };

  const registerUser = ({ email, password }: DirectusRegisterCredentials) => {
    return createUser({ email, password });
  };

  const api = {
    getById,
    getSingleton,
    create,
    update,
    getAll,
    getAllRaw,
    getAllBySlug,
    loginUser,
    logOutUser,
    registerUser,
  };

  return {
    provide: {
      api,
    },
  };
});
