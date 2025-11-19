<script setup lang="ts">
const emit = defineEmits<{
  callback: [];
}>();

onMounted(() => {
  emit("callback");
});
</script>

<template>
  <section class="success-and-redirect">
    <slot> Default message </slot>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
