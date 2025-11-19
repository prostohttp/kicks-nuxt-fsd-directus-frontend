import { ROUTES } from "~/src/shared/routes";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { fetchUser, setUser } = useDirectusAuth();
  const user = useDirectusUser();
  if (!user.value) {
    const user = await fetchUser();
    setUser(user.value);
  }
  if (!user.value) {
    return navigateTo(ROUTES.auth);
  }
});
