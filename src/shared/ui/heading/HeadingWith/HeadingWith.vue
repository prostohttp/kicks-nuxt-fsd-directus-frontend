<script setup lang="ts"></script>

<template>
  <div class="heading-with">
    <slot name="left"/>
    <div class="heading-with__right">
      <slot name="right"/>
    </div>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
