<template>
  <SongList :songs="featuredSongs" />
</template>

<script setup>
import SongList from '../Lists/SongList.vue'
import { getSongs } from '../../data'

const props = defineProps({
  limit: {
    type: Number,
    default: 6
  }
})

const allSongs = getSongs()
const featuredSongs = allSongs.slice(0, props.limit)
</script>
