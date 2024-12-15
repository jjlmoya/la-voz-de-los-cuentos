<template>
  <VContainer size="xl" class="character-page">
    <h1 class="character-page__name">
      <div>
        {{ character.order < 10 ? `0${character.order}` : character.order }}
      </div>
      <div>{{ character.name }}</div>
    </h1>
    <div class="character-page__content">
      <div class="character-page__image">
        <VImage
          :src="`/assets/characters/${character.key}.webp`"
          :alt="`Image ${character.name}`"
        />
      </div>
    </div>
  </VContainer>
</template>

<script setup>
  const props = defineProps({
    character: {
      type: Object,
      default: {}
    }
  })

  import { VImage, VText, VContainer } from '@overgaming/vicius'
</script>

<style>
  .character-page {
    padding: var(--v-unit-4) 0;
    display: grid;
    grid-gap: var(--v-unit-2);
  }
  .character-page__content {
    padding: var(--v-unit-4);
  }

  .character-page__name {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: var(--v-unit-4);
    font-size: 24px;
    padding: var(--v-unit-4);
    background-color: black;
    color: white;
    font-weight: bold;

    @media (width >= 1360px) {
      top: 0;
    }
  }

  .character-page__image {
    position: relative;
    border-radius: var(--v-unit-3);
    overflow: hidden;
  }
</style>
