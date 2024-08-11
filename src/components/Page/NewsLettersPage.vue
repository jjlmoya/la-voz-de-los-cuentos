<template>
  <VContainer size="xl" class="newsletters-page">
    <VText class="stories-page__title" as="h1" variant="header">News Audio Letters</VText>
    <SectionsDefault>
      <NewsLetters />
    </SectionsDefault>
  </VContainer>
</template>

<script setup>
  import SectionsDefault from '../../components/Sections/NewsLetters.vue'
  import { VText, VContainer } from '@overgaming/vicius'
</script>

<style>
  .newsletters-page {
    padding: var(--v-unit-4)
  }
  .newsletters-page__title {
    font-size: 24px;
    text-align: center;
  }
</style>

