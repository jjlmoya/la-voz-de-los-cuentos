<template>
  <VContainer size="xl" class="character-page">
    <div class="character-page__image">
      <VImage
        :src="`/assets/characters/${character.key}.webp`"
        :alt="`Image ${character.name}`"
      />
    </div>
    <div class="character-page__title">
      <VText as="h1" variant="header" color="high">
        {{ character.name }}
      </VText>
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
    padding: var(--v-unit-4);
    display: grid;
    grid-gap: var(--v-unit-2);
  }

  .character-page__title {
    text-align: center;
    font-size: 24px;
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface-high);
    border-radius: var(--v-unit-2) var(--v-unit-2) 0 0;
    z-index: 4;

    @media (width >= 1360px) {
      top: 0;
    }
  }

  .character-page__image {
    position: relative;
    border-radius: var(--v-unit-3);
    overflow: hidden;
  }
</style
