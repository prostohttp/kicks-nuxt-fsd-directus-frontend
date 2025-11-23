import type {
  DirectusAuthCredentials,
  DirectusItems,
  DirectusMetaQueryParams,
  DirectusQueryParams,
  DirectusRegisterCredentials,
} from "nuxt-directus";
import type { CollectionType } from "~/src/shared/api";

export default defineNuxtPlugin(() => {
  const { getItemById, getSingletonItem, createItems, getItems } =
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
    getAll,
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
