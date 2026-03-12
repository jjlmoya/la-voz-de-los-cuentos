<template>
  <VContainer size="xl" class="blog-page">
    <div class="blog-page__grid">
      <a
        v-for="post in posts"
        :key="post.slug"
        :href="toBlogPost(post.slug)"
        class="blog-post-card"
        :class="`blog-post-card--${getCategoryClass(post.category)}`"
      >
        <div class="blog-post-card__header">
          <p class="blog-post-card__category">{{ post.category }}</p>
        </div>
        <div class="blog-post-card__content">
          <h2 class="blog-post-card__title">{{ post.title }}</h2>
          <p class="blog-post-card__description">{{ post.description }}</p>
        </div>
        <div class="blog-post-card__footer">
          <span class="blog-post-card__date">{{ formatDate(post.date) }}</span>
          <span class="blog-post-card__readmore">{{ t('blog.readmore') }} →</span>
        </div>
      </a>
    </div>
  </VContainer>
</template>

<script setup>
  import { VContainer } from '@overgaming/vicius'
  import t from '../../translations'
  import { toBlogPost } from '../../router'
  import { getPosts } from '../../data'

  const posts = getPosts()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(import.meta.env.PUBLIC_LANG === 'es' ? 'es-ES' : 'en-US', options)
  }

  const getCategoryClass = (category) => {
    const map = {
      'Tips': 'tips',
      'Consejos': 'tips',
      'Education': 'education',
      'Educación': 'education'
    }
    return map[category] || category.toLowerCase()
  }
</script>

<style scoped>
  .blog-page {
    min-height: 70vh;
    padding: var(--v-unit-8);
  }

  .blog-page__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
    gap: var(--v-unit-6);
  }

  .blog-post-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--v-radius-xl);
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .blog-post-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  .blog-post-card__header {
    padding: var(--v-unit-4) var(--v-unit-6) var(--v-unit-3);
    border-bottom: 2px solid transparent;
  }

  .blog-post-card--tips .blog-post-card__header {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(76, 175, 80, 0.03) 100%);
    border-bottom-color: #4caf50;
  }

  .blog-post-card--education .blog-post-card__header {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(33, 150, 243, 0.03) 100%);
    border-bottom-color: #2196f3;
  }

  .blog-post-card__category {
    margin: 0;
    font-size: var(--v-font-size-xs);
    font-weight: 700;
    color: var(--v-color-text-high);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .blog-post-card__content {
    padding: var(--v-unit-4) var(--v-unit-6);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .blog-post-card__title {
    margin: 0 0 var(--v-unit-2) 0;
    font-size: var(--v-font-size-lg);
    font-weight: 700;
    color: var(--v-color-text-high);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-post-card__description {
    margin: 0;
    font-size: var(--v-font-size-md);
    color: var(--v-color-text-medium);
    line-height: 1.5;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-post-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--v-unit-4) var(--v-unit-6);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .blog-post-card__date {
    font-size: var(--v-font-size-sm);
    color: var(--v-color-text-medium);
  }

  .blog-post-card__readmore {
    font-size: var(--v-font-size-md);
    font-weight: 600;
    color: var(--v-color-primary);
    transition: transform 0.3s ease;
  }

  .blog-post-card:hover .blog-post-card__readmore {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    .blog-page__grid {
      grid-template-columns: 1fr;
    }

    .blog-post-card__title {
      font-size: var(--v-font-size-md);
    }

    .blog-post-card__header {
      padding: var(--v-unit-4) var(--v-unit-4) var(--v-unit-3);
    }

    .blog-post-card__content {
      padding: var(--v-unit-3) var(--v-unit-4);
    }

    .blog-post-card__footer {
      padding: var(--v-unit-3) var(--v-unit-4);
    }
  }
</style>
