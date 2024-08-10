<template>
  <VContainer class="story-page">
    <div class="story-page__image" v-if="!story.youtube">
      <VImage
        :src="`/assets/stories/${story.key}.png`"
        :alt="`Imagen de portada del cuento ${story.name}`"
      />
    </div>
    <div class="story-page__video" v-if="story.youtube">
      <lite-youtube :videoid="story.youtube" :playlabel="story.name" />
    </div>
    b
    {{ story.name }}
    {{ story.key }}
    b
  </VContainer>
</template>

<script setup>
  import { VImage, VText, VContainer } from '@overgaming/vicius'

  defineProps({
    story: {
      type: Object,
      default: {}
    }
  })
</script>

<style scoped>
  .story-page {
  }

  .story-page__image {
    border-radius: var(--v-unit-3);
    overflow: hidden;
  }
</style>
