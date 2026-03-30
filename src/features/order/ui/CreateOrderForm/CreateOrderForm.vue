<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { LOCAL_CART_ORDER, useOrderStore } from "~/src/entities/Order";
import { Button, Checkbox, Input, Textarea } from "~/src/shared/ui/form";
import { SmallHeading } from "~/src/shared/ui/heading";
import type { OrderSchemaType } from "../../model/OrderSchema";
import { getShippingApi, ShippingList } from "~/src/entities/Shipping";
import { getPaymentApi, PaymentList } from "~/src/entities/Payment";
import { Placeholder } from "~/src/shared/ui/Placeholder";

const useOrder = useOrderStore();
const { order } = storeToRefs(useOrder);

const errors = ref<Partial<OrderSchemaType>>({});

const isAgree = ref(true);

const isLoading = computed(() => !isAgree.value);

const { data: shipping, isLoading: isShippingLoading } = useQuery({
  key: () => ["shipping"],
  query: async () => await getShippingApi(),
});

const { data: payment, isLoading: isPaymentLoading } = useQuery({
  key: () => ["payment"],
  query: async () => await getPaymentApi(),
});

// const clearErrors = () => {};

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
</script>

<template>
  <section v-if="order" class="create-order-form">
    <SmallHeading heading="Contact Details" class="create-order-form__heading">
      We will use these details to keep you inform about your delivery.
    </SmallHeading>
    <form>
      <div class="row">
        <Input
          v-model="order.email"
          name="email"
          placeholder="* Email"
          :error="errors.email"
        />
        <Input
          v-model="order.phone"
          name="phone"
          info="E.g. (123) 456-7890"
          placeholder="Phone Number"
          :error="errors.phone"
        />
      </div>
      <SmallHeading
        heading="Shipping Address"
        class="create-order-form__heading"
      />
      <div class="row">
        <Input
          v-model="order.first_name"
          name="firstName"
          placeholder="* First Name"
          :error="errors.first_name"
        />
        <Input
          v-model="order.last_name"
          name="lastName"
          placeholder="* Last Name"
          :error="errors.last_name"
        />
      </div>
      <Textarea
        v-model="order.address"
        name="address"
        info="Enter your full address (street, city, ZIP code)"
        placeholder="Delivery Address"
        class="create-order-form__textarea"
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
        <Button type="submit" variant="fill" size="large" :disabled="isLoading">
          <template #default>Review AND PAY</template>
        </Button>
      </div>
    </form>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
