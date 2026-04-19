<script setup lang="ts">
import { useUserOrders } from "../../model/stores/order";
import { OrderAccount } from "~/src/entities/Order";
import { useAppUser } from "~/src/entities/User";
import { Preloader } from "~/src/shared/ui/preloader";

const userOrderStore = useUserOrders();
const user = useAppUser();

const { data, isLoading } = useQuery({
  key: () => ["user-orders"],
  query: async () => userOrderStore.getUserOrders(user.value?.id),
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="order-account-list">
    <OrderAccount v-for="order in data" :key="order.id" :order="order" />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
