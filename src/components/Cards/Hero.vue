<template>
  <a :href="toStory(story.key)">
    <VBanner class="card-hero">
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
  </a>
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
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: var(--v-unit-3);
    
    .v-image {
      border-radius: var(--v-unit-3);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 
        0 24px 48px hsla(0, 0%, 0%, 0.2),
        0 12px 24px hsla(0, 0%, 0%, 0.12),
        0 0 40px hsla(var(--v-color-primary-hsl), 0.2);
      
      .v-image {
        transform: scale(1.05);
        filter: brightness(1.1) saturate(1.2);
      }
      
      .card-hero__title {
        text-shadow: 
          0px 0px 15px #dbcb0d,
          0px 0px 25px hsla(var(--v-color-primary-hsl), 0.5);
        transform: translateY(-2px);
      }
    }
    
    &:active {
      transform: translateY(-4px) scale(1.01);
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
      rgba(242, 242, 242, 0.7),
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
    text-shadow: 0px 0px 10px #dbcb0d;
    transition: all 0.3s ease;
  }
</style>
