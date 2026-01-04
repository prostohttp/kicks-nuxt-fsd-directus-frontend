<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";

const isOpen = defineModel<boolean>({ required: true });

const { isValid } = defineProps<{
  isValid: boolean;
}>();

const addToCart = () => {
  if (isValid) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <Button variant="fill" size="large" @click="addToCart"> Add to cart </Button>
</template>
