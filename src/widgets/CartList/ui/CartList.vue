<script setup lang="ts">
import { useCartStore } from "~/src/entities/Cart";
import { CompactProductCard } from "~/src/entities/Product";

defineOptions({ inheritAttrs: false });

const cartStore = useCartStore();

const { cart } = storeToRefs(cartStore);
</script>

<template>
  <section v-if="cart" class="app-cart" v-bind="$attrs">
    <CompactProductCard
      v-for="product in cart.product"
      :id="product.id"
      :key="product.id"
      v-model.number="product.count"
      :image="product.product.image"
      :price="product.product.price"
      :title="product.product.title"
      :slug="product.product.slug"
      type="counter"
      :option-values="product.options.map((el) => ({ ...el.option_values_id }))"
      class="app-cart__item"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
