<script setup lang="ts"></script>

<template>
  <div class="heading-with">
    <div class="heading-with__left">
      <slot name="left"/>
    </div>
    <div class="heading-with__right">
      <slot name="right"/>
    </div>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
