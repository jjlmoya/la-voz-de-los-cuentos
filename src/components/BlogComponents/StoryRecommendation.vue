<template>
  <div class="story-recommendation" :class="`story-recommendation--${variant}`">
    <a :href="storyLink" class="story-recommendation__link">
      <div class="story-recommendation__content">
        <div class="story-recommendation__header">
          <span class="story-recommendation__label">{{ label }}</span>
          <span class="story-recommendation__icon">→</span>
        </div>
        <h4 class="story-recommendation__title">{{ title }}</h4>
        <p class="story-recommendation__description">{{ description }}</p>
        <div class="story-recommendation__meta">
          <span v-if="duration" class="story-recommendation__time">⏱ {{ duration }} min</span>
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
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Descubre este cuento en nuestra colección'
  },
  duration: {
    type: Number,
    default: null
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success', 'warning'].includes(v)
  },
  label: {
    type: String,
    default: 'Cuento Recomendado'
  }
})

const storyLink = computed(() => toStory(props.slug))

const ctaText = computed(() => {
  return t('blog.readmore', 'Read More')
})
</script>

<style scoped>
.story-recommendation {
  margin: var(--v-unit-4) 0;
  border-radius: var(--v-radius-lg);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.story-recommendation__link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.story-recommendation__link:hover {
  transform: translateY(-2px);
}

.story-recommendation--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.story-recommendation--primary:hover {
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.story-recommendation--secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.story-recommendation--secondary:hover {
  box-shadow: 0 12px 32px rgba(245, 87, 108, 0.4);
}

.story-recommendation--success {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.story-recommendation--success:hover {
  box-shadow: 0 12px 32px rgba(79, 172, 254, 0.4);
}

.story-recommendation--warning {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.story-recommendation--warning:hover {
  box-shadow: 0 12px 32px rgba(250, 112, 154, 0.4);
}

.story-recommendation__content {
  padding: var(--v-unit-4);
  color: white;
}

.story-recommendation__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--v-unit-2);
}

.story-recommendation__label {
  font-size: var(--v-font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.95;
}

.story-recommendation__icon {
  font-size: var(--v-font-size-lg);
  transition: transform 0.3s ease;
}

.story-recommendation__link:hover .story-recommendation__icon {
  transform: translateX(4px);
}

.story-recommendation__title {
  font-size: var(--v-font-size-lg);
  font-weight: 700;
  margin: 0 0 var(--v-unit-2) 0;
  line-height: 1.4;
}

.story-recommendation__description {
  font-size: var(--v-font-size-base);
  margin: 0 0 var(--v-unit-3) 0;
  line-height: 1.6;
  opacity: 0.95;
}

.story-recommendation__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--v-unit-2);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.story-recommendation__time {
  font-size: var(--v-font-size-sm);
  opacity: 0.85;
}

.story-recommendation__cta {
  font-size: var(--v-font-size-sm);
  font-weight: 600;
  opacity: 0.95;
}

@media (max-width: 768px) {
  .story-recommendation__content {
    padding: var(--v-unit-3);
  }

  .story-recommendation__title {
    font-size: var(--v-font-size-base);
  }

  .story-recommendation__description {
    font-size: var(--v-font-size-sm);
  }
}
</style>
