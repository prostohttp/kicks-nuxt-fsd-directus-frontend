<script setup lang="ts">
import { CollectionType } from "~/src/shared/api";
import { ReviewsList } from "~/src/widgets/Reviews/ReviewsList";
</script>

<template>
  <ReviewsList
    :settings="{
      columns: 3,
      collection: CollectionType.REVIEWS,
      heading: 'All reviews',
    }"
    style="padding: 0"
  />
</template>

<style lang="scss">
@use "styles";
</style>
