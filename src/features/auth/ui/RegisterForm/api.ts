export const registerUser = (email: string, password: string) => {
  try {
    return useNuxtApp().$api.registerUser({ email, password });
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
