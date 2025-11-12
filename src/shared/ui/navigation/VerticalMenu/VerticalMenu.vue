<script setup lang="ts">
import LinkVariant from "../components/LinkVariant.vue";
import type { Navigation as PropTypes } from "../types";

const menu = defineProps<PropTypes>();
</script>

<template>
  <nav class="vertical-navigation">
    <h4>{{ menu.title }}</h4>
    <ul class="vertical-menu">
      <li
        v-for="({ navigation_items_id: item }, index) in menu.items"
        :key="index"
        class="vertical-menu__item"
      >
        <LinkVariant v-bind="item" class="vertical-menu__item__link" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use "styles";
</style>
