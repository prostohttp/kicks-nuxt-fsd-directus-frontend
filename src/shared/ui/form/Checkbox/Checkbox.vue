<script setup lang="ts">
import { IconCheck } from "../../icons";

const model = defineModel<boolean>();
const { name, label } = defineProps<{
  name: string;
  label: string;
}>();
</script>

<template>
  <label class="checkbox">
    <span class="checkbox__field" :class="{ 'checkbox__field-active': model }">
      <IconCheck v-show="model" />
    </span>
    <span class="checkbox__label">{{ label }}</span>
    <input v-model="model" :name="name" type="checkbox" />
  </label>
</template>

<style lang="scss">
@use "styles";
</style>
