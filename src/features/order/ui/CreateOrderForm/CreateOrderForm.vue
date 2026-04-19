<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { LOCAL_CART_ORDER, useOrderStore } from "~/src/entities/Order";
import { Button, Checkbox, Input, Textarea } from "~/src/shared/ui/form";
import { SmallHeading } from "~/src/shared/ui/heading";
import { Order, type OrderSchemaType } from "../../model/orderSchema";
import { getShippingApi, ShippingList } from "~/src/entities/Shipping";
import { getPaymentApi, PaymentList } from "~/src/entities/Payment";
import { Placeholder } from "~/src/shared/ui/Placeholder";
import { useFeatureOrderStore } from "../../model/stores/order";
import {
  ErrorMessage,
  SuccessWithCallbackMessage,
} from "~/src/shared/ui/message";
import { ROUTES } from "~/src/shared/routes";
import { useCartStore } from "~/src/entities/Cart";

// TODO: import from cart feature to order feature
import { useActionsCartStore } from "~/src/features/cart";
import { AccountTabs } from "~/src/entities/Account";

const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

const actionOrderStore = useFeatureOrderStore();
const { order: orderApi } = storeToRefs(actionOrderStore);

const errors = reactive({
  email: {
    title: "Email",
    value: "",
  },
  first_name: {
    title: "First name",
    value: "",
  },
  last_name: {
    title: "Lat name",
    value: "",
  },
  delivery: {
    title: "Shipping method",
    value: "",
  },
  payment: {
    title: "Payment method",
    value: "",
  },
  address: {
    title: "Address",
    value: "",
  },
});

const isErrors = computed(() => Object.values(errors).some((err) => err.value));

const { data: shipping, isLoading: isShippingLoading } = useQuery({
  key: () => ["shipping"],
  query: async () => await getShippingApi(),
});

const { data: payment, isLoading: isPaymentLoading } = useQuery({
  key: () => ["payment"],
  query: async () => await getPaymentApi(),
});

const clearErrors = () => {
  errors.email.value = "";
  errors.first_name.value = "";
  errors.last_name.value = "";
  errors.delivery.value = "";
  errors.payment.value = "";
  errors.address.value = "";
};

watch(
  () => order.value?.delivery.price,
  (newPrice) => {
    if (newPrice !== undefined) {
      if (order.value) {
        order.value.total = newPrice + Number(order.value.price);

        localStorage.removeItem(LOCAL_CART_ORDER);
        useStorage(LOCAL_CART_ORDER, order.value);
      }
    }
  },
);

const isCreatedOrder = ref(false);

const actionCartStore = useActionsCartStore();

const {
  mutate: createOrder,
  error,
  reset,
  asyncStatus,
} = useMutation({
  mutation: async (data: OrderSchemaType) => {
    const result = Order.safeParse(data);
    clearErrors();
    if (!result.success) {
      result.error.issues.forEach((error) => {
        const key = error.path[0];
        if (key && key in errors) {
          if (key === "email") errors.email.value = error.message;
          if (key === "first_name") errors.first_name.value = error.message;
          if (key === "last_name") errors.last_name.value = error.message;
          if (key === "delivery") errors.delivery.value = error.message;
          if (key === "payment") errors.payment.value = error.message;
          if (key === "address") errors.address.value = error.message;
        }
      });
    } else {
      await actionOrderStore.saveOrder(data);
      clearErrors();
      isCreatedOrder.value = true;
    }
  },
});

const isAgree = ref(true);

const isDisabled = computed(
  () =>
    asyncStatus.value === "loading" || !isAgree.value || isCreatedOrder.value,
);

const redirectToAccount = () => {
  setTimeout(() => {
    actionOrderStore.clearOrder();
    actionCartStore.clearCart();
    navigateTo({
      path: ROUTES.account,
      query: {
        tab: AccountTabs.orders,
      },
    });
  }, 3000);
};

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

watch(
  order,
  (newOrder) => {
    if (newOrder) {
      orderApi.value.user_created = newOrder.user_created || "";
      orderApi.value.cart = cart.value?.id || "";
      orderApi.value.delivery = newOrder.delivery.id;
      orderApi.value.payment = newOrder.payment.id;
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <section v-if="order" class="create-order-form">
    <SmallHeading heading="Contact Details" class="create-order-form__heading">
      We will use these details to keep you inform about your delivery.
    </SmallHeading>
    <form @submit.prevent="createOrder(orderApi)">
      <div class="row">
        <Input
          v-model="orderApi.email"
          name="email"
          placeholder="* Email"
          :error="errors.email.value"
        />
        <Input
          v-model="orderApi.phone"
          name="phone"
          info="E.g. (123) 456-7890"
          placeholder="Phone Number"
        />
      </div>
      <SmallHeading
        heading="Shipping Address"
        class="create-order-form__heading"
      />
      <div class="row">
        <Input
          v-model="orderApi.first_name"
          name="firstName"
          placeholder="* First Name"
          :error="errors.first_name.value"
        />
        <Input
          v-model="orderApi.last_name"
          name="lastName"
          placeholder="* Last Name"
          :error="errors.last_name.value"
        />
      </div>
      <Textarea
        v-model="orderApi.address"
        name="address"
        info="Enter your full address (street, city, ZIP code)"
        placeholder="* Delivery Address"
        class="create-order-form__textarea"
        :error="errors.address.value"
      />
      <SmallHeading
        heading="Delivery Options"
        class="create-order-form__heading"
      />
      <Placeholder v-if="isShippingLoading" h="90" />
      <ShippingList
        v-else-if="!isShippingLoading && shipping"
        v-model="order.delivery"
        :data="shipping"
      />
      <SmallHeading
        heading="Payment Options"
        class="create-order-form__heading"
      />
      <Placeholder v-if="isPaymentLoading" h="90" />
      <PaymentList
        v-else-if="!isPaymentLoading && payment"
        v-model="order.payment"
        :data="payment"
      />
      <Checkbox
        v-model="isAgree"
        name="agree"
        label="By submitting this form, you agree to the processing of your personal data."
        class="create-order-form__checkbox"
        @change="isAgree = !isAgree"
      />
      <div class="row">
        <Button
          type="submit"
          variant="fill"
          size="large"
          :disabled="isDisabled"
        >
          <template #default>Review AND PAY</template>
        </Button>
      </div>
      <div v-if="isErrors">
        <ErrorMessage :is-closable="false">
          <template v-for="err in errors" :key="err.title">
            <div v-if="err.value" class="errors">
              <span class="errors__title">{{ err.title }}: </span>
              <span class="errors__value">{{ err.value }}</span>
            </div>
          </template>
        </ErrorMessage>
      </div>
    </form>
    <ErrorMessage v-if="error" style="margin-top: 15px" @close="reset">
      An unexpected error occurred while processing your order. Please try again
      later.
    </ErrorMessage>
    <SuccessWithCallbackMessage
      v-if="isCreatedOrder"
      @callback="redirectToAccount"
    >
      Your order has been placed successfully. You’ll be redirected to your
      account to view it in your Orders.
    </SuccessWithCallbackMessage>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
