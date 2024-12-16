<template>
  <VContainer size="xl" class="characters-page">
    <VText class="characters-page__title" as="h1" variant="header" color="high">
      {{ t('page.characters.h1') }}
    </VText>
    <slot />
  </VContainer>
</template>

<script setup>
  import t from '../../translations'
  import { VText, VContainer } from '@overgaming/vicius'
</script>

<style>
  .characters-page {
    padding: var(--v-unit-8);
  }
  .characters-page__title {
    font-size: 24px;
    text-align: center;
  }
</style>
