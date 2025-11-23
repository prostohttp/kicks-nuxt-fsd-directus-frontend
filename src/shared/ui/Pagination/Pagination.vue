<script setup lang="ts">
import { IconChevronRight } from "../icons";

const { pagesCount } = defineProps<{ pagesCount: number }>();
const currentPage = defineModel<number>({ required: true });
</script>

<template>
  <section class="pagination">
    <button
      class="pagination__page"
      @click="currentPage > 1 ? currentPage-- : null"
    >
      <IconChevronRight style="rotate: 180deg" />
      <span class="pagination__page-prev">PREVIOUS</span>
    </button>
    <button
      v-for="page in pagesCount"
      :key="page"
      class="pagination__page"
      :class="{ 'pagination__page-active': page === currentPage }"
      @click="currentPage !== page ? (currentPage = page) : null"
    >
      {{ page }}
    </button>
    <button
      class="pagination__page"
      @click="currentPage < pagesCount ? currentPage++ : null"
    >
      <span class="pagination__page-next">NEXT</span>
      <IconChevronRight />
    </button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
