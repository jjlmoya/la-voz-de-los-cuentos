<template>
  <div class="sections-filtered">
    <VContainer class="sections-filtered__search-bar" size="xs">
      <VInput
        type="text"
        v-model="searchQuery"
        placeholder="Buscar cuento..."
        class="search-input"
      />
    </VContainer>
    <VContainer class="sections-filtered__bar" size="xs">
      <VButton
        variant="text"
        :class="{ active: sortOrder === 'date' }"
        @click="setSortOrder('date')"
      >
        Fecha
        <VText v-if="sortOrder === 'date'">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
      <VButton
        variant="text"
        :class="{ active: sortOrder === 'time' }"
        @click="setSortOrder('time')"
      >
        Duración
        <VText v-if="sortOrder === 'time'">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
      <VButton
        variant="text"
        :class="{ active: sortOrder === 'name' }"
        @click="setSortOrder('name')"
      >
        Nombre
        <VText v-if="sortOrder === 'name'">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
      <VButton
        aria-label="Cambiar a vista lista"
        variant="text"
        :class="{ active: isListView }"
        @click="toggleViewMode"
      >
        <ListIcon :active="!isListView" />
      </VButton>
    </VContainer>
    <div
      class="sections-filtered__content"
      :class="{ 'list-view': isListView }"
    >
      <BasicCard
        as="h2"
        v-if="!isListView"
        v-for="story in filteredAndSortedStories"
        :slug="story.key"
        :key="story.key"
        :title="story.name"
        :time="parseInt(story.time)"
        isStory
      />
      <VContainer class="sections-filtered__content-list" v-if="isListView">
        <PlainCard
          v-for="story in filteredAndSortedStories"
          :key="story.key"
          :story="story"
        />
      </VContainer>
    </div>
  </div>
</template>

<script setup>
  import { VContainer, VButton, VText, VInput } from '@overgaming/vicius'
  import { ref, computed } from 'vue'
  import BasicCard from '../Cards/Basic.vue'
  import PlainCard from '../Cards/Plain.vue'
  import ListIcon from '../Icons/ListIcon.vue'

  import useStories from '../../composables/useStories'

  const { getAllStories } = useStories()
  const stories = getAllStories()

  const searchQuery = ref('')
  const sortOrder = ref('date')
  const sortDirection = ref('asc')
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

  const toggleViewMode = () => {
    isListView.value = !isListView.value
  }

  const filteredAndSortedStories = computed(() => {
    let filtered = stories
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(story =>
        story.name.toLowerCase().includes(query)
      )
    }

    return filtered.slice().sort((a, b) => {
      let comparison = 0

      if (sortOrder.value === 'date') {
        comparison = new Date(a.date) - new Date(b.date)
      } else if (sortOrder.value === 'time') {
        comparison = parseInt(a.time) - parseInt(b.time)
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
    display: flex;
    gap: var(--v-unit-4);
    justify-content: center;
    align-items: center;
    margin-bottom: var(--v-unit-4);
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
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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
