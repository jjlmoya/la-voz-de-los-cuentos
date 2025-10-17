<template>
  <VContainer size="xl" class="song-page">
    <Breadcrumbs
      :current-page="song.name"
      :saga-name="currentSaga?.name"
      :saga-key="currentSaga?.key"
    />

    <!-- Language Switcher -->
    <LanguageSwitcher
      :order="song.order"
      type="song"
      class="song-page__language-switcher"
    />

    <h1 class="song-page__title">{{ song.name }}</h1>

    <div class="song-page__layout">
      <div class="song-page__main">
        <div class="song-page__video-container">
          <div :id="`youtube-player-${song.key}`" class="song-page__video"></div>
        </div>

        <!-- Karaoke mode: mostrar solo si hay syncedLyrics -->
        <div v-if="song.syncedLyrics && song.syncedLyrics.length > 0" class="song-page__karaoke">
          <h2 class="song-page__karaoke-title">{{ t('page.song.lyrics') }}</h2>
          <div class="song-page__karaoke-content">
            <div
              v-for="(line, index) in song.syncedLyrics"
              :key="index"
              :class="{
                'song-page__karaoke-line': true,
                'song-page__karaoke-line--active': isLineActive(line)
              }"
            >
              {{ line.text }}
            </div>
          </div>
        </div>

        <div class="song-page__controls-section">
          <button
            @click="toggleRepeat"
            :class="{ 'active': isRepeat }"
            class="song-page__control"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            <span>{{ t('page.song.repeat') }}</span>
          </button>

          <button
            @click="toggleAutoplay"
            :class="{ 'active': isAutoplay }"
            class="song-page__control"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3l14 9-14 9V3z"/>
              <path d="M19 3v18"/>
            </svg>
            <span>{{ t('page.song.autoplay') }}</span>
          </button>

          <button
            @click="toggleShuffle"
            :class="{ 'active': isShuffle }"
            class="song-page__control"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
            <span>{{ t('page.song.shuffle') }}</span>
          </button>
        </div>

        <div v-if="relatedStory" class="song-page__story-card">
          <a :href="toStory(relatedStory.key)" class="song-page__story-link">
            <div class="song-page__story-image">
              <img :src="`/assets/stories/${lang}/${relatedStory.key}.webp`" :alt="relatedStory.name" />
            </div>
            <div class="song-page__story-info">
              <span class="song-page__story-label">{{ t('page.song.readStory') }}</span>
              <h3 class="song-page__story-title">{{ relatedStory.name }}</h3>
            </div>
            <svg class="song-page__story-arrow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </a>
        </div>

        <div v-if="song.lyrics && (!song.syncedLyrics || song.syncedLyrics.length === 0)" class="song-page__lyrics">
          <h2 class="song-page__lyrics-title">{{ t('page.song.lyrics') }}</h2>
          <div class="song-page__lyrics-content" v-html="lyricsHTML" />
        </div>
      </div>

      <div class="song-page__playlist">
        <VText variant="subtitle" color="high" class="song-page__playlist-title">
          {{ t('page.song.playlist') }}
        </VText>

        <div class="song-page__playlist-items">
          <div
            v-for="(item, index) in allSongs"
            :key="item.key"
            :class="{
              'song-page__playlist-item--active': item.key === song.key,
              'song-page__playlist-item--playing': isPlaying && item.key === song.key
            }"
            class="song-page__playlist-item"
            @click="navigateToSong(item.key)"
          >
            <div class="song-page__playlist-number">
              <span v-if="!isPlaying || item.key !== song.key">{{ index + 1 }}</span>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1">
                  <animate attributeName="height" values="4;16;4" dur="1.2s" repeatCount="indefinite" begin="0s"/>
                  <animate attributeName="y" values="10;4;10" dur="1.2s" repeatCount="indefinite" begin="0s"/>
                </rect>
                <rect x="14" y="4" width="4" height="16" rx="1">
                  <animate attributeName="height" values="16;4;16" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
                  <animate attributeName="y" values="4;10;4" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
                </rect>
              </svg>
            </div>

            <div class="song-page__playlist-cover">
              <img
                :src="`/assets/stories/${lang}/${item.key}.webp`"
                :alt="item.name"
              />
            </div>

            <div class="song-page__playlist-info">
              <VText variant="body" color="high">{{ item.name }}</VText>
            </div>
          </div>
        </div>
      </div>
    </div>
  </VContainer>
</template>

<script setup>
import { VText, VButton, VContainer } from '@overgaming/vicius'
import Breadcrumbs from '../Navigation/Breadcrumbs.vue'
import LanguageSwitcher from '../Navigation/LanguageSwitcher.vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import t from '../../translations'
import { toSong, toStory } from '../../router'
import useSong from '../../composables/useSong'

