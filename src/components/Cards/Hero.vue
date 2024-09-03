<template>
  <VBanner as="a" class="card-hero" :href="toStory(story.key)">
    <template #image>
      <VImage
        aspectRatio="16/9"
        :src="`/assets/stories/${lang}/${story.key}.webp`"
      ></VImage>
    </template>
    <VBannerContent class="card-hero__content">
      <div class="card-hero__article">
        <VText class="card-hero__title" color="primary" variant="header">{{
          story.name
        }}</VText>
        <VText max-lines="3" variant="label">
          <div v-html="first"></div>
        </VText>
      </div>
    </VBannerContent>
  </VBanner>
</template>

<script setup>
  import { toStory } from '../../router'
  import useStories from '../../composables/useStories'
  import useStory from '../../composables/useStory'
  import { VImage, VText, VBanner, VBannerContent } from '@overgaming/vicius'
  const lang = import.meta.env.PUBLIC_LANG

  const { getLastStory } = useStories()
  const story = getLastStory()
  const { firstParagraph } = useStory(getLastStory())
  const first = firstParagraph()
</script>

<style scoped>
  .card-hero {
    display: block;
    position: relative;
    overflow: hidden;
    .v-image {
      border-radius: var(--v-unit-3);
    }
  }

  .card-hero__content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(242, 242, 242, 0.95),
      rgba(242, 242, 242, 0.8),
      rgba(242, 242, 242, 0.2),
      rgba(242, 242, 242, 0)
    );
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
    text-shadow: 0px 0px 50px white;
  }
</style>
