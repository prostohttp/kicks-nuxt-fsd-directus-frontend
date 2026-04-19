import { getUserOrdersApi } from "../../api";

export const useUserOrders = defineStore("user-orders", () => {
  const getUserOrders = async (user_created?: string) => {
    return user_created ? await getUserOrdersApi(user_created) : undefined;
  };

  return {
    getUserOrders,
  };
});
