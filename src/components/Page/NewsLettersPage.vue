<template>
  <VContainer size="xl" class="newsletters-page">
    <VText class="newsletters-page__title" as="h1" variant="header"
      >News Audio Letters</VText
    >
    <SectionsDefault>
      <NewsLetters />
    </SectionsDefault>
  </VContainer>
</template>

<script setup>
  import SectionsDefault from '../../components/Sections/NewsLetters.vue'
  import { VText, VContainer } from '@overgaming/vicius'
  import NewsLetters from '../Sections/NewsLetters.vue'
</script>

<style>
  .newsletters-page {
    min-height: 70vh;
    padding: var(--v-unit-8);
  }
  .newsletters-page__title {
    font-size: 24px;
    text-align: center;
  }
</style>