const lang = import.meta.env.PUBLIC_LANG

const extractYoutubeId = (url) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : url
}

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  allSongs: {
    type: Array,
    default: () => []
  },
  currentSaga: {
    type: Object,
    default: null
  },
  relatedStory: {
    type: Object,
    default: null
  }
})

const isRepeat = ref(false)
const isAutoplay = ref(true)
const isShuffle = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
let player = null
let timeUpdateInterval = null
let songTracker = null

const lyricsHTML = computed(() => {
  if (!props.song.lyrics) return ''

  return props.song.lyrics
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\n{3,}/g, '\n\n') 
    .replace(/\n/g, '<br>')
})

const isLineActive = (line) => {
  return currentTime.value >= line.start && currentTime.value < line.end
}

watch(currentTime, () => {
  if (!props.song.syncedLyrics || props.song.syncedLyrics.length === 0) return

  const activeIndex = props.song.syncedLyrics.findIndex(line => isLineActive(line))
  if (activeIndex !== -1) {
    const karaokeContent = document.querySelector('.song-page__karaoke-content')
    const activeLine = document.querySelectorAll('.song-page__karaoke-line')[activeIndex]

    if (karaokeContent && activeLine) {
      const containerTop = karaokeContent.scrollTop
      const containerHeight = karaokeContent.clientHeight
      const lineTop = activeLine.offsetTop - karaokeContent.offsetTop
      const lineHeight = activeLine.clientHeight

      const scrollTo = lineTop - (containerHeight / 2) + (lineHeight / 2)

      if (lineTop < containerTop || lineTop + lineHeight > containerTop + containerHeight) {
        karaokeContent.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        })
      }
    }
  }
})

const startTimeTracking = () => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
  }

  timeUpdateInterval = setInterval(() => {
    if (player && typeof player.getCurrentTime === 'function') {
      currentTime.value = player.getCurrentTime()
    }
  }, 100)
}

const toggleRepeat = () => {
  isRepeat.value = !isRepeat.value
  if (isRepeat.value) {
    isAutoplay.value = false
    isShuffle.value = false
  }
}

const toggleAutoplay = () => {
  isAutoplay.value = !isAutoplay.value
  if (isAutoplay.value) {
    isRepeat.value = false
  }
}

const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
  if (isShuffle.value) {
    isRepeat.value = false
  }
}

const handleSongEnded = () => {
  if (isRepeat.value) {
    player?.playVideo()
  } else if (isAutoplay.value) {
    playNextSong()
  }
}

const playNextSong = () => {
  const currentIndex = props.allSongs.findIndex(s => s.key === props.song.key)

  if (isShuffle.value) {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * props.allSongs.length)
    } while (randomIndex === currentIndex && props.allSongs.length > 1)

    const randomSong = props.allSongs[randomIndex]
    navigateToSong(randomSong.key)
  } else if (currentIndex !== -1) {
    if (currentIndex < props.allSongs.length - 1) {
      const nextSong = props.allSongs[currentIndex + 1]
      navigateToSong(nextSong.key)
    } else {
      const firstSong = props.allSongs[0]
      navigateToSong(firstSong.key)
    }
  }
}

const navigateToSong = (key) => {
  window.location.href = toSong(key)
}

const initYouTubePlayer = () => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = createPlayer
  } else {
    createPlayer()
  }
}

const createPlayer = () => {
  const videoId = extractYoutubeId(props.song.song)
  player = new window.YT.Player(`youtube-player-${props.song.key}`, {
    videoId: videoId,
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 1,
      cc_load_policy: 1
    },
    events: {
      onReady: (event) => {
        window.__ytPlayer = event.target
        startTimeTracking()
      },
      onStateChange: (event) => {
        if (event.data === window.YT.PlayerState.ENDED) {
          handleSongEnded()
          // Song finished - capture completedAt timestamp
          if (songTracker) {
            songTracker.onSongEnd()
          }
        }
        if (event.data === window.YT.PlayerState.PLAYING) {
          isPlaying.value = true
          startTimeTracking()
          // Song started playing - capture startedAt timestamp
          if (songTracker) {
            songTracker.onSongStart()
          }
        }
        if (event.data === window.YT.PlayerState.PAUSED) {
          if (timeUpdateInterval) {
            clearInterval(timeUpdateInterval)
          }
          // Song paused - stop tracking listen time
          if (songTracker) {
            songTracker.onSongPause()
          }
        }
      }
    }
  })
}

