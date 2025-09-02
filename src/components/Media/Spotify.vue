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
    <div v-if="!iframe" class="spotify__loading">
      <div class="music-spinner">
        <div class="music-note note-1">🎵</div>
        <div class="music-note note-2">🎶</div>
        <div class="music-note note-3">🎼</div>
      </div>
    </div>
    <div :class="{ 'spotify__mask--animation': iframe }" class="spotify__mask">
      <VText variant="label">{{ t('spotify.voice') }}</VText>
    </div>
  </div>
</template>

<script setup>
  const spotifyID = import.meta.env.PUBLIC_SPOTIFY_USER
  import t from '../../translations'
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

  .spotify__loading {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      hsl(280, 50%, 95%) 0%, 
      hsl(290, 60%, 97%) 100%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .music-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--v-unit-2);
  }

  .music-note {
    font-size: 2rem;
    animation: music-bounce 1.4s infinite ease-in-out;
  }

  .note-1 {
    animation-delay: 0s;
  }

  .note-2 {
    animation-delay: 0.2s;
  }

  .note-3 {
    animation-delay: 0.4s;
  }

  @keyframes music-bounce {
    0%, 40%, 100% {
      transform: translateY(0) scale(1) rotate(0deg);
      opacity: 0.7;
    }
    20% {
      transform: translateY(-15px) scale(1.2) rotate(10deg);
      opacity: 1;
    }
  }
  @keyframes fold {
    0% {
      width: 100%;
    }
    100% {
      width: 30%;
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
