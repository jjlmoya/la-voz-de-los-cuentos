<template>
  <div class="story-recommendation" :class="`story-recommendation--${block.variant}`">
    <a :href="storyLink" class="story-recommendation__link">
      <div class="story-recommendation__image-wrapper">
        <img
          :src="getImage()"
          :alt="displayTitle"
          class="story-recommendation__image"
          loading="lazy"
        />
        <div class="story-recommendation__overlay"></div>
      </div>
      <div class="story-recommendation__content">
        <div class="story-recommendation__header">
          <span class="story-recommendation__label">{{ block.label || (props.lang === 'es' ? 'Cuento Recomendado' : 'Recommended Story') }}</span>
          <span class="story-recommendation__icon">→</span>
        </div>
        <h4 class="story-recommendation__title">{{ displayTitle }}</h4>
        <p class="story-recommendation__description">{{ block.description }}</p>
        <div class="story-recommendation__meta">
          <span v-if="block.duration" class="story-recommendation__time">⏱ {{ block.duration }} min</span>
          <span class="story-recommendation__cta">{{ ctaText }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { toStory } from '../../router'
import t from '../../translations'

const props = defineProps({
  block: {
    type: Object,
    required: true
  },
  lang: {
    type: String,
    default: 'es'
  }
})

import { getStories } from '../../data'

const stories = getStories(props.lang)
const story = stories.find(s => s.key === props.block.slug)
const displayTitle = computed(() => story?.name || props.block.title)

const storyLink = computed(() => toStory(props.block.slug))

const ctaText = computed(() => {
  return t('blog.readmore', 'Read More')
})

const getImage = () => {
  return `/assets/stories/${props.lang}/${props.block.slug}.webp`
}
</script>

<style scoped>
.story-recommendation {
  margin: var(--v-unit-6) 0;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.story-recommendation__link {
  display: flex;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  min-height: 280px;
}

.story-recommendation__image-wrapper {
  position: relative;
  width: 40%;
  overflow: hidden;
  flex-shrink: 0;
}

.story-recommendation__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.story-recommendation__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
  pointer-events: none;
}

.story-recommendation:hover .story-recommendation__image {
  transform: scale(1.08);
}

.story-recommendation:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.story-recommendation--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.story-recommendation--primary:hover {
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.3);
}

.story-recommendation--secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.story-recommendation--secondary:hover {
  box-shadow: 0 12px 32px rgba(245, 87, 108, 0.3);
}

.story-recommendation--success {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.story-recommendation--success:hover {
  box-shadow: 0 12px 32px rgba(79, 172, 254, 0.3);
}

.story-recommendation--warning {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.story-recommendation--warning:hover {
  box-shadow: 0 12px 32px rgba(250, 112, 154, 0.3);
}

.story-recommendation__content {
  padding: var(--v-unit-5);
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}

.story-recommendation__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--v-unit-3);
  gap: var(--v-unit-2);
}

.story-recommendation__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.95;
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 12px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  white-space: nowrap;
}

.story-recommendation__icon {
  font-size: 20px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.story-recommendation__link:hover .story-recommendation__icon {
  transform: translateX(4px);
}

.story-recommendation__title {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 var(--v-unit-2) 0;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.story-recommendation__description {
  font-size: 14px;
  margin: 0 0 var(--v-unit-4) 0;
  line-height: 1.6;
  opacity: 0.9;
  flex-grow: 1;
}

.story-recommendation__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--v-unit-3);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: auto;
}

.story-recommendation__time {
  font-size: 12px;
  opacity: 0.85;
  font-weight: 500;
}

.story-recommendation__cta {
  font-size: 13px;
  font-weight: 700;
  opacity: 0.95;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .story-recommendation {
    margin: var(--v-unit-4) 0;
  }

  .story-recommendation__link {
    flex-direction: column;
    min-height: auto;
  }

  .story-recommendation__image-wrapper {
    width: 100%;
    height: 220px;
  }

  .story-recommendation__content {
    padding: var(--v-unit-4);
  }

  .story-recommendation__title {
    font-size: 16px;
  }

  .story-recommendation__description {
    font-size: 13px;
  }

  .story-recommendation__label {
    font-size: 10px;
  }
}
</style>
