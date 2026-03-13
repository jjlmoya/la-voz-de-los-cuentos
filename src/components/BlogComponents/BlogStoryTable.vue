<template>
  <div class="blog-story-table">
    <table class="story-table">
      <thead>
        <tr>
          <th v-for="(header, index) in block.headers" :key="index" class="story-table__header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex" class="story-table__row">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="story-table__cell">
            <!-- Si la celda es un objeto con slug, renderizar como StoryLink -->
            <StoryLink
              v-if="cell && typeof cell === 'object' && cell.slug"
              :slug="cell.slug"
              :title="cell.title"
            />
            <!-- Si la celda es un string que es un slug de story, buscar el título y renderizar como StoryLink -->
            <template v-else-if="getStoryLinkData(cell)">
              <StoryLink
                :slug="getStoryLinkData(cell).slug"
                :title="getStoryLinkData(cell).title"
              />
            </template>
            <!-- Si no, renderizar como texto plano -->
            <span v-else>{{ cell }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StoryLink from './StoryLink.vue'
import storiesEs from '../../data/es/stories.json'
import storiesEn from '../../data/en/stories.json'

const props = defineProps({
  block: {
    type: Object,
    required: true
  },
  lang: {
    type: String,
    default: 'es'
  }
})

const currentLang = computed(() => props.lang)

// Get the correct story collection based on language
const stories = computed(() => {
  return currentLang.value === 'en' ? storiesEn : storiesEs
})

// Create a map of story slugs to titles for quick lookup
const storyMap = computed(() => {
  const map = {}
  stories.value.forEach(story => {
    map[story.key] = story.name
  })
  return map
})

// Helper to check if a cell is a story slug and get its title
const getStoryLinkData = (cell) => {
  if (typeof cell === 'string' && storyMap.value[cell]) {
    return {
      slug: cell,
      title: storyMap.value[cell]
    }
  }
  return null
}
</script>

<style scoped>
.blog-story-table {
  overflow-x: auto;
  margin: var(--v-unit-4) 0;
}

.story-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.story-table__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: var(--v-unit-3);
  text-align: left;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.story-table__row {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.story-table__row:hover {
  background-color: #f9f9fb;
}

.story-table__row:last-child {
  border-bottom: none;
}

.story-table__cell {
  padding: var(--v-unit-3);
  font-size: 14px;
  line-height: 1.6;
  color: #2d3e50;
}

.story-table__cell:first-child {
  font-weight: 600;
  color: #1a2332;
}

@media (max-width: 640px) {
  .story-table {
    font-size: 13px;
  }

  .story-table__header {
    padding: var(--v-unit-2);
    font-size: 12px;
  }

  .story-table__cell {
    padding: var(--v-unit-2);
    font-size: 12px;
  }
}
</style>
