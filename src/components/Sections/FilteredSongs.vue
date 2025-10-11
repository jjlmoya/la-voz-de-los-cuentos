<template>
  <div class="sections-filtered">
    <VContainer class="sections-filtered__search-bar" size="xs">
      <VInput
        type="text"
        v-model="searchQuery"
        :placeholder="t('page.songs.searcher.placeholder')"
        class="search-input"
      />
    </VContainer>
    <VContainer class="sections-filtered__bar" size="xs">
      <VButton
        variant="ghost"
        :class="{ active: sortOrder === 'date' }"
        @click="setSortOrder('date')"
      >
        {{ t('page.songs.order.date') }}
        <VText v-if="sortOrder === 'date'" color="high">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
      <VButton
        variant="ghost"
        :class="{ active: sortOrder === 'time' }"
        @click="setSortOrder('time')"
      >
        {{ t('page.songs.order.duration') }}
        <VText v-if="sortOrder === 'time'" color="high">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
      <VButton
        variant="ghost"
        :class="{ active: sortOrder === 'name' }"
        @click="setSortOrder('name')"
      >
        {{ t('page.songs.order.name') }}
        <VText v-if="sortOrder === 'name'" color="high">
          {{ sortDirection === 'asc' ? '▲' : '▼' }}
        </VText>
      </VButton>
    </VContainer>
    <div class="sections-filtered__content sections-filtered__content--songs">
      <LoadingMessage
        v-if="isLoading"
        :messages="[
          t('loading.adventure'),
          t('loading.book'),
          t('loading.characters'),
          t('loading.worlds'),
          t('loading.potions'),
          t('loading.treasures')
        ]"
        :interval="1500"
      />

      <SongList v-else :songs="filteredAndSortedSongs" />
    </div>
  </div>
</template>

<script setup>
import t from '../../translations'
import { VContainer, VButton, VText, VInput } from '@overgaming/vicius'
import { ref, computed } from 'vue'
import LoadingMessage from '../Loading/LoadingMessage.vue'
import SongList from '../Lists/SongList.vue'
import { getSongs } from '../../data'

const songs = getSongs()

const searchQuery = ref('')
const sortOrder = ref('date')
const sortDirection = ref('desc')
const isLoading = ref(false)

const setSortOrder = order => {
  isLoading.value = true
  if (sortOrder.value === order) {
    toggleSortDirection()
  } else {
    sortOrder.value = order
  }

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const parseDate = dateString => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day)
}

const filteredAndSortedSongs = computed(() => {
  let filtered = songs
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(song =>
      song.name.toLowerCase().includes(query)
    )
  }

  return filtered.slice().sort((a, b) => {
    let comparison = 0
    if (sortOrder.value === 'date') {
      comparison = parseDate(a.date) - parseDate(b.date)
    } else if (sortOrder.value === 'time') {
      comparison = parseFloat(a.time.replace(',', '.')) - parseFloat(b.time.replace(',', '.'))
    } else if (sortOrder.value === 'name') {
      comparison = a.name.localeCompare(b.name)
    }

    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})
</script>

<style scoped>
.sections-filtered {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.sections-filtered__search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: var(--v-unit-6);
}

.sections-filtered__bar {
  display: grid;
  gap: var(--v-unit-4);
  justify-content: center;
  align-items: center;
  margin-bottom: var(--v-unit-8);
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
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-radius: var(--v-radius-md);
  transform-origin: center;

  &:hover {
    transform: scale(1.1);
    background: var(--v-color-surface-soft);
    box-shadow: 0 4px 12px hsla(0, 0%, 0%, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &.active {
    color: var(--v-color-primary);
    background: var(--v-color-surface-high);
    transform: scale(1.05);
    box-shadow: 0 2px 8px hsla(var(--v-color-primary-hsl), 0.2);
  }
}

.sections-filtered__content--songs {
  width: 100%;
}
</style>
