<template>
  <div class="sections-filtered-character">
    <VContainer class="sections-fildered-character__search-bar" size="xs">
      <VInput
        type="text"
        v-model="searchQuery"
        :placeholder="t('page.characters.searcher.placeholder')"
        class="search-input"
      />
    </VContainer>
    <div class="sections-fildered-character__content">
      <SmashCard
        as="h2"
        v-for="character in filteredAndSortedCharacters"
        :slug="character.key"
        :key="character.key"
        :name="character.name"
        :order="character.order"
        :saga="character.saga"
        :color="character.color"
      />
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'
  import { VContainer, VInput } from '@overgaming/vicius'
  import { ref, computed } from 'vue'
  import SmashCard from '../Cards/Smash.vue'
  import useCharacters from '../../composables/useCharacters'

  const { getAllCharacters } = useCharacters()
  const stories = getAllCharacters()
  const searchQuery = ref('')

  const filteredAndSortedCharacters = computed(() => {
    let filtered = stories
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(query)
      )
    }

    return filtered
  })
</script>

<style scoped>
  .sections-fildered-character__search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: var(--v-unit-4);
  }

  .sections-fildered-character__bar {
    display: grid;
    gap: var(--v-unit-4);
    justify-content: center;
    align-items: center;
    margin-bottom: var(--v-unit-4);
    grid-auto-flow: column;
  }

  .sections-fildered-character__bar button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--v-unit-2);
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .sections-fildered-character__bar button.active {
    color: var(--primary-color);
  }

  .sections-fildered-character__content {
    display: grid;
    grid-gap: var(--v-unit-2);
    grid-template-columns: 1fr;

    @media (width >= 900px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (width >= 1360px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
