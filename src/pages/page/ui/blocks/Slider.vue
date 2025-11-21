<script setup lang="ts">
import { getSlider } from "~/src/shared/api";
import { Slider } from "~/src/shared/ui/Slider";

const { itemId } = defineProps<{ itemId: string }>();
const { data: slider, isLoading } = useQuery({
  key: () => ["slider", itemId],
  query: async () => await getSlider(itemId),
});
</script>

<template>
  <Slider v-if="slider" :slider :is-loading />
</template>
