<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import { useWatchFilterQuery } from "../../useWatchFilterQuery";
import type { ApiFilterType } from "~/src/pages/category/model/types";

const { values, queryString } = defineProps<ApiFilterType>();
const buttons = ref<boolean[]>([]);

useWatchFilterQuery(buttons, values, queryString);
</script>

<template>
  <section class="buttons-filter">
    <Button
      v-for="(button, index) in values"
      :key="button.id"
      variant="fill"
      size="normal"
      class="buttons-filter__button"
      :class="{ 'buttons-filter__button-active': buttons[index] }"
      @click="buttons[index] = !buttons[index]"
    >
      {{ button.text }}
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
