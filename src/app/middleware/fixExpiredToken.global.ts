export default defineNuxtRouteMiddleware(async () => {
  const { fetchUser, logout } = useDirectusAuth();
  const user = useDirectusUser();

  if (user.value) return;

  try {
    await fetchUser();
  } catch (e) {
    const _error = e as Error;
    await logout().catch(() => {});
  }
});
