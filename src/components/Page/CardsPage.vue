<template>
  <VContainer size="xl" class="card-page">
    <VContainer class="card-page__content">
      <div class="card-page__title">
        <VText as="h1" variant="header"> Temp Card Page </VText>
      </div>
      <SectionsDefault title="Debug Paquetes">
        <VButton variant="primary" class="card-page__cards">
            Get
        </VButton>
      </SectionsDefault>
      <SectionsDefault title="List Obtained Cards">
        <div class="card-page__cards">
          <Card
            v-for="card in cards"
            size="xs"
            :card="card"
          />
        </div>
      </SectionsDefault>
    </VContainer>
  </VContainer>
</template>

<script setup>
  import useCards from '../../composables/useCards'
  import Card from '../TGC/Card.vue'
  import { VText, VContainer, VButton } from '@overgaming/vicius'
  import SectionsDefault from '../Sections/Default.vue'
  const { getAll } = useCards()
  const cards = getAll()
  const lang = import.meta.env.PUBLIC_LANG
</script>

<style>
  .card-page {
    padding: var(--v-unit-8);
    display: grid;
    grid-gap: var(--v-unit-4);
  }
  .card-page__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: var(--v-unit-10);
  }

  .card-page__content {
    display: grid;
    grid-gap: var(--v-unit-2);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-2);
  }
</style>
