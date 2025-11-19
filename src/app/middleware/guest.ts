import { ROUTES } from "~/src/shared/routes";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const user = useDirectusUser();
  if (user.value) {
    return navigateTo(ROUTES.account);
  }
});
