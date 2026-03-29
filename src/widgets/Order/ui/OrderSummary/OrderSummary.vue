<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { useCartStore } from "~/src/entities/Cart";
import {
  LOCAL_CART_ORDER,
  useOrderStore,
  type OrderType,
} from "~/src/entities/Order";
import { useFeatureOrderStore } from "~/src/features/order";
import { SmallHeading } from "~/src/shared/ui/heading";
import { formatUSD } from "~/src/shared/lib";

const orderStore = useOrderStore();

const featureOrderStore = useFeatureOrderStore();

const { order } = storeToRefs(orderStore);

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const items = computed(() => cart.value?.product.length);
const price = computed(() =>
  cart.value?.product.reduce(
    (prev, current) => prev + current.count * current.product.price,
    0,
  ),
);

const total = computed(() =>
  price.value && order.value
    ? price.value + order.value.delivery.price
    : price.value,
);

watch(
  cart,
  (newCart) => {
    const localOrder = localStorage.getItem(LOCAL_CART_ORDER);
    let newOrder;
    if (localOrder) {
      newOrder = JSON.parse(localOrder) as OrderType;
    }

    featureOrderStore.createOrder({
      user_created: newCart?.user_created,
      items: items.value,
      price: price.value,
      delivery: newOrder?.delivery || {
        id: "",
        title: "",
        price: 0,
      },
      payment: newOrder?.payment || {
        id: "",
        title: "",
      },
      total: newOrder?.total || total.value,
      email: newOrder?.email,
      status: "created",
    });

    localStorage.removeItem(LOCAL_CART_ORDER);
    useStorage(LOCAL_CART_ORDER, order);
  },
  { immediate: true, once: true },
);

watch(
  cart,
  () => {
    if (order.value) {
      featureOrderStore.createOrder({
        ...order.value,
        items: items.value,
        price: price.value,
        total: total.value,
      });

      localStorage.removeItem(LOCAL_CART_ORDER);
      useStorage(LOCAL_CART_ORDER, order);
    }
  },
  { deep: true },
);
</script>

<template>
  <section class="order-summary">
    <SmallHeading heading="Order Summary" />
    <div class="order-summary__info">
      <div class="order-summary__info__item">
        <span>{{ order?.items }} ITEMS</span>
        <span>{{ formatUSD(order?.price) }}</span>
      </div>
      <div class="order-summary__info__item">
        <span>Delivery</span>
        <span>{{ formatUSD(order?.delivery?.price) || "-" }}</span>
      </div>
      <div class="order-summary__info__item">
        <span>Payment</span>
        <span>{{ order?.payment?.title || "-" }}</span>
      </div>
      <div class="order-summary__info__item order-summary__info__item--last">
        <span>Total</span>
        <span>{{ formatUSD(order?.total) }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
