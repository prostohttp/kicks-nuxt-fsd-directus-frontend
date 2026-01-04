<script setup lang="ts">
import { Button } from '~/src/shared/ui/form';
import { IconHeart } from '~/src/shared/ui/icons';

const addToFavorites = () => {
  console.log("Add to favorites");
};

</script>

<template>
  <Button
    variant="fill"
    size="large"
    @click="addToFavorites"
  >
    <IconHeart />
  </Button>
</template>
