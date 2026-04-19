<script setup lang="ts">
import type { TabHeaderSimpleType } from "../types";

const { header } = defineProps<{
  header: TabHeaderSimpleType[];
}>();

const active = defineModel<string>();

const changeTab = (tab: string) => {
  active.value = tab;
};
</script>

<template>
  <section class="tab-header">
    <div
      v-for="tab in header"
      :key="tab.id"
      class="tab-header__title"
      :class="{ 'tab-header__title--active': active === tab.name }"
      @click="changeTab(tab.name)"
    >
      {{ tab.title }}
    </div>
    <div class="tab-header__action">
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
