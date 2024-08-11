<template>
  <VContainer size="xl" class="newsletter-page">
    <VText class="newsletter-page__title" as="h1">
      {{ newsletter.title }}
    </VText>
    <div class="newsletter-page__audio" v-if="newsletter.spotify">
      <iframe
        frameborder="0"
        scrolling="no"
        loading="lazy"
        @load="iframeLoaded"
        :src="`https://podcasters.spotify.com/pod/show/lavozdeloscuentos/embed/episodes/${newsletter.spotify}`"
      />
      <div v-if="!iframe" class="newsletter-page__audio-loading"></div>
      <div v-if="iframe" class="newsletter-page__audio-hide"></div>
    </div>
    <VText>
      <div class="newsletter-page__html" v-html="newsletter.html"></div>
    </VText>
  </VContainer>
</template>

<script setup>
  import { VText, VContainer } from '@overgaming/vicius'
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

  .newsletter-page__audio {
    border-radius: var(--v-unit-2);
    overflow: hidden;
    position: relative;
    height: 150px;
    iframe {
      width: 100%;
      min-height: 600px;
    }
  }

  .newsletter-page__audio-hide {
    position: absolute;
    top: 0;
    right: 0;
    height: 150px;
    width: 100%;
    bottom: 0;
    background-color: white;
    z-index: 10;
    animation: fold 0.9s ease-in forwards;
  }

  .newsletter-page__audio-loading {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    content: ' ';
    z-index: 10;
  }
  @keyframes fold {
    0% {
      width: 100%;
    }
    99% {
      width: 150px;
    }
    100% {
      width: 150px;
    }
  }
</style>
