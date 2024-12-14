<template>
  <div class="sections-filtered">
    <VContainer class="sections-filtered__search-bar" size="xs">
      <VInput
        type="text"
        v-model="searchQuery"
        :placeholder="t('page.characters.searcher.placeholder')"
        class="search-input"
      />
    </VContainer>
    <VContainer class="sections-filtered__bar" size="xs">
      <VButton
        variant="ghost"
        :class="{ active: sortOrder === 'date' }"
        @click="setSortOrder('date')"
      >
        {{ t('page.characters.order.birthday') }}
        <VText v-if="sortOrder === 'date'" color="high">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
      <VButton
        variant="ghost"
        :class="{ active: sortOrder === 'name' }"
        @click="setSortOrder('name')"
      >
        {{ t('page.characters.order.name') }}
        <VText v-if="sortOrder === 'name'" color="high">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
    </VContainer>
    <div
      class="sections-filtered__content"
      :class="{ 'list-view': isListView }"
    >
      <BasicCard
        as="h2"
        v-if="!isListView"
        v-for="character in filteredAndSortedCharacters"
        :slug="character.key"
        :key="character.key"
        :title="character.name"
        isCharacter
        :isStory="false"
      />
      <VContainer class="sections-filtered__content-list" v-if="isListView">
        <PlainCard
          v-for="character in filteredAndSortedCharacters"
          :key="character.key"
          :story="character"
          isCharacter
        />
      </VContainer>
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'
  import { VContainer, VButton, VText, VInput } from '@overgaming/vicius'
  import { ref, computed } from 'vue'
  import BasicCard from '../Cards/Basic.vue'
  import PlainCard from '../Cards/Plain.vue'
  import useCharacters from '../../composables/useCharacters'

  const { getAllCharacters } = useCharacters()
  const stories = getAllCharacters()

  const searchQuery = ref('')
  const sortOrder = ref('date')
  const sortDirection = ref('desc')
  const isListView = ref(false)

  const setSortOrder = order => {
    if (sortOrder.value === order) {
      toggleSortDirection()
    } else {
      sortOrder.value = order
    }
  }

  const toggleSortDirection = () => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  }

  const parseDate = dateString => {
    const [day, month] = dateString.split('-').map(Number)
    return new Date(2024, month - 1, day)
  }

  const filteredAndSortedCharacters = computed(() => {
    let filtered = stories
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(query)
      )
    }

    return filtered.slice().sort((a, b) => {
      let comparison = 0
      if (sortOrder.value === 'date') {
        comparison = parseDate(a.birthday) - parseDate(b.birthday)
      } else if (sortOrder.value === 'name') {
        comparison = a.name.localeCompare(b.name)
      }

      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  })
</script>

<style scoped>
  .sections-filtered__search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: var(--v-unit-4);
  }

  .sections-filtered__bar {
    display: grid;
    gap: var(--v-unit-4);
    justify-content: center;
    align-items: center;
    margin-bottom: var(--v-unit-4);
    grid-auto-flow: column;
  }

  .sections-filtered__bar button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--v-unit-2);
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .sections-filtered__bar button.active {
    color: var(--primary-color);
  }

  .sections-filtered__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: var(--v-unit-10);
  }

  .sections-filtered__content-list {
    display: grid;
    background-color: var(--v-color-surface-high);
    border-radius: var(--v-unit-4);
    grid-gap: var(--v-unit-2);
  }

  .sections-filtered__content.list-view {
    display: block;
  }
</style>
