<script setup lang='ts'>
    const route = useRoute();
</script>

<template>
    <h1>{{ route.fullPath }}</h1>
</template>