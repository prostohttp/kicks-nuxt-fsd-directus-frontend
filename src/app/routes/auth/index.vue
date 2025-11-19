<script setup lang="ts">
import { Authentication } from "~/src/pages/auth";

definePageMeta({
  middleware: ["guest"],
});
</script>

<template>
  <Authentication />
</template>
