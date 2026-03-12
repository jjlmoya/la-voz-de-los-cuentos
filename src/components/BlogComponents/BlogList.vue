<template>
  <component
    :is="block.style === 'ordered' ? 'ol' : 'ul'"
    class="blog-list"
    :class="`blog-list--${block.style}`"
  >
    <li v-for="(item, index) in block.items" :key="index" class="blog-list__item">
      {{ item }}
    </li>
  </component>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-list {
    margin: var(--v-unit-2) 0;
    padding-left: var(--v-unit-5);
    color: #2D3E50;
  }

  .blog-list--unordered {
    list-style-type: none;
  }

  .blog-list--unordered .blog-list__item::before {
    content: "★";
    color: #FFB3D9;
    font-size: 18px;
    margin-right: var(--v-unit-2);
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  .blog-list--ordered {
    list-style-type: decimal;
    padding-left: var(--v-unit-6);
  }

  .blog-list--ordered .blog-list__item {
    font-weight: 600;
  }

  .blog-list__item {
    margin-bottom: var(--v-unit-1);
    line-height: 1.6;
    font-size: 16px;
    font-weight: 500;
  }

  .blog-list__item:last-child {
    margin-bottom: 0;
  }
</style>
