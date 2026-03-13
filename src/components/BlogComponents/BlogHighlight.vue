<template>
  <div class="blog-highlight" :class="`blog-highlight--${block.variant}`">
    <div :class="`blog-highlight__icon blog-highlight__icon--${block.variant}`">
      {{ getIcon(block.variant) }}
    </div>
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

  const getIcon = (variant) => {
    const icons = {
      info: '💡',
      tip: '✨',
      success: '🌈',
      warning: '🧸'
    }
    return icons[variant] || '✨'
  }
</script>

<style scoped>
  .blog-highlight {
    display: flex;
    gap: var(--v-unit-4);
    padding: var(--v-unit-5);
    border-radius: 20px;
    margin: var(--v-unit-4) 0;
    border-width: 2px;
    border-style: solid;
  }

  .blog-highlight--info {
    background-color: #EBF8FF;
    border-color: #BEE3F8;
    color: #2B6CB0;
  }

  .blog-highlight--tip {
    background-color: #F0FFF4;
    border-color: #C6F6D5;
    color: #2F855A;
  }

  .blog-highlight--success {
    background-color: #FFF5FB;
    border-color: #FFD4E5;
    color: #B83280;
  }

  .blog-highlight--warning {
    background-color: #FFFBEB;
    border-color: #FEFCBF;
    color: #B7791F;
  }

  .blog-highlight__icon {
    font-size: 28px;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blog-highlight__content {
    flex: 1;
  }

  .blog-highlight__title {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: 18px;
    font-weight: 800;
  }

  .blog-highlight__body {
    margin: 0;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 500;
  }
</style>
