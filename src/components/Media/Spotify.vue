<template>
  <div class="spotify" v-if="spotify">
    <iframe
      class="spotify__iframe"
      :class="{ 'spotify__iframe--active': iframe }"
      title="Spotify Audio Player"
      frameborder="0"
      scrolling="no"
      loading="lazy"
      @load="iframeLoaded"
      :src="`https://podcasters.spotify.com/pod/show/${spotifyID}/embed/episodes/${spotify}`"
    />
    <div v-if="!iframe" class="spotify__loading"></div>
    <div
      :class="{ 'spotify__mask--animation': iframe }"
      class="spotify__mask"
    ><VText variant="label">Voice</VText></div>
  </div>
</template>

<script setup>
  const spotifyID = import.meta.env.PUBLIC_SPOTIFY_USER
  import { ref } from 'vue'
  import { VText } from '@overgaming/vicius'
  const iframe = ref(false)

  const iframeLoaded = () => {
    iframe.value = true
  }
  defineProps({
    spotify: {
      type: String,
      default: ''
    }
  })
</script>

<style>
  .spotify {
    border-radius: var(--v-unit-2);
    overflow: hidden;
    position: relative;
    max-height: 150px;
    iframe {
      width: 100%;
      min-height: 600px;
    }
  }

  .spotify__mask {
    position: absolute;
    top: 0;
    right: 0;
    height: 150px;
    width: 100%;
    bottom: 0;
    background-color: white;
    z-index: 10;
    display: grid;
    justify-content: center;
    align-items: center;
    color: #9691ff;
  }

  .spotify__iframe {
    opacity: 0;
    background-color: white;
  }

  .spotify__iframe--active {
    opacity: 1;
    animation: opacity-in 0.3s ease-in forwards;
    animation-delay: 150ms;
  }
  .spotify__mask--animation {
    animation: fold 0.3s ease-in forwards;
    animation-delay: 250ms;
  }

  .newsletter-page__loading {
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
    100% {
      width: 100px;
    }
  }

  @keyframes opacity-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 831px) {
    .spotify {
      max-height: 96px;
    }
    .spotify__mask {
      height: 96px;
    }
    .spotify iframe {
      height: 96px;
    }
  }
</style>
