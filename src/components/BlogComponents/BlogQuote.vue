<template>
  <blockquote class="blog-quote">
    <p class="blog-quote__text">{{ block.text }}</p>
    <footer v-if="block.author" class="blog-quote__author">— {{ block.author }}</footer>
  </blockquote>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-quote {
    margin: var(--v-unit-3) 0;
    padding: var(--v-unit-3) var(--v-unit-3);
    border-left: 6px solid #FFB3D9;
    background: linear-gradient(90deg, #FFF5FB 0%, #FFFBFC 100%);
    border-radius: 8px;
    font-style: italic;
    color: #2D3E50;
    box-shadow: 0 4px 12px rgba(255, 107, 157, 0.15);
  }

  .blog-quote__text {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: 19px;
    line-height: 1.6;
    font-weight: 600;
  }

  .blog-quote__author {
    margin: 0;
    font-size: 14px;
    color: #FF6B9D;
    font-style: normal;
    font-weight: 700;
  }
</style>
