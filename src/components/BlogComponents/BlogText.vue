<template>
  <p class="blog-text">{{ block.body }}</p>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-text {
    line-height: 1.8;
    color: #4A5568;
    font-size: 18px;
    margin: var(--v-unit-4) 0;
    font-weight: 500;
    letter-spacing: 0.2px;
  }
</style>
