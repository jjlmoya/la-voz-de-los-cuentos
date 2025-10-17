<template>
  <section v-if="relatedStories.length > 0" class="related-stories">
    <div class="related-stories__header">
      <VText as="h3" variant="subtitle" color="high">
        {{ t('story.related.title') }}
      </VText>
      <VText v-if="sagaName" as="p" variant="caption" color="medium">
        {{ t('story.related.from_saga') }}: {{ sagaName }}
      </VText>
    </div>
    
    <div class="related-stories__grid">
      <article 
        v-for="story in relatedStories" 
        :key="story.key"
        class="related-story"
      >
        <a :href="toStory(story.key)" class="related-story__link">
          <div class="related-story__image">
            <VImage
              :src="`/assets/stories/${lang}/${story.key}.webp`"
              :alt="story.name"
              loading="lazy"
            />
          </div>
          <div class="related-story__content">
            <VText as="h4" variant="body" color="high" class="related-story__title">
              {{ story.name }}
            </VText>
            <VText as="p" variant="caption" color="medium" class="related-story__time">
              {{ formatTime(story.time) }} min
            </VText>
          </div>
        </a>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { VText, VImage } from '@overgaming/vicius'
import { toStory } from '../../router'
import t from '../../translations'

const props = defineProps({
  currentStory: {
    type: Object,
    default: () => ({})
  },
  allStories: {
    type: Array,
    required: true
  },
  allSagas: {
    type: Array,
    default: () => []
  }
})

const lang = import.meta.env.PUBLIC_LANG

const currentSaga = computed(() => {
  if (!props.currentStory?.saga) return null
  return props.allSagas.find(saga => saga.key === props.currentStory.saga)
})

const sagaName = computed(() => {
  return currentSaga.value?.name || null
})

const relatedStories = computed(() => {
  if (!props.currentStory?.saga) return []
  
  return props.allStories
    .filter(story => 
      story.saga === props.currentStory.saga && 
      story.key !== props.currentStory.key
    )
    .slice(0, 4)
})

const formatTime = (timeStr) => {
  if (!timeStr) return '0'
  const time = parseFloat(timeStr.replace(',', '.'))
  return Math.round(time / 60) || Math.round(time)
}
</script>

<style scoped>
.related-stories {
  margin-top: var(--v-unit-12);
  padding: var(--v-unit-8);
  background-color: var(--v-color-background-soft);
  border-radius: var(--v-radius-md);
}

.related-stories__header {
  margin-bottom: var(--v-unit-6);
}

.related-stories__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--v-unit-4);
}

.related-story {
  background-color: var(--v-color-background);
  border-radius: var(--v-radius-sm);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.related-story:hover {
  transform: translateY(-2px);
  box-shadow: var(--v-shadow-md);
}

.related-story__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.related-story__image {
  aspect-ratio: 16/9;
  overflow: hidden;
}

.related-story__content {
  padding: var(--v-unit-4);
}

.related-story__title {
  margin-bottom: var(--v-unit-2);
  line-height: 1.3;
}

.related-story__time {
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .related-stories__grid {
    grid-template-columns: 1fr;
  }
  
  .related-story {
    display: flex;
  }
  
  .related-story__image {
    width: 120px;
    flex-shrink: 0;
    aspect-ratio: 1;
  }
  
  .related-story__content {
    flex: 1;
  }
}
</style>