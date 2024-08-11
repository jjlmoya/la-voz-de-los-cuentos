<template>
  <VContainer size="xl" class="newsletter-page">
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
  defineProps({
    newsletter: {
      type: Object,
      default: {}
    }
  })
  const iframe = ref(false)
  const iframeLoaded = () => {
    iframe.value = true
  }
</script>

<style scoped>
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
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding-top: var(--v-unit-4);
      font-weight: bold;
    }
    h2 {
      text-align: center;
      font-size: 24px;
    }
    h3 {
      font-size: 20px;
    }
    a {
      text-decoration: underline;
      color: var(--v-color-primary);
    }
  }
</style>
