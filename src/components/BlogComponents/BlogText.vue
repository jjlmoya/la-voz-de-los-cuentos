<template>
  <div v-if="isHtml" class="blog-text" v-html="block.body"></div>
  <p v-else class="blog-text">{{ block.body }}</p>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    block: { type: Object, required: true }
  })

  const isHtml = computed(() => {
    return props.block.body && typeof props.block.body === 'string' && /<[^>]+>/.test(props.block.body)
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

  .blog-text :deep(h2) {
    font-size: 1.5rem;
    font-weight: 700;
    margin: var(--v-unit-4) 0 var(--v-unit-3) 0;
    color: #2D3748;
  }

  .blog-text :deep(h3) {
    font-size: 1.25rem;
    font-weight: 700;
    margin: var(--v-unit-3) 0 var(--v-unit-2) 0;
    color: #4A5568;
  }

  .blog-text :deep(p) {
    margin: 0.5rem 0;
  }

  .blog-text :deep(strong) {
    font-weight: 700;
    color: #2D3748;
  }

  .blog-text :deep(em) {
    font-style: italic;
  }

  .blog-text :deep(ul) {
    list-style: disc;
    margin-left: 2rem;
    margin: var(--v-unit-3) 0 var(--v-unit-3) 2rem;
  }

  .blog-text :deep(ul li) {
    margin: 0.5rem 0;
    line-height: 1.6;
  }

  .blog-text :deep(ol) {
    list-style: decimal;
    margin-left: 2rem;
    margin: var(--v-unit-3) 0 var(--v-unit-3) 2rem;
  }

  .blog-text :deep(ol li) {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
</style>
