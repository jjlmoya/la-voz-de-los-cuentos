<template>
  <VContainer size="xl" class="newsletter-page">
    <Breadcrumbs :current-page="newsletter.title" />
    <VText class="newsletter-page__title" as="h1">
      {{ newsletter.title }}
    </VText>
    <Spotify v-if="newsletter.spotify" :spotify="newsletter.spotify" />
    <VText>
      <div class="newsletter-page__html" v-html="newsletter.html"></div>
    </VText>
  </VContainer>
</template>

<script setup>
  import { VText, VContainer } from '@overgaming/vicius'
  import Spotify from '../Media/Spotify.vue'
  import { ref } from 'vue'
  import Breadcrumbs from '../Navigation/Breadcrumbs.vue'
  defineProps({
    newsletter: {
      type: Object,
      default: {}
    }
  })
</script>

<style>
  .newsletter-page {
    padding: var(--v-unit-8);
    display: grid;
    grid-gap: var(--v-unit-8);
  }
  .newsletter-page__title {
    font-size: 24px;
  }

  .newsletter-page__html {
    display: grid;
    grid-gap: var(--v-unit-4);
  }
  .newsletter-page h2,
  .newsletter-page h3,
  .newsletter-page h4,
  .newsletter-page h5,
  .newsletter-page h6 {
    padding-top: var(--v-unit-4);
    font-weight: bold;
  }

  .newsletter-page h2 {
    text-align: center;
    font-size: 24px;
  }
  .newsletter-page h3 {
    font-size: 20px;
  }
  .newsletter-page a {
    text-decoration: underline;
    color: var(--v-color-primary);
  }
</style>
