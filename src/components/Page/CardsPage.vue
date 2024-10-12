<template>
  <VContainer class="card-page">
      <div class="card-page__title">
        <VText as="h1" variant="header"> Temp Card Page </VText>
      </div>
      <SectionsDefault title="Debug Paquetes">
        <VButton @click="openBoosterPack" variant="primary" class="card-page__cards">
            Get
        </VButton>
      </SectionsDefault>
      <SectionsDefault title="Album">
        <div class="card-page__cards">
          <Card
            v-for="card in cards"
            size="md"
            :card="card"
          />
        </div>
      </SectionsDefault>
  </VContainer>
  <BoosterPack />
</template>

<script setup>
  import useCards from '../../composables/useCards'
  import Card from '../TGC/Card.vue'
  import BoosterPack from '../TGC/BoosterPack.vue'
  import { VText, VContainer, VButton } from '@overgaming/vicius'
  import SectionsDefault from '../Sections/Default.vue'
  const { getAll } = useCards()
  const cards = getAll()

  const openBoosterPack = () => {

  }
</script>

<style>
  .card-page {
    padding: var(--v-unit-8);
    display: grid;
    grid-gap: var(--v-unit-4);
  }
  .card-page__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-gap: 12px;
  }

  .card-page__content {
    display: grid;
    grid-gap: var(--v-unit-2);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-2);
  }
</style>
