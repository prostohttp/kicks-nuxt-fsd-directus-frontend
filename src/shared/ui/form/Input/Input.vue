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
  success,
  error,
  disabled = false,
  theme = "dark",
  required = false,
} = defineProps<InputType>();
const model = defineModel<string>();
const indicator = computed(() =>
  error ? "error" : success ? "success" : undefined,
);
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
    <span :class="['input-field']" v-bind="$attrs">
      <input
        :id="name"
        v-model="model"
        :name="name"
        type="text"
        :placeholder
        autocomplete="off"
        :disabled
        :required
      />
      <IconFieldError v-if="indicator" :indicator class="input-field-icon" />
    </span>
    <span v-if="indicator" :class="'input-message-' + indicator">
      {{ error || success }}
    </span>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
