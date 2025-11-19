export const loginUser = (email: string, password: string) => {
  try {
    return useNuxtApp().$api.loginUser({ email, password });
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
