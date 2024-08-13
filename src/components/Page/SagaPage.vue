<template>
  <VContainer size="xl" class="saga-page">
    <iframe
      v-if="saga.youtube"
      class="saga-page__iframe"
      :src="`https://www.youtube.com/embed/videoseries?list=${saga.youtube}`"
      :title="`Saga Playlist: ${saga.name}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>
    <VContainer class="saga-page__content">
      <div class="saga-page__title">
        <VText as="h1" variant="header">
          {{ saga.name }}
        </VText>
      </div>
      <VText>
        <article v-html="descriptionHtml"></article>
      </VText>
    </VContainer>
    <SectionsDefault :title="`${t('page.saga.stories')}(${totalTime})`">
      <SagaStories :saga="saga" />
    </SectionsDefault>
  </VContainer>
</template>

<script setup>
  const props = defineProps({
    saga: {
      type: Object,
      default: {}
    }
  })

  import t from '../../translations'
  import useSaga from '../../composables/useSaga'
  import { VText, VContainer } from '@overgaming/vicius'
  import SagaStories from '../Sections/SagaStories.vue'
  import SectionsDefault from '../Sections/Default.vue'
  const { getTime, html } = useSaga(props.saga)
  const totalTime = getTime()
  const descriptionHtml = html()
</script>

<style>
  .saga-page {
    padding: var(--v-unit-8);
    display: grid;
    grid-gap: var(--v-unit-4);
  }

  .saga-page__iframe {
    width: 100%;
    min-height: 40dvh;
    border-radius: var(--v-unit-4);
  }
  .saga-page__content {
    display: grid;
    grid-gap: var(--v-unit-2);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-2);
  }
</style>
