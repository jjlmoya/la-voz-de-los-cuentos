<template>
  <div class="song-list">
    <SongCard
      v-for="(song, index) in songs"
      :key="song.key"
      :song="song"
      :style="{ 'animation-delay': `${index * 0.05}s` }"
      @click="handleSongClick"
    />
  </div>
</template>

<script setup>
import SongCard from '../Cards/SongCard.vue'
import { toSong } from '../../router'

const props = defineProps({
  songs: {
    type: Array,
    required: true
  }
})

const handleSongClick = (songKey) => {
  window.location.href = toSong(songKey)
}
</script>

<style scoped>
.song-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--v-unit-8);
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--v-unit-6);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--v-unit-4);
  }
}
</style>
