<template>
  <div class="card-hero">
    <VImage
      aspectRatio="16/9"
      :src="`/assets/stories/${story.key}.png`"
    ></VImage>
    <div class="card-hero__content">
      <a class="card-hero__article" :href="`/cuento/${story.key}/`">
        <VText  class="card-hero__title" variant="header" color="primary">{{
          story.name
        }}</VText>
        <VText max-lines="2">{{ story.story }}</VText>
      </a>
    </div>
  </div>
</template>

<script setup>
  import useStories from '../../composables/useStories'
  import { VImage, VText } from '@overgaming/vicius'
  const { getLastStory } = useStories()
  const story = getLastStory()
</script>

<style scoped>
  .card-hero {
    position: relative;
  }

  .card-hero__content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
    top: 0;
    left: 0;
    display: grid;
    align-items: end;
    padding: var(--v-unit-4);
  }
  .card-hero__article {
    display: grid;
    grid-gap: var(--v-unit-2);
  }
  .card-hero__title {
    font-size: 24px;
  }
</style>
