<script setup lang="ts">
import { IconCheck } from "../../icons";

const {
  name,
  label,
  modelValue,
  disabled = false,
} = defineProps<{
  name: string;
  label: string;
  modelValue: boolean | undefined;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  change: [];
}>();
</script>

<template>
  <label
    class="checkbox"
    :class="{
      'checkbox--disabled': disabled,
    }"
  >
    <span
      class="checkbox__field"
      :class="{
        'checkbox__field-active': modelValue,
      }"
    >
      <IconCheck v-show="modelValue" />
    </span>
    <span class="checkbox__label">{{ label }}</span>
    <input
      :model-value
      :name="name"
      type="checkbox"
      :disabled="disabled"
      @change="emit('change')"
    />
  </label>
</template>

<style lang="scss">
@use "styles";
</style>
