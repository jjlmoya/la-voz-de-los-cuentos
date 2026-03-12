<template>
  <div class="blog-highlight" :class="`blog-highlight--${block.variant}`">
    <div :class="`blog-highlight__icon blog-highlight__icon--${block.variant}`"></div>
    <div class="blog-highlight__content">
      <h4 v-if="block.title" class="blog-highlight__title">{{ block.title }}</h4>
      <p class="blog-highlight__body">{{ block.body }}</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-highlight {
    display: flex;
    gap: var(--v-unit-4);
    padding: var(--v-unit-4);
    border-radius: 8px;
    margin: 0;
  }

  .blog-highlight--info {
    background-color: rgba(33, 150, 243, 0.1);
    border-left: 4px solid #2196f3;
    color: #1976d2;
  }

  .blog-highlight--tip {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid #4caf50;
    color: #388e3c;
  }

  .blog-highlight--success {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid #4caf50;
    color: #388e3c;
  }

  .blog-highlight--warning {
    background-color: rgba(255, 193, 7, 0.1);
    border-left: 4px solid #ffc107;
    color: #f57f17;
  }

  .blog-highlight__icon {
    font-size: 24px;
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blog-highlight__content {
    flex: 1;
  }

  .blog-highlight__title {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: var(--v-font-size-md);
    font-weight: bold;
  }

  .blog-highlight__body {
    margin: 0;
    font-size: var(--v-font-size-sm);
    line-height: 1.6;
  }
</style>
