<script setup lang="ts"></script>

<template>
  <div class="heading-with">
    <slot name="heading"/>
    <div class="heading-with__right">
      <slot name="nav"/>
      <slot name="button"/>
    </div>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
