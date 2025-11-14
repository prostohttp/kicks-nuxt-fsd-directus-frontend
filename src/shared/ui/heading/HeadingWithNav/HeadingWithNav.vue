<script setup lang="ts"></script>

<template>
  <div class="heading-with-nav">
    <slot name="heading"/>
    <div class="heading-with-nav__nav">
      <slot name="nav"/>
    </div>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
