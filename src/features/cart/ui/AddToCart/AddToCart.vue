<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import { useActionsCartStore } from "../../model/stores/cart";
import type { CartProductType } from "~/src/entities/Cart";
import { IconCircleLoading } from "~/src/shared/ui/icons";

const { loading } = defineProps<{ loading: boolean }>();

const user = useDirectusUser();

const actionsCartStore = useActionsCartStore();

const addToCart = async (product: CartProductType) => {
  const userId = user.value?.id;

  await actionsCartStore.saveCart(
    {
      user_created: userId,
      ...product,
    },
    userId,
  );
};

defineExpose({
  addToCart,
});
</script>

<template>
  <Button variant="fill" size="large" :disabled="loading" class="add-to-cart">
    <template #default>Add to cart</template>
    <template #right-icon>
      <IconCircleLoading v-if="loading" />
    </template>
  </Button>
</template>
