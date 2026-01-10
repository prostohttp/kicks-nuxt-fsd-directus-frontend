<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import { useActionsCartStore } from "../../model/stores/cart";
import type { CartProductType } from "~/src/entities/Cart";
import { IconCircleLoading } from "~/src/shared/ui/icons";

const { loading } = defineProps<{ loading: boolean }>();

const user = useDirectusUser();

const actionsCartStore = useActionsCartStore();

const saveCartToLocal = async () => {
  console.log("local storage");
};

const addToCart = async (products: CartProductType[]) => {
  if (user.value) {
    const userId = user.value.id;

    await actionsCartStore.saveCartToServer(
      user.value.id,
      products.map((item) => ({
        user_created: userId,
        ...item,
      })),
    );
  } else {
    await saveCartToLocal();
  }
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