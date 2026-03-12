<template>
  <div class="blog-post-page">
    <VContainer size="lg" class="blog-post-page__container">
      <article class="blog-post-page__article">
        <header class="blog-post-page__header">
          <div class="blog-post-page__meta">
            <span class="blog-post-page__category">{{ post.category }}</span>
            <span class="blog-post-page__date">{{ formatDate(post.date) }}</span>
          </div>
          <h1 class="blog-post-page__title">{{ post.title }}</h1>
          <p class="blog-post-page__description">{{ post.description }}</p>
        </header>

        <div class="blog-post-page__content">
          <BlogContent :content="post.content" />
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
    background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
    color: white;
    padding: var(--v-unit-1) var(--v-unit-3);
    border-radius: var(--v-radius-md);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .blog-post-page__date {
    color: var(--v-color-text-medium);
    display: flex;
    align-items: center;
  }

  .blog-post-page__title {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    color: #FF6B9D;
    margin: 0 0 var(--v-unit-2) 0;
    line-height: 1.2;
  }

  .blog-post-page__description {
    font-size: var(--v-font-size-lg);
    color: #2D3E50;
    margin: 0;
    line-height: 1.6;
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
