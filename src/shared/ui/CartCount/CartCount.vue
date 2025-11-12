<script setup lang="ts">
import { ROUTES } from '../../routes';


</script>

<template>
    <div class="mini-cart">
        <NuxtLink :to="ROUTES.cart" class="mini-cart__count">0</NuxtLink>
    </div>
</template>

<style lang="scss">
@use "styles";
</style>
