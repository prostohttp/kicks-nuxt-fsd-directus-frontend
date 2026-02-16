<script setup lang="ts">
const count = defineModel<number>({ required: true });
</script>

<template>
  <section class="cart-count">
    <div class="cart-count__increase" @click="count > 1 && count--"></div>
    <div class="cart-count__value">{{ count }}</div>
    <div class="cart-count__decrease" @click="count++"></div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
