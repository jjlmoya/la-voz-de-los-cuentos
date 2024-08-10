<template>
  <VContainer size="xl" class="stories-page">
    <VText class="stories-page__title" as="h1" variant="header">Listado de Cuentos</VText>
    <SectionsDefault>
      <FilteredStories/>
    </SectionsDefault>
  </VContainer>
</template>

<script setup>
  import SectionsDefault from '../../components/Sections/Default.vue'
  import FilteredStories from '../../components/Sections/FilteredStories.vue'

  const props = defineProps({
    story: {
      type: Object,
      default: {}
    }
  })

  import { VText, VContainer } from '@overgaming/vicius'
</script>

<style>
  .stories-page {
    padding: var(--v-unit-4)
  }
  .stories-page__title {
    font-size: 24px;
    text-align: center;
  }
</style>