onMounted(() => {
  isPlaying.value = true

  const savedRepeat = localStorage.getItem('songRepeat')
  const savedAutoplay = localStorage.getItem('songAutoplay')
  const savedShuffle = localStorage.getItem('songShuffle')

  if (savedRepeat !== null) {
    isRepeat.value = savedRepeat === 'true'
  }
  if (savedAutoplay !== null) {
    isAutoplay.value = savedAutoplay === 'true'
  }
  if (savedShuffle !== null) {
    isShuffle.value = savedShuffle === 'true'
  }

  // Initialize song tracking with timestamps (will be called in player events)
  songTracker = useSong(props.song)

  initYouTubePlayer()
})

const savePreferences = () => {
  localStorage.setItem('songRepeat', isRepeat.value)
  localStorage.setItem('songAutoplay', isAutoplay.value)
  localStorage.setItem('songShuffle', isShuffle.value)
}

watch([isRepeat, isAutoplay, isShuffle], savePreferences)

onUnmounted(() => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
  }
  if (songTracker) {
    songTracker.cleanup()
  }
})
</script>

<style>
.song-page {
  padding: var(--v-unit-6) var(--v-unit-4);
  background: linear-gradient(180deg,
    rgba(var(--v-color-primary-rgb), 0.05) 0%,
    transparent 100%);

  @media (max-width: 768px) {
    padding: var(--v-unit-4) var(--v-unit-2);
  }
}

.song-page__title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: var(--v-color-text-high);
  text-align: center;
  margin: 0 0 var(--v-unit-8) 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.2;
}

.song-page__layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--v-unit-8);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--v-unit-6);
  }
}

.song-page__main {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-6);
}

.song-page__video-container {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--v-radius-xl);
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0,0,0,0.3),
    0 0 0 4px rgba(var(--v-color-primary-rgb), 0.2);
  border: 4px solid var(--v-color-primary);
  background: #000;
  animation: videoAppear 0.6s ease-out;

  @keyframes videoAppear {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.song-page__video {
  width: 100%;
  height: 100%;
}

.song-page__karaoke {
  background: white;
  border: 3px solid var(--v-color-primary);
  border-radius: var(--v-radius-xl);
  padding: var(--v-unit-6);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: var(--v-unit-4);
  }
}

.song-page__karaoke-title {
  font-size: var(--v-font-size-xl);
  font-weight: 700;
  color: var(--v-color-primary);
  margin: 0 0 var(--v-unit-4) 0;
  text-align: center;
}

.song-page__karaoke-content {
  max-width: 65ch;
  margin: 0 auto;
  max-height: 400px;
  overflow-y: auto;
  padding: var(--v-unit-2);

  @media (max-width: 768px) {
    max-height: 300px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--v-color-background-soft);
    border-radius: var(--v-radius-sm);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--v-color-primary);
    border-radius: var(--v-radius-sm);

    &:hover {
      background: var(--v-color-accent-primary);
    }
  }
}

.song-page__karaoke-line {
  font-size: clamp(18px, 2.5vw, 20px);
  line-height: 1.6;
  color: var(--v-color-text-medium);
  padding: var(--v-unit-3) var(--v-unit-4);
  margin-bottom: var(--v-unit-2);
  border-radius: var(--v-radius-lg);
  transition: all 0.3s ease;
  opacity: 0.4;
  text-align: center;
  white-space: pre-line;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: var(--v-unit-2) var(--v-unit-3);
  }
}

.song-page__karaoke-line--active {
  opacity: 1;
  font-size: clamp(22px, 3vw, 26px);
  font-weight: 700;
  color: var(--v-color-primary);
  background: linear-gradient(135deg,
    rgba(var(--v-color-primary-rgb), 0.1),
    rgba(var(--v-color-accent-primary-rgb), 0.1));
  border: 2px solid var(--v-color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-color-primary-rgb), 0.25);
  animation: karaoke-highlight 0.3s ease-out;

  @media (max-width: 768px) {
    font-size: 18px;
    transform: translateY(-1px);
  }
}

@keyframes karaoke-highlight {
  0% {
    transform: translateY(0) scale(0.98);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-3px) scale(1.01);
  }
  100% {
    transform: translateY(-2px) scale(1);
    opacity: 1;
  }
}

.song-page__controls-section {
  display: flex;
  justify-content: center;
  gap: var(--v-unit-4);
  flex-wrap: wrap;
}

