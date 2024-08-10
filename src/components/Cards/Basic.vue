<template>
  <div class="basic-card">
    <div class="basic-card__image">
      <VImage aspectRatio="1/1" :src="`/assets/${path}/${image}.png`"></VImage>
    </div>
    <div class="card-hero__content">
      <div class="card-hero__article">
        <VText
          class="card-hero__title"
          variant="header"
          color="primary"
          maxLines="2"
          >{{ title }}</VText
        >
      </div>
    </div>
  </div>
</template>

<script setup>
  import { VImage, VText } from '@overgaming/vicius'
  defineProps({
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: 'stories'
    }
  })
</script>

<style scoped>
  .basic-card {
    display: grid;
    grid-gap: var(--v-unit-2);
  }
  .basic-card__image {
    border-radius: var(--v-unit-2);
    overflow: hidden;
  }
</style>
