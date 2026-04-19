import {
  LOCAL_CART_ORDER,
  useOrderStore,
  type OrderType,
} from "~/src/entities/Order";
import { createFastOrderApi, createOrderApi } from "../../api";
import type { FastOrderSchemaType } from "../fastOrderSchema";
import type { OrderSchemaType } from "../orderSchema";
import { useAppUser } from "~/src/entities/User";

export const useFeatureOrderStore = defineStore("order-feature", () => {
  const user = useAppUser();
  const fastOrder = ref<FastOrderSchemaType>({
    name: user.value?.first_name || "",
    email: user.value?.email || "",
    comment: "",
    status: "inProgress",
    product: undefined,
    product_count: 1,
    options: [],
  });

  const order = ref<OrderSchemaType>({
    user_created: "",
    cart: "",
    first_name: user.value?.first_name || "",
    last_name: user.value?.last_name || "",
    email: user.value?.email || "",
    address: user.value?.address || "",
    payment: "",
    delivery: "",
    status: "created",
  });

  const orderStore = useOrderStore();

  const saveFastOrder = async (order: FastOrderSchemaType) => {
    try {
      return await createFastOrderApi(order);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw createError({
        message:
          "Invalid response from server, please send this information to us",
      });
    }
  };

  const createOrder = async (createOrder?: OrderType) => {
    orderStore.order = createOrder;
  };

  const saveOrder = async (order: OrderSchemaType) => {
    try {
      await createOrderApi(order);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw createError({
        message:
          "Invalid response from server, please send this information to us",
      });
    }
  };

  const clearOrder = () => {
    order.value = {
      user_created: "",
      cart: "",
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      payment: "",
      delivery: "",
      status: "created",
    };
    localStorage.removeItem(LOCAL_CART_ORDER);
  };

  return {
    fastOrder,
    saveFastOrder,
    order,
    createOrder,
    saveOrder,
    clearOrder,
  };
});
