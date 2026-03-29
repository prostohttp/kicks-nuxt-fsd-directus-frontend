<script setup lang="ts">
import { SwitchBlock } from "~/src/shared/ui/SwitchBlock";
import { formatUSD } from "~/src/shared/lib";
import type { ShippingApiType } from "../../api/types";

const { data } = defineProps<{
  data: ShippingApiType[];
}>();

const shipping = defineModel<ShippingApiType>({ required: true });

const shippingPrice = (value?: number) =>
  value === 0 ? "free" : formatUSD(value);

const setDelivery = (val: ShippingApiType) => (shipping.value = { ...val });
</script>

<template>
  <section class="shipping-list">
    <SwitchBlock
      v-for="val in data"
      :id="val.id"
      :key="val.id"
      :active-id="shipping.id"
      :title="val.title"
      :description="val.description"
      :value="shippingPrice(val.price)"
      @click="setDelivery(val)"
    />
  </section>
</template>
