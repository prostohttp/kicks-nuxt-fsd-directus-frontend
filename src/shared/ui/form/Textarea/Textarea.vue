<script setup lang="ts">
import type { TextareaType } from "./types";
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
  required,
} = defineProps<TextareaType>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <div
    :class="[
      'textarea',
      { 'textarea-disabled': disabled, 'textarea-light': theme === 'light' },
    ]"
  >
    <label v-if="label" :for="name" class="textarea-label">
      <span v-if="required" class="textarea-label__required">*</span>
      {{ label }}
    </label>
    <span
      :class="['textarea-field', { 'textarea-field-error': !!error }]"
      v-bind="$attrs"
    >
      <textarea
        :id="name"
        v-model="model"
        :name="name"
        :placeholder
        autocomplete="off"
        :disabled
      />
      <IconFieldError v-if="error" class="textarea-field-icon" />
    </span>
    <span v-if="error" class="textarea-message-error">
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
