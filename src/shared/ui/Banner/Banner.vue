<script setup lang="ts">
import type { BannerType } from "./types";

const banner = defineProps<BannerType>();

const smallTitleRef = useTemplateRef("small-title");
const titleRef = useTemplateRef("title");
const descriptionRef = useTemplateRef("description");
onMounted(() => {
  if (smallTitleRef.value && titleRef.value && descriptionRef.value) {
    useGSAP()
      .fromTo(
        smallTitleRef.value,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
        },
      )
      .duration(0.4);
    useGSAP()
      .fromTo(titleRef.value, { x: -100, opacity: 0 }, { x: 0, opacity: 1 })
      .delay(0.6)
      .duration(0.3);
    useGSAP()
      .fromTo(
        descriptionRef.value,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1 },
      )
      .delay(0.3)
      .duration(0.6);
  }
});
</script>

<template>
  <section class="banner">
    <NuxtImg
      provider="directus"
      class="banner__image"
      alt="heading"
      :src="banner.image"
      format="webp"
      fit="cover"
    />
    <div class="banner__info">
      <h3
        v-if="banner.small_heading"
        ref="small-title"
        class="banner__info__small-title"
      >
        {{ banner.small_heading }}
      </h3>
      <h2 v-if="banner.heading" ref="title" class="banner__info__title">
        {{ banner.heading }}
      </h2>
      <p
        v-if="banner.description"
        ref="description"
        class="banner__info__description"
      >
        {{ banner.description }}
      </p>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
