<script setup lang="ts">
import { Account } from "~/src/pages/account";

definePageMeta({
  middleware: ["user"],
});
</script>

<template>
  <Account />
</template>
