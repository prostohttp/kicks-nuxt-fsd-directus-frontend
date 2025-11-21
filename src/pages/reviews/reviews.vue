<script setup lang="ts">
import { LargeHeading } from "~/src/shared/ui/heading";
import { ReviewsList } from "~/src/widgets/Reviews/ReviewsList";

useSeoMeta({
  title: "All reviews",
});
</script>

<template>
  <section class="reviews-page">
    <LargeHeading heading="Reviews" />
    <ReviewsList style="padding: 0" />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
