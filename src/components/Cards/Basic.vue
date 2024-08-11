<template>
  <a
    ref="cardRef"
    class="basic-card"
    :href="`/${isStory ? 'cuento' : 'saga'}/${slug}/`"
  >
    <div class="basic-card__image">
      <img
        :alt="`Imagen de ${title}`"
        v-if="isIntersecting"
        class="basic-card__img"
        :aspectRatio="1/1"
        :src="`/assets/${isStory ? 'stories' : 'sagas'}/${slug}.webp`"
        loading="lazy"
      />
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
import { ref, onMounted, onUnmounted } from 'vue';
import { VText } from '@overgaming/vicius';
import useStory from '../../composables/useStory';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
  time: {
    type: Number,
    default: 0,
  },
  isStory: {
    type: Boolean,
    default: true,
  },
  as :{
    type: String,
    default: 'div'
  }
});

const { getTime } = useStory({ time: props.time });
const renderedTime = getTime();

const cardRef = ref(null);
const isIntersecting = ref(false);

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isIntersecting.value = true;
        observer.unobserve(cardRef.value); 
      }
    },
    {
      threshold: 0.1,
    }
  );

  if (cardRef.value) {
    observer.observe(cardRef.value);
  }
});

onUnmounted(() => {
  if (observer && cardRef.value) {
    observer.unobserve(cardRef.value);
  }
});
</script>


<style scoped>
.basic-card {
  position: relative;
  display: grid;
  background-color: var(--v-color-surface-mod);
  border-radius: var(--v-unit-4);
}
.basic-card__content {
  text-align: center;

  .v-text {
    line-height: 1;
  }
}
.basic-card__image {
  border-radius: var(--v-unit-2);
  overflow: hidden;
  min-height: 100px;
  background-color: var(--v-color-surface-dark);
}

.basic-card__img {
  aspect-ratio: 1 / 1;
  opacity: 0; 
  animation: fade-in 1s ease-in-out forwards;
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
