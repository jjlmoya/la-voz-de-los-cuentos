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
    background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #A78BFA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(124, 58, 237, 0.1);

    /* Decoración mágica debajo con gradiente */
    border-bottom: 3px solid;
    border-image: linear-gradient(90deg, #7C3AED, #FBBF24, #8B5CF6) 1;
    display: inline-block;
    padding-bottom: var(--v-unit-2);
  }

  .blog-text :deep(h2)::before {
    content: '🌟 ';
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
    color: #7C3AED;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.1);
  }

  .blog-text :deep(strong:hover) {
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(251, 191, 36, 0.2) 100%);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
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
    padding: var(--v-unit-2) var(--v-unit-3) var(--v-unit-2) var(--v-unit-5);
    background: linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0%, transparent 100%);
    border-left: 3px solid #8B5CF6;
    border-radius: 0 4px 4px 0;
    transition: all 0.3s ease;
  }

  .blog-text :deep(ul li:hover) {
    background: linear-gradient(90deg, rgba(124, 58, 237, 0.1) 0%, transparent 100%);
    border-left-color: #7C3AED;
    transform: translateX(4px);
  }

  .blog-text :deep(ul li)::before {
    content: '✨';
    position: absolute;
    left: 8px;
    color: #FBBF24;
    font-size: 1rem;
    animation: twinkle 2s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
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
    padding: var(--v-unit-2) var(--v-unit-3) var(--v-unit-2) var(--v-unit-5);
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%);
    border-left: 3px solid #60A5FA;
    border-radius: 0 4px 4px 0;
    transition: all 0.3s ease;
    counter-increment: item;
  }

  .blog-text :deep(ol li:hover) {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
    border-left-color: #3B82F6;
    transform: translateX(4px);
  }

  .blog-text :deep(ol li)::before {
    content: counter(item);
    position: absolute;
    left: 0;
    font-weight: 800;
    color: white;
    background: linear-gradient(135deg, #3B82F6, #60A5FA);
    min-width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-align: center;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
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
