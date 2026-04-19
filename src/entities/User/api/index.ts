import { CollectionType, type UserTypeApi } from "~/src/shared/api";

export const getUserInfo = (userId: string) => {
  try {
    return useNuxtApp().$api.getById<UserTypeApi>(CollectionType.USERS, userId);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
