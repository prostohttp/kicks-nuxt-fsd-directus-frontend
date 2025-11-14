<script setup lang="ts">
import { getBlockCategories } from "~/src/shared/api";
import { Categories } from "~/src/widgets/Categories";

const { itemId } = defineProps<{ itemId: string }>();
const { data } = useQuery({
  key: ["home-categories-carousel-block"],
  query: async () => await getBlockCategories(itemId),
});
</script>

<template>
  <Categories v-if="data" :settings="data" />
</template>
