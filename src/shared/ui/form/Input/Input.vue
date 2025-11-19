<script setup lang="ts">
import type { InputType } from "./types";
import { IconFieldError } from "~/src/shared/ui/icons";

defineOptions({
  inheritAttrs: false,
});
const {
  name,
  placeholder,
  label,
  error,
  disabled = false,
  theme = "dark",
  type = "text",
} = defineProps<InputType>();
const model = defineModel<string>();
</script>

<template>
  <div
    :class="[
      'input',
      { 'input-disabled': disabled, 'input-light': theme === 'light' },
    ]"
  >
    <label v-if="label" :for="name" class="input-label">
      {{ label }}
    </label>
    <span
      :class="['input-field', { 'input-field-error': error }]"
      v-bind="$attrs"
    >
      <input
        :id="name"
        v-model="model"
        :name="name"
        :type
        :placeholder
        autocomplete="off"
        :disabled
      />
      <IconFieldError v-if="error" class="input-field-icon" />
    </span>
    <span v-if="error" class="input-message-error">
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
