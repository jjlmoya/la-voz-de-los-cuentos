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
    line-height: 1.2;
  }

  .blog-heading--h2 {
    font-size: 32px;
    margin-top: var(--v-unit-6);
    margin-bottom: var(--v-unit-3);
    color: #D1477E;
    border-bottom: 3px dashed #FFD4E5;
    padding-bottom: 8px;
    display: inline-block;
    width: 100%;
  }

  .blog-heading--h3 {
    font-size: 26px;
    margin-top: var(--v-unit-5);
    margin-bottom: var(--v-unit-2);
    color: #D1477E;
    position: relative;
    padding-left: 20px;
  }

  .blog-heading--h3::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 80%;
    background: #FFD4E5;
    border-radius: 10px;
  }

  .blog-heading--h4,
  .blog-heading--h5,
  .blog-heading--h6 {
    font-size: 22px;
    margin-top: var(--v-unit-4);
    margin-bottom: var(--v-unit-2);
    color: #D1477E;
  }
</style>
