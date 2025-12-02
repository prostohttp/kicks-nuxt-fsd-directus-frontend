<script setup lang="ts">
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";
import { Button } from "~/src/shared/ui/form";

const { values, queryString } = defineProps<ApiFilterType>();
const buttons = ref<boolean[]>([]);

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
