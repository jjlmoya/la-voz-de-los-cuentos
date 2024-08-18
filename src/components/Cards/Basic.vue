<template>
  <a ref="cardRef" class="basic-card" :href="toStory(slug)">
    <div class="basic-card__image">
      <img
        :alt="`Imagen de ${title}`"
        v-if="isIntersecting"
        class="basic-card__img"
        :aspectRatio="1/1"
        :src="`/assets/${isStory ? 'stories' : 'sagas'}/${lang}/${slug}.webp`"
        loading="lazy"
      />
      <div class="basic-card__progress">
        <div :style="{width: `${status.current || 0}%`}" class="basic-card__progress-complete"></div>
      </div>
    </div>
    <div class="basic-card__content">
      <div class="basic-card__article">
        <VText
          class="basic-card__title"
          variant="header"
          color="primary"
          maxLines="2"
          :as="as"
        >
          {{ title }}
        </VText>
      </div>
    </div>
    <VText variant="body" v-if="time" class="basic-card__time">
      {{ renderedTime }}
    </VText>
  </a>
</template>

<script setup>
  const lang = import.meta.env.PUBLIC_LANG
  import { toStory } from '../../router'
  import { ref, onMounted, onUnmounted } from 'vue'
  import { VText } from '@overgaming/vicius'
  import useStory from '../../composables/useStory'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    },
    isStory: {
      type: Boolean,
      default: true
    },
    as: {
      type: String,
      default: 'div'
    }
  })

  const { getTime, getCurrentStatus } = useStory({ key: props.slug, time: props.time })
  const renderedTime = getTime()
  const cardRef = ref(null)
  const status = ref({})
  const isIntersecting = ref(false)

  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isIntersecting.value = true
          observer.unobserve(cardRef.value)
        }
      },
      {
        threshold: 0.1
      }
    )

    if (cardRef.value) {
      observer.observe(cardRef.value)
    }

    status.value = getCurrentStatus()
  })

  onUnmounted(() => {
    if (observer && cardRef.value) {
      observer.unobserve(cardRef.value)
    }
  })
</script>

<style scoped>
  .basic-card {
    position: relative;
    padding-bottom: var(--v-unit-2);

    .v-image{
          border-radius: var(--v-unit-3);
    }
  }
  .basic-card__content {
    text-align: center;

    .v-text {
      line-height: 1.2;
      padding-bottom: var(--v-unit-05)
    }
  }
  .basic-card__image {
    position: relative;
  }

  .basic-card__img {
    aspect-ratio: 1 / 1;
    opacity: 0;
    animation: fade-in 1s ease-in-out forwards;
  }

  .basic-card__progress {
    background-color: var(--v-color-surface-high);
    width: 100%;
    height: 5px;
    position: absolute;
    bottom: 5px;
  }

  .basic-card__progress-complete {
    background-color: var(--v-color-error);
    height: 5px;
    transition: width 2s ease-in-out;
    transition-delay: 2s;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .basic-card__time {
    position: absolute;
    padding: var(--v-unit-2);

    font-size: 14px;
    right: -5px;
    top: -4px;
    border: 4px solid var(--v-color-primary);
    border-left: none;
    border-bottom: none;
    background-color: var(--v-color-surface);
    border-radius: var(--v-unit-2) 0 var(--v-unit-2) 0;
  }
</style>