.song-page__control {
  display: flex;
  align-items: center;
  gap: var(--v-unit-2);
  padding: var(--v-unit-3) var(--v-unit-6);
  background: white;
  border: 3px solid var(--v-color-primary);
  border-radius: var(--v-radius-xl);
  font-size: var(--v-font-size-md);
  font-weight: 700;
  color: var(--v-color-primary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 4px 12px rgba(var(--v-color-primary-rgb), 0.2);

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    stroke: currentColor;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 24px rgba(var(--v-color-primary-rgb), 0.4);
    background: rgba(var(--v-color-primary-rgb), 0.1);
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  &.active {
    background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
    color: white;
    border-color: var(--v-color-accent-primary);
    animation: pulse 2s ease-in-out infinite;

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(var(--v-color-primary-rgb), 0.7); }
      50% { box-shadow: 0 0 0 10px rgba(var(--v-color-primary-rgb), 0); }
    }
  }
}

.song-page__story-card {
  background: white;
  border-radius: var(--v-radius-xl);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 3px solid var(--v-color-primary);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(var(--v-color-primary-rgb), 0.3);
  }
}

.song-page__story-link {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  gap: var(--v-unit-4);
  padding: var(--v-unit-4);
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr auto;
    gap: var(--v-unit-3);
  }
}

.song-page__story-image {
  width: 120px;
  height: 120px;
  border-radius: var(--v-radius-lg);
  overflow: hidden;
  box-shadow: var(--v-shadow-md);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.song-page__story-info {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
}

.song-page__story-label {
  font-size: var(--v-font-size-sm);
  font-weight: 600;
  color: var(--v-color-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.song-page__story-title {
  font-size: var(--v-font-size-xl);
  font-weight: 700;
  color: var(--v-color-text-high);
  margin: 0;
}

.song-page__story-arrow {
  width: 32px;
  height: 32px;
  fill: var(--v-color-primary);
  flex-shrink: 0;
}

.song-page__lyrics {
  background-color: var(--v-color-surface-high);
  padding: var(--v-unit-4) var(--v-unit-6);
  border-radius: var(--v-radius-lg);
  box-shadow: var(--v-shadow-md);
  border: 1px solid var(--v-color-primary);
  margin-top: var(--v-unit-4);
}

.song-page__lyrics-title {
  font-size: var(--v-font-size-xl);
  font-weight: 700;
  color: var(--v-color-primary);
  margin: 0 0 var(--v-unit-4) 0;
  text-align: center;
}

.song-page__lyrics-content {
  max-width: 65ch;
  margin: 0 auto;
  line-height: 1.6;
  color: var(--v-color-text-high);
  font-size: clamp(18px, 3vw, 20px);
  text-align: center;
  white-space: pre-line;
  font-weight: 400;
}

.song-page__playlist {
  background: var(--v-color-surface-high);
  border-radius: var(--v-radius-lg);
  padding: var(--v-unit-4);
  box-shadow: var(--v-shadow-md);
  height: fit-content;
  position: sticky;
  top: var(--v-unit-8);

  @media (max-width: 1024px) {
    position: static;
  }
}

.song-page__playlist-title {
  margin-bottom: var(--v-unit-4);
  padding-bottom: var(--v-unit-3);
  border-bottom: 2px solid var(--v-color-primary);
}

.song-page__playlist-items {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
  max-height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--v-color-background-soft);
    border-radius: var(--v-radius-sm);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--v-color-primary);
    border-radius: var(--v-radius-sm);

    &:hover {
      background: var(--v-color-accent-primary);
    }
  }
}

.song-page__playlist-item {
  display: grid;
  grid-template-columns: 30px 60px 1fr;
  gap: var(--v-unit-3);
  padding: var(--v-unit-2);
  border-radius: var(--v-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;

  &:hover {
    background: var(--v-color-background-soft);
    transform: translateX(4px);
  }
}

.song-page__playlist-item--active {
  background: linear-gradient(135deg, var(--v-color-primary) 0%, var(--v-color-accent-primary) 100%);

  .song-page__playlist-number,
  .v-text {
    color: white;
  }

  &:hover {
    transform: translateX(4px);
    opacity: 0.9;
  }
}

.song-page__playlist-item--playing {
  .song-page__playlist-number svg {
    color: white;
  }
}

.song-page__playlist-number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--v-color-text-medium);
  font-size: var(--v-font-size-sm);

  svg {
    width: 20px;
    height: 20px;
    color: var(--v-color-primary);
  }
}

.song-page__playlist-cover {
  width: 60px;
  height: 60px;
  border-radius: var(--v-radius-sm);
  overflow: hidden;
  box-shadow: var(--v-shadow-sm);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.song-page__playlist-info {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-1);
  min-width: 0;

  .v-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media print {
  .song-page__playlist,
  .song-page__controls,
  .song-page__player {
    display: none;
  }
}
</style>
