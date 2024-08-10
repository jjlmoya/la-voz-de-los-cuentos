<template>
  <a class="basic-card" :href="`/${isStory ? 'cuento' : 'saga'}/${slug}/`">
    <div class="basic-card__image">
      <VImage
        aspectRatio="1/1"
        :src="`/assets/${isStory ? 'stories' : 'sagas'}/${slug}.png`"
      ></VImage>
    </div>
    <div class="basic-card__content">
      <div class="basic-card__article">
        <VText
          class="basic-card__title"
          variant="header"
          color="primary"
          maxLines="2"
          >{{ title }}</VText
        >
      </div>
    </div>
    <VText variant="body" v-if="time" class="basic-card__time">{{ renderedTime }}</VText>
  </a>
</template>

<script setup>
  import { VImage, VText } from '@overgaming/vicius'
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
    }
  })
  const { getTime } = useStory({ time: props.time })
  const renderedTime = getTime()


</script>

<style scoped>
  .basic-card {
    position: relative;
    display: grid;
    grid-gap: var(--v-unit-2);
  }
  .basic-card__image {
    border-radius: var(--v-unit-2);
    overflow: hidden;
  }
  .basic-card__time {
    position: absolute;
    padding: var(--v-unit-2);
    font-size: 14px;
    right: -4px;
    top: -3px;
    border: 4px solid var(--v-color-surface-mod);
    border-left: none;
    border-bottom: none;
    background-color: var(--v-color-surface);
    border-radius: var(--v-unit-2) 0 var(--v-unit-2)  0;
  }
</style>
