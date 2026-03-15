<template>
  <div class="landing-stories-grid" data-landing-stories>
    <div class="landing-stories-controls">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="search-input"
          @input="filterStories"
        />
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>

      <div class="sort-controls">
        <label :for="`sort-${_uid}`" class="sort-label">
          {{ sortLabel }}:
        </label>
        <select
          :id="`sort-${_uid}`"
          v-model="sortBy"
          class="sort-select"
          @change="sortStories"
        >
          <option value="default">{{ defaultLabel }}</option>
          <option value="duration-asc">{{ durationAscLabel }}</option>
          <option value="duration-desc">{{ durationDescLabel }}</option>
          <option value="name">{{ nameLabel }}</option>
        </select>
      </div>

      <div class="stories-count">
        {{ filteredStories.length }} / {{ allStories.length }}
        {{ countLabel }}
      </div>
    </div>

    <div v-if="filteredStories.length === 0" class="no-results">
      <p>{{ noResultsMessage }}</p>
    </div>

    <div v-else class="stories-grid">
      <BasicCard
        v-for="story in filteredStories"
        :key="story.key"
        :slug="story.key"
        :title="story.name"
        :time="parseInt(story.time)"
        is-story
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BasicCard from '../Cards/Basic.vue'
import useLanding from '../../composables/useLanding'

const props = defineProps({
  landing: {
    type: Object,
    default: () => ({})
  }
})

const currentLang = import.meta.env.PUBLIC_LANG || 'es'

const searchQuery = ref('')
const sortBy = ref('default')
const allStories = ref([])
const filteredStories = ref([])

// Load stories using the composable
const { getStories } = useLanding(props.landing)
allStories.value = getStories()
filteredStories.value = [...allStories.value]

// Computed labels
const searchPlaceholder = computed(() =>
  currentLang === 'es' ? '🔍 Busca una historia...' : '🔍 Search a story...'
)

const sortLabel = computed(() =>
  currentLang === 'es' ? 'Ordenar' : 'Sort'
)

const defaultLabel = computed(() =>
  currentLang === 'es' ? 'Por defecto' : 'Default'
)

const durationAscLabel = computed(() =>
  currentLang === 'es' ? 'Duración: Menor a Mayor' : 'Duration: Short to Long'
)

const durationDescLabel = computed(() =>
  currentLang === 'es' ? 'Duración: Mayor a Menor' : 'Duration: Long to Short'
)

const nameLabel = computed(() =>
  currentLang === 'es' ? 'Alfabético' : 'Alphabetical'
)

const countLabel = computed(() =>
  currentLang === 'es' ? 'historias' : 'stories'
)

const noResultsMessage = computed(() =>
  currentLang === 'es'
    ? 'No se encontraron historias que coincidan con tu búsqueda'
    : 'No stories found matching your search'
)

const filterStories = () => {
  const query = searchQuery.value.toLowerCase()

  if (!query) {
    filteredStories.value = [...allStories.value]
  } else {
    filteredStories.value = allStories.value.filter(story =>
      story.name.toLowerCase().includes(query)
    )
  }

  sortStories()
}

const sortStories = () => {
  const stories = [...filteredStories.value]

  switch (sortBy.value) {
    case 'duration-asc':
      stories.sort((a, b) => parseInt(a.time) - parseInt(b.time))
      break
    case 'duration-desc':
      stories.sort((a, b) => parseInt(b.time) - parseInt(a.time))
      break
    case 'name':
      stories.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'default':
    default:
      // Keep original order (reversed from composable)
      break
  }

  filteredStories.value = stories
}
</script>

<style scoped>
.landing-stories-grid {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-6);
}

.landing-stories-controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--v-unit-4);
  align-items: center;
  padding: var(--v-unit-4);
  background: var(--v-color-surface-mod);
  border-radius: 8px;
  margin-bottom: var(--v-unit-4);
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: var(--v-unit-2) var(--v-unit-3) var(--v-unit-2) var(--v-unit-4);
  border: 1px solid var(--v-color-divider);
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--v-color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-icon {
  position: absolute;
  right: var(--v-unit-3);
  width: 20px;
  height: 20px;
  color: var(--v-color-text-secondary);
  pointer-events: none;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: var(--v-unit-2);
}

.sort-label {
  font-weight: 500;
  color: var(--v-color-text);
  white-space: nowrap;
}

.sort-select {
  padding: var(--v-unit-2) var(--v-unit-3);
  border: 1px solid var(--v-color-divider);
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-select:hover {
  border-color: var(--v-color-primary);
}

.sort-select:focus {
  outline: none;
  border-color: var(--v-color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.stories-count {
  font-size: 0.9rem;
  color: var(--v-color-text-secondary);
  white-space: nowrap;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: var(--v-unit-8);
  padding: 0;
}

.no-results {
  text-align: center;
  padding: var(--v-unit-8);
  color: var(--v-color-text-secondary);
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .landing-stories-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .sort-controls {
    width: 100%;
  }

  .sort-select {
    flex: 1;
  }

  .stories-count {
    width: 100%;
    text-align: center;
  }

  .stories-grid {
    grid-template-columns: 1fr;
    gap: var(--v-unit-6);
  }
}

@media (max-width: 480px) {
  .landing-stories-controls {
    padding: var(--v-unit-3);
  }

  .search-box {
    min-width: 100%;
  }
}
</style>
