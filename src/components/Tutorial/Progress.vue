<template>
  <VContainer class="tutorial-progress">
    <VText variant="header" class="tutorial-progress__title">
      {{ t('tutorials.progress.title') }}
    </VText>
    <VText class="tutorial-progress__description">
      {{ t('tutorials.progress.description') }}
    </VText>
    <div class="tutorial-progress__content">
      <div
        class="tutorial-progress__entry"
        v-for="progress in [
          {
            key: 'tutorials.progress.toStart',
            value: 0
          },
          {
            key: 'tutorials.progress.started',
            value: 55
          },
          {
            key: 'tutorials.progress.finished',
            value: 100
          }
        ]"
      >
        <BasicCard
          :slug="story.key"
          :key="story.key"
          :title="story.name"
          :time="parseInt(story.time)"
          :progress="progress.value"
          isStory
        />
        <div class="tutorial-progress__overlay">
          <VText variant="header">{{ t(progress.key) }}</VText>
        </div>
        <div class="tutorial-progress__overlay-bar"></div>
      </div>
    </div>
  </VContainer>
</template>

<script setup>
  import t from '../../translations'
  import useStories from '../../composables/useStories'
  import BasicCard from '../Cards/Basic.vue'
  import { VText, VContainer } from '@overgaming/vicius'
  const { getRandomStory } = useStories()

  const story = getRandomStory()
</script>

<style>
  .tutorial-progress {
    display: grid;
    grid-gap: var(--v-unit-4);
    padding: var(--v-unit-4);
   
  }
  .tutorial-progress .basic-card__time {
    display: none;
  }
  .tutorial-progress__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, 210px);
    grid-gap: var(--v-unit-8);
    align-items: center;
    opacity: 0.7;
    padding: var(--v-unit-8);
    border-radius: var(--v-unit-3);
    border-radius: var(--v-unit-2);
    align-items: center;
    justify-content: center;
  }

  .tutorial-progress__entry {
    position: relative;
  }

  .tutorial-progress__overlay {
    position: absolute;
    font-size: 20px;
    top: 0;
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to bottom,
      rgba(242, 242, 242, 0.2),
      rgba(242, 242, 242, 0.9),
      rgba(242, 242, 242, 1),
      rgba(242, 242, 242, 0.8),
      rgba(242, 242, 242, 0.2)
    );
  }

  .tutorial-progress__overlay-bar {
    position: absolute;
    font-size: 20px;
    top: 202px;
    left: -5px;
    width: calc(100% + 8px);
    height: 16px;
    display: grid;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--v-color-primary);
    border-radius: var(--v-unit-1);
    animation: borderColor 3s ease-in-out infinite;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes borderColor {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
