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
    line-height: 1.9;
    color: #4A5568;
    font-size: 18px;
    margin: var(--v-unit-6) 0;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  /* H2 - Secciones principales con estilo mágico */
  .blog-text :deep(h2) {
    font-size: 2rem;
    font-weight: 800;
    margin: var(--v-unit-8) 0 var(--v-unit-5) 0;
    padding: var(--v-unit-4) 0;
    color: #D1477E;
    position: relative;
    letter-spacing: -0.5px;

    /* Decoración mágica debajo */
    border-bottom: 3px solid #FFD4E5;
    display: inline-block;
    padding-bottom: var(--v-unit-2);
  }

  .blog-text :deep(h2)::before {
    content: '✨ ';
    margin-right: 0.5rem;
  }

  .blog-text :deep(h3) {
    font-size: 1.35rem;
    font-weight: 700;
    margin: var(--v-unit-5) 0 var(--v-unit-3) 0;
    color: #7C3AED;
    letter-spacing: -0.3px;
  }

  /* Párrafos con espaciado generoso */
  .blog-text :deep(p) {
    margin: var(--v-unit-4) 0;
    padding: var(--v-unit-2) 0;
    line-height: 1.95;
  }

  /* Primer párrafo después de h2 - más destacado */
  .blog-text :deep(h2 + p) {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2D3748;
    margin-top: var(--v-unit-5);
  }

  .blog-text :deep(strong) {
    font-weight: 800;
    color: #D1477E;
    background: rgba(209, 71, 126, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .blog-text :deep(strong:hover) {
    background: rgba(209, 71, 126, 0.2);
    transform: scale(1.02);
  }

  .blog-text :deep(em) {
    font-style: italic;
    color: #7C3AED;
  }

  /* Listas mejoradas */
  .blog-text :deep(ul) {
    list-style: none;
    margin: var(--v-unit-5) 0;
    padding-left: 0;
  }

  .blog-text :deep(ul li) {
    margin: var(--v-unit-3) 0;
    line-height: 1.8;
    padding-left: var(--v-unit-5);
    position: relative;
  }

  .blog-text :deep(ul li)::before {
    content: '⭐';
    position: absolute;
    left: 0;
    color: #FFB800;
    font-size: 1.1rem;
  }

  .blog-text :deep(ol) {
    list-style: none;
    margin: var(--v-unit-5) 0;
    padding-left: 0;
    counter-reset: item;
  }

  .blog-text :deep(ol li) {
    margin: var(--v-unit-3) 0;
    line-height: 1.8;
    padding-left: var(--v-unit-5);
    position: relative;
    counter-increment: item;
  }

  .blog-text :deep(ol li)::before {
    content: counter(item) '.';
    position: absolute;
    left: 0;
    font-weight: 800;
    color: #7C3AED;
    min-width: 2rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    .blog-text {
      font-size: 16px;
      margin: var(--v-unit-4) 0;
    }

    .blog-text :deep(h2) {
      font-size: 1.5rem;
      margin: var(--v-unit-6) 0 var(--v-unit-4) 0;
    }

    .blog-text :deep(p) {
      margin: var(--v-unit-3) 0;
    }
  }
</style>
