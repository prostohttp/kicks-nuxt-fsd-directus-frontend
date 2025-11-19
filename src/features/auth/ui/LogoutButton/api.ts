export const logOutUser = () => {
  try {
    return useNuxtApp().$api.logOutUser();
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
