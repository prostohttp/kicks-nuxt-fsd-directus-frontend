<script setup lang="ts">
import { IconCheck } from "../../icons";

const { name, label, modelValue } = defineProps<{
  name: string;
  label: string;
  modelValue: boolean | undefined;
}>();

const emit = defineEmits<{
  change: []
}>()
</script>

<template>
  <label class="checkbox">
    <span class="checkbox__field" :class="{ 'checkbox__field-active': modelValue }">
      <IconCheck v-show="modelValue" />
    </span>
    <span class="checkbox__label">{{ label }}</span>
    <input :model-value :name="name" type="checkbox" @change="emit('change')" />
  </label>
</template>

<style lang="scss">
@use "styles";
</style>
