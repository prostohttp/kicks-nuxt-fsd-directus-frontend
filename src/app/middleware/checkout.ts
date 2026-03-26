import { useOrderStore } from "~/src/entities/Order";
import { ROUTES } from "~/src/shared/routes";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const orderStore = useOrderStore();

  if (!orderStore.order) {
    return navigateTo(ROUTES.cart);
  }
});
