<script setup lang="ts">
import { SwitchBlock } from "~/src/shared/ui/SwitchBlock";
import type { PaymentApiType } from "../../api/types";

const { data } = defineProps<{
  data: PaymentApiType[];
}>();

const payment = defineModel<PaymentApiType>({ required: true });

const setPayment = (val: PaymentApiType) => (payment.value = { ...val });
</script>

<template>
  <section class="payment-list">
    <SwitchBlock
      v-for="val in data"
      :id="val.id"
      :key="val.id"
      :active-id="payment.id"
      :title="val.title"
      :description="val.description"
      @click="setPayment(val)"
    />
  </section>
</template>
