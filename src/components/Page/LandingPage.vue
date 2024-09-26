<template>
  <VContainer size="xl" class="landing-page">
    <VContainer class="landing-page__content">
      <div class="landing-page__title">
        <VText as="h1" variant="header">
          {{ landing.title }}
        </VText>
      </div>
      <VText>
        <article v-html="descriptionHtml"></article>
      </VText>
    </VContainer>
    <SectionsDefault :title="`${t('page.landing.stories')}  ${landing.title}`">
      <LandingStories :landing="landing" />
    </SectionsDefault>
  </VContainer>
</template>

<script setup>
  const props = defineProps({
    landing: {
      type: Object,
      default: {}
    }
  })

  import t from '../../translations'
  import { VText, VContainer } from '@overgaming/vicius'
  import LandingStories from '../Sections/LandingStories.vue'
  import SectionsDefault from '../Sections/Default.vue'
  import useLanding from '../../composables/useLanding'

  const { html } = useLanding(props.landing)

  const descriptionHtml = html()
</script>

<style>
  .landing-page {
    padding: var(--v-unit-8);
    display: grid;
    grid-gap: var(--v-unit-4);

    h1,
    h2,
    h3,
    h4,
    h5 {
      font-weight: bold;
      font-size: 1.2rem;
    }
    h1 {
      text-align: center;
      font-size: 1.5rem;
    }

    a {
      text-decoration: underline;
    }
  }

  .landing-page__iframe {
    width: 100%;
    min-height: 40dvh;
    border-radius: var(--v-unit-4);
  }
  .landing-page__content {
    display: grid;
    grid-gap: var(--v-unit-2);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-2);
  }
</style>
