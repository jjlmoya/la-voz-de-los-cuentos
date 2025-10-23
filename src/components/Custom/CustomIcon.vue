<template>
  <img
    :src="iconPath"
    :alt="alt"
    :class="['custom-icon', `custom-icon--${size}`]"
    :style="customStyle"
    loading="lazy"
    decoding="async"
  />
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      required: true,
      description: 'Icon name (e.g., "welcome", "name", "story")'
    },
    category: {
      type: String,
      default: 'progress',
      description: 'Icon category: progress, themes, or general'
    },
    size: {
      type: String,
      default: 'md',
      description: 'Icon size: xs, sm, md, lg, xl'
    },
    alt: {
      type: String,
      default: 'Icon',
      description: 'Alt text for accessibility'
    },
    color: {
      type: String,
      default: null,
      description: 'Optional filter color (CSS filter)'
    }
  })

  const iconPath = computed(() => {
    return `/assets/custom/icon-${props.name}.webp`
  })

  const customStyle = computed(() => {
    const styles = {}
    if (props.color) {
      styles.filter = `hue-rotate(${props.color})`
    }
    return styles
  })
</script>

<style scoped>
  .custom-icon {
    width: 1em;
    height: 1em;
    display: inline-block;
    object-fit: contain;
  }

  .custom-icon--xs {
    font-size: 16px;
  }

  .custom-icon--sm {
    font-size: 20px;
  }

  .custom-icon--md {
    font-size: 32px;
  }

  .custom-icon--lg {
    font-size: 48px;
  }

  .custom-icon--xl {
    font-size: 96px;
  }
</style>
