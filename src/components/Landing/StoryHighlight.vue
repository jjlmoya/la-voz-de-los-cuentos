<template>
  <div v-if="highlightedStory" class="story-highlight">
    <a :href="storyLink" class="story-highlight__link">
      <div class="story-highlight__image-wrapper">
        <img
          :src="getImage()"
          :alt="highlightedStory.name"
          class="story-highlight__image"
          loading="lazy"
        />
        <div class="story-highlight__overlay"></div>
      </div>
      <div class="story-highlight__content">
        <div class="story-highlight__header">
          <span class="story-highlight__label">{{ label }}</span>
          <span class="story-highlight__icon">→</span>
        </div>
        <h4 class="story-highlight__title">{{ highlightedStory.name }}</h4>
        <p class="story-highlight__description">
          {{ getStorySnippet() }}
        </p>
        <div class="story-highlight__meta">
          <span v-if="formattedTime" class="story-highlight__time">{{ formattedTime }} min</span>
          <span class="story-highlight__cta">{{ ctaText }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { toStory } from '../../router'
  import useLanding from '../../composables/useLanding'

  const props = defineProps({
    block: {
      type: Object,
      required: true
    },
    landing: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      default: 'es'
    }
  })

  const { getStories } = useLanding(props.landing)
  const allStories = getStories()

  const searchKeyword = computed(() => props.block?.searchKeyword || '')
  const label = computed(() => props.block?.label || (props.lang === 'en' ? 'Featured Story' : 'Cuento Destacado'))

  // Deterministic hash function for seeded random selection
  const hashString = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  const highlightedStory = computed(() => {
    if (!searchKeyword.value) return null
    const matchingStories = allStories.filter(story =>
      story.story && story.story.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
    if (matchingStories.length === 0) return null
    // Use seeded random: same keyword always gets same story, but distributed across available stories
    const seed = hashString(searchKeyword.value)
    const index = seed % matchingStories.length
    return matchingStories[index]
  })

  const storyLink = computed(() => {
    return highlightedStory.value ? toStory(highlightedStory.value.key) : '#'
  })

  const getImage = () => {
    return `/assets/stories/${props.lang}/${highlightedStory.value?.key}.webp`
  }

  const getStorySnippet = () => {
    if (!highlightedStory.value?.story) return ''
    const text = highlightedStory.value.story
    const words = text.split(' ')
    return words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '')
  }

  const ctaText = computed(() => {
    return props.lang === 'en' ? 'Listen Now' : 'Escucha Ahora'
  })

  const formattedTime = computed(() => {
    if (!highlightedStory.value?.time) return ''
    const seconds = parseFloat(highlightedStory.value.time.replace(',', '.'))
    if (isNaN(seconds)) return ''
    return Math.ceil(seconds / 60).toString()
  })
</script>

<style scoped>
.story-highlight {
  margin: var(--v-unit-6) 0;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: white;
  border: 1px solid #E2E8F0;
}

.story-highlight:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(209, 71, 126, 0.15);
  border-color: #FFD4E5;
}

.story-highlight__link {
  display: flex;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  min-height: 280px;
}

.story-highlight__image-wrapper {
  position: relative;
  width: 40%;
  overflow: hidden;
  flex-shrink: 0;
}

.story-highlight__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.story-highlight__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%);
  pointer-events: none;
}

.story-highlight:hover .story-highlight__image {
  transform: scale(1.08);
}

.story-highlight__content {
  padding: var(--v-unit-5);
  color: #2D3748;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}

.story-highlight__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--v-unit-3);
  gap: var(--v-unit-2);
}

.story-highlight__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #D1477E;
  background: #FFF5FB;
  padding: 4px 12px;
  border-radius: 8px;
  white-space: nowrap;
}

.story-highlight__icon {
  font-size: 20px;
  color: #D1477E;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.story-highlight__link:hover .story-highlight__icon {
  transform: translateX(4px);
}

.story-highlight__title {
  font-size: 19px;
  font-weight: 800;
  margin: 0 0 var(--v-unit-2) 0;
  line-height: 1.3;
  letter-spacing: -0.5px;
  color: #1A202C;
}

.story-highlight__description {
  font-size: 15px;
  margin: 0 0 var(--v-unit-4) 0;
  line-height: 1.6;
  color: #4A5568;
  flex-grow: 1;
}

.story-highlight__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--v-unit-3);
  border-top: 1px solid #EDF2F7;
  margin-top: auto;
}

.story-highlight__time {
  font-size: 12px;
  color: #718096;
  font-weight: 600;
}

.story-highlight__cta {
  font-size: 13px;
  font-weight: 700;
  color: #D1477E;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .story-highlight {
    margin: var(--v-unit-4) 0;
  }

  .story-highlight__link {
    flex-direction: column;
    min-height: auto;
  }

  .story-highlight__image-wrapper {
    width: 100%;
    height: 220px;
  }

  .story-highlight__content {
    padding: var(--v-unit-4);
  }

  .story-highlight__title {
    font-size: 17px;
  }

  .story-highlight__description {
    font-size: 14px;
  }
}
</style>
