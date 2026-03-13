<template>
  <div class="blog-seo">
    <!-- JSON-LD schema data embedded for SEO -->
    <script type="application/ld+json" v-html="JSON.stringify(jsonLdData)"></script>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { toStory } from '../../router'

const props = defineProps({
  post: {
    type: Object,
    required: true,
    properties: {
      slug: String,
      title: String,
      description: String,
      date: String,
      category: String,
      tags: Array,
      content: Array
    }
  },
  stories: {
    type: Array,
    default: () => []
  },
  lang: {
    type: String,
    default: 'es'
  },
  baseUrl: {
    type: String,
    default: 'https://lavozdeLoscuentos.com'
  }
})

// Extract story recommendations from post content
const storyRecommendations = computed(() => {
  return props.post.content.filter(block => block.type === 'story_recommendation')
})

// Generate JSON-LD structured data for blog post with story references
const generateJsonLd = () => {
  const stories = storyRecommendations.value.map(rec => ({
    '@type': 'CreativeWork',
    name: rec.title,
    description: rec.description,
    url: `${props.baseUrl}${toStory(rec.slug)}`,
    inLanguage: props.lang,
    creator: {
      '@type': 'Organization',
      name: 'La Voz de los Cuentos'
    }
  }))

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.post.title,
    description: props.post.description,
    datePublished: props.post.date,
    dateModified: props.post.date,
    inLanguage: props.lang,
    url: `${props.baseUrl}/${props.lang === 'es' ? 'blog' : 'blog'}/${props.post.slug}/`,
    author: {
      '@type': 'Organization',
      name: 'La Voz de los Cuentos',
      url: props.baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'La Voz de los Cuentos',
      url: props.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${props.baseUrl}/logo.png`
      }
    },
    keywords: props.post.tags.join(', '),
    articleSection: props.post.category,
    mentions: stories.length > 0 ? stories : undefined,
    isPartOf: {
      '@type': 'WebSite',
      name: 'La Voz de los Cuentos',
      url: props.baseUrl
    }
  }

  // Remove undefined fields
  if (!blogPostSchema.mentions) {
    delete blogPostSchema.mentions
  }

  return blogPostSchema
}

// Generate meta tags for SEO (for reference/documentation)
const generateMetaTags = () => {
  const keywords = [
    props.post.tags.join(', '),
    props.post.category,
    'cuentos para niños',
    'stories for children',
    'blog infantil'
  ].filter(Boolean).join(', ')

  return {
    title: `${props.post.title} | La Voz de los Cuentos`,
    description: props.post.description,
    keywords: keywords,
    'og:title': props.post.title,
    'og:description': props.post.description,
    'og:type': 'article',
    'og:url': `${props.baseUrl}/${props.lang === 'es' ? 'blog' : 'blog'}/${props.post.slug}/`,
    'twitter:card': 'summary_large_image',
    'twitter:title': props.post.title,
    'twitter:description': props.post.description,
    'article:published_time': props.post.date,
    'article:section': props.post.category,
    'article:tag': props.post.tags
  }
}

// Get JSON-LD data for embedding in page
const jsonLdData = computed(() => {
  return generateJsonLd()
})
</script>

<style scoped>
.blog-seo {
  display: none;
}
</style>
