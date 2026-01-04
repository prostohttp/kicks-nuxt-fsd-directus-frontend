<script setup lang="ts">
const { avatar } = defineProps<{ avatar: string }>();
</script>

<template>
  <section class="user-avatar">
    <NuxtImg
      v-if="avatar"
      provider="directus"
      loading="lazy"
      format="webp"
      :src="avatar"
    />
    <NuxtImg
      v-else
      class="review-card__header__avatar--default"
      src="avatar.svg"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
