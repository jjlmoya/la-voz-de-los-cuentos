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
    line-height: 1.7;
    color: #2D3E50;
    font-size: 17px;
    margin: var(--v-unit-2) 0;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
</style>
