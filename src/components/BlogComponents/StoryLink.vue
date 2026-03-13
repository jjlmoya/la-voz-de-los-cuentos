<template>
  <a :href="storyUrl" class="story-link" :title="title">
    <span class="story-link__text">{{ title }}</span>
    <span class="story-link__icon">→</span>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { toStory } from '../../router'

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const storyUrl = computed(() => toStory(props.slug))
</script>

<style scoped>
.story-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.story-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.story-link__text {
  transition: all 0.3s ease;
}

.story-link__icon {
  font-size: 12px;
  transition: transform 0.3s ease;
  opacity: 0.8;
}

.story-link:hover .story-link__icon {
  transform: translateX(3px);
  opacity: 1;
}

@media (max-width: 640px) {
  .story-link {
    padding: 3px 8px;
    font-size: 13px;
  }
}
</style>
