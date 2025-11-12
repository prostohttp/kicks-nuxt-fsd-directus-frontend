<script setup lang="ts">
import { getSlider } from "~/src/shared/api";
import { Slider, type SliderType } from "~/src/shared/ui/Slider";

const { itemId } = defineProps<{ itemId: string }>();
const { data: slider, isLoading } = useQuery({
  key: ["home-hero-slider"],
  query: async () => (await getSlider(itemId)) as SliderType,
});
</script>

<template>
  <Slider v-if="slider" :slider :is-loading />
</template>
