import type { DirectusUser } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";

export const getUserInfo = (userId: string) => {
  try {
    return useNuxtApp().$api.getById<DirectusUser>(
      CollectionType.USERS,
      userId,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
