<template>
  <component :is="`h${block.level}`" class="blog-heading" :class="`blog-heading--h${block.level}`">
    {{ block.text }}
  </component>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-heading {
    margin: 0;
    font-weight: 800;
    color: #2D3E50;
    line-height: 1.2;
  }

  .blog-heading--h2 {
    font-size: 36px;
    margin-top: var(--v-unit-2);
    margin-bottom: var(--v-unit-1);
    color: #6B5B4F;
  }

  .blog-heading--h3 {
    font-size: 28px;
    margin-top: var(--v-unit-2);
    margin-bottom: var(--v-unit-1);
    color: #4A90E2;
  }

  .blog-heading--h4,
  .blog-heading--h5,
  .blog-heading--h6 {
    font-size: 20px;
    margin-top: var(--v-unit-1);
    margin-bottom: var(--v-unit-1);
    color: #5A6C7D;
  }
</style>
