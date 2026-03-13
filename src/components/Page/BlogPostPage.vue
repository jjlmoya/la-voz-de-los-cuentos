<template>
  <div class="blog-post-page">
    <VContainer size="lg" class="blog-post-page__container">
      <article class="blog-post-page__article">
        <header class="blog-post-page__header">
          <div class="blog-post-page__meta">
            <span class="blog-post-page__category" :style="getCategoryStyle()">{{ post.category }}</span>
            <span class="blog-post-page__date">{{ formatDate(post.date) }}</span>
          </div>
          <h1 class="blog-post-page__title">{{ post.title }}</h1>
          <p class="blog-post-page__description">{{ post.description }}</p>
        </header>

        <div class="blog-post-page__content">
          <BlogContent :content="post.content" :lang="lang" />
        </div>

        <footer class="blog-post-page__footer">
          <a :href="toBlog()" class="blog-post-page__back">
            ← {{ t('menu.blog') }}
          </a>
        </footer>
      </article>

      <section v-if="relatedStories.length > 0" class="blog-post-page__related">
        <h2 class="blog-post-page__related-title">{{ t('blog.relatedStories') }}</h2>
        <div class="blog-post-page__related-grid">
          <BasicCard
            v-for="story in relatedStories"
            :key="story.key"
            :slug="story.key"
            :title="story.name"
            :time="parseInt(story.time.replace(',', '.'))"
            :storyContent="story.story"
            isStory
          />
        </div>
      </section>
    </VContainer>
  </div>
</template>

<script setup>
  import { VContainer } from '@overgaming/vicius'
  import t from '../../translations'
  import { toBlog } from '../../router'
  import BlogContent from '../BlogComponents/BlogContent.vue'
  import BasicCard from '../Cards/Basic.vue'
  import { getStories } from '../../data'
  import { computed } from 'vue'

  const props = defineProps({
    post: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      default: 'es'
    }
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(import.meta.env.PUBLIC_LANG === 'es' ? 'es-ES' : 'en-US', options)
  }

  // Valid categories with their gradient colors
  const categoryColors = {
    'Educación': 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    'Education': 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    'Consejos': 'linear-gradient(135deg, #EC4899, #F43F5E)',
    'Tips': 'linear-gradient(135deg, #EC4899, #F43F5E)',
  }

  // Generate deterministic color from category name
  const generateCategoryColor = (category) => {
    let hash = 0
    for (let i = 0; i < category.length; i++) {
      hash = ((hash << 5) - hash) + category.charCodeAt(i)
    }

    const colors = [
      'linear-gradient(135deg, #FF6B6B, #FF8E72)',
      'linear-gradient(135deg, #4ECDC4, #44A08D)',
      'linear-gradient(135deg, #FFE66D, #FFC93D)',
      'linear-gradient(135deg, #A8E6CF, #56AB91)',
      'linear-gradient(135deg, #FF9A76, #FF6B6B)',
      'linear-gradient(135deg, #9B59B6, #8E44AD)',
    ]

    return colors[Math.abs(hash) % colors.length]
  }

  const getCategoryStyle = () => {
    const category = props.post.category
    return {
      background: categoryColors[category] || generateCategoryColor(category),
      color: 'white',
      padding: 'var(--v-unit-1) var(--v-unit-3)',
      borderRadius: 'var(--v-radius-md)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }

  // Generate deterministic hash from post title for seed-based story selection
  const hashTitle = (title) => {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  const relatedStories = computed(() => {
    // Get stories from current language
    const allStories = getStories(props.lang)

    if (!allStories || allStories.length === 0) {
      return []
    }

    // Generate seed from post title
    const seed = hashTitle(props.post.title)

    // Select 2 stories deterministically based on seed
    const selectedStories = []
    const storyCount = allStories.length

    // Get first story
    const firstIndex = seed % storyCount
    selectedStories.push(allStories[firstIndex])

    // Get second story (different from first)
    const secondIndex = (seed + Math.floor(seed / storyCount) + 1) % storyCount
    if (secondIndex !== firstIndex) {
      selectedStories.push(allStories[secondIndex])
    } else {
      // If same story, get the next one
      selectedStories.push(allStories[(secondIndex + 1) % storyCount])
    }

    return selectedStories
  })
</script>

<style scoped>
  .blog-post-page {
    min-height: 100vh;
  }

  .blog-post-page__container {
    padding: var(--v-unit-4);
    padding-top: var(--v-unit-6);
  }

  .blog-post-page__article {
    max-width: 900px;
    margin: 0 auto;
  }

  .blog-post-page__header {
    margin-bottom: var(--v-unit-4);
  }

  .blog-post-page__meta {
    display: flex;
    gap: var(--v-unit-4);
    margin-bottom: var(--v-unit-3);
    font-size: var(--v-font-size-sm);
  }

  .blog-post-page__category {
    color: white;
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .blog-post-page__category:hover {
    transform: scale(1.05);
  }

  .blog-post-page__date {
    color: var(--v-color-text-medium);
    display: flex;
    align-items: center;
  }

  .blog-post-page__title {
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 900;
    color: #FF8FBC; /* Bright Pastel Pink */
    margin: 0 0 var(--v-unit-3) 0;
    line-height: 1.1;
    text-shadow: 2px 2px 0px #FFD4E5;
  }

  .blog-post-page__description {
    font-size: 22px;
    color: #718096;
    margin: 0;
    line-height: 1.5;
    font-weight: 600;
    border-left: 5px solid #A8D8EA;
    padding-left: var(--v-unit-4);
  }

  .blog-post-page__content {
    margin-bottom: var(--v-unit-4);
    line-height: 1.8;
    color: #2D3E50;
  }

  .blog-post-page__footer {
    padding-top: var(--v-unit-4);
    border-top: 1px solid #f0f0f0;
    margin-bottom: var(--v-unit-4);
  }

  .blog-post-page__back {
    display: inline-flex;
    align-items: center;
    gap: var(--v-unit-2);
    color: var(--v-color-primary);
    text-decoration: none;
    font-weight: 600;
    transition: gap 0.3s ease;
  }

  .blog-post-page__back:hover {
    gap: var(--v-unit-3);
  }

  .blog-post-page__related {
    max-width: 900px;
    margin: 0 auto;
  }

  .blog-post-page__related-title {
    font-size: var(--v-font-size-xl);
    font-weight: 700;
    color: var(--v-color-text-high);
    margin: var(--v-unit-6) 0 var(--v-unit-4) 0;
  }

  .blog-post-page__related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--v-unit-8);
  }

  @media (max-width: 768px) {
    .blog-post-page__container {
      padding: var(--v-unit-4);
    }

    .blog-post-page__title {
      font-size: 28px;
    }

    .blog-post-page__description {
      font-size: var(--v-font-size-md);
    }

    .blog-post-page__related-grid {
      grid-template-columns: 1fr;
      gap: var(--v-unit-6);
    }
  }
</style>
