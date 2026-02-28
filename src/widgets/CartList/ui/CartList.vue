<script setup lang="ts">
import { useCartStore } from "~/src/entities/Cart";
import { CompactProductCard } from "~/src/entities/Product";
import { useActionsCartStore } from "~/src/features/cart";
import { SmallHeading } from "~/src/shared/ui/heading";
import { ErrorMessage } from "~/src/shared/ui/message";

defineOptions({ inheritAttrs: false });

const cartStore = useCartStore();

const { cart } = storeToRefs(cartStore);

const actionCartStore = useActionsCartStore();

const activeProductUpdatedId = ref();

const {
  mutate: updateCart,
  error,
  asyncStatus,
} = useMutation({
  mutation: async (id?: string) => {
    activeProductUpdatedId.value = id;
    await actionCartStore.saveCart();
  },
});

const deleteItem = async (id: string) => {
  if (cart.value?.product) {
    cart.value.product = cart.value.product.filter((el) => el.id !== id);
  }
  await actionCartStore.saveCart();
};
</script>

<template>
  <section v-if="cart" class="app-cart" v-bind="$attrs">
    <SmallHeading heading="Your Bag" class="app-cart__heading">
      Items in your bag not reserved- check out now to make them yours.
    </SmallHeading>
    <CompactProductCard
      v-for="product in cart.product"
      :id="product.id"
      :key="product.id"
      v-model.number="product.count"
      :image="product.product.image"
      :price="product.product.price"
      :title="product.product.title"
      :slug="product.product.slug"
      :option-values="product.options.map((el) => ({ ...el.option_values_id }))"
      :is-updated="
        asyncStatus === 'loading' && activeProductUpdatedId === product.id
      "
      type="counter"
      :is-deletable="true"
      class="app-cart__item"
      @update-cart="updateCart(product.id)"
      @delete-item="deleteItem"
    />
    <ErrorMessage v-if="error" :is-closable="false">
      Something went wrong — your cart wasn’t updated. <br />Please try again
      later or contact us, and we’ll be happy to help!
    </ErrorMessage>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
