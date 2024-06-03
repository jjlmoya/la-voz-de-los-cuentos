<template>
  <div class="stories-page">
    <MainLayout>
      <div class="stories-content">
        <h1 class="page-title">Nuestros Cuentos Mágicos</h1>
        <div class="search-container">
          <input
            type="text"
            v-model="search"
            placeholder="Encuentra tu cuento favorito..."
            class="search-input"
          />
          <button @click="clearSearch" class="clear-button">Limpiar</button>
        </div>
        <p class="story-count" v-html="storyCountMessage"></p>
        <div class="stories-grid">
          <BasicCard
            linkType="VIDEO"
            v-for="story in filteredStories"
            :key="story.key"
            :entry="story.data"
          />
        </div>
      </div>  
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout.vue';
import { ref, computed, onMounted } from 'vue';
import storiesData from '@/assets/stories.json';
import BasicCard from '@/components/BasicCard.vue';

export default {
  name: 'StoriesPage',
  components: {
    MainLayout,
    BasicCard,
  },
  setup() {
    const stories = ref({});
    const search = ref('');

    onMounted(() => {
      stories.value = storiesData;
    });

    const sortedstories = computed(() => {
      return Object.entries(stories.value)
        .map(([key, data]) => ({ key, data }))
        .sort((a, b) => a.data.order - b.data.order);
    });

    const filteredStories = computed(() => {
      if (!search.value) {
        return sortedstories.value;
      }
      return sortedstories.value.filter((story) =>
        story.data.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const storyCountMessage = computed(() => {
      const total = sortedstories.value.length;
      const filtered = filteredStories.value.length;
      if (!search.value) {
        return `Tenemos <span class="text-secondary">${total}</span> cuentos mágicos para ti`;
      }
      return `Encontramos <span class="text-secondary">${filtered}</span> cuentos que coinciden con tu búsqueda`;
    });

    const clearSearch = () => {
      search.value = '';
    };

    return {
      search,
      sortedstories,
      filteredStories,
      storyCountMessage,
      clearSearch,
    };
  },
};
</script>

<style scoped>
.stories-content {
  padding: 20px;
}

.page-title {
  color: var(--primary-color);
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: var(--secondary-color);
}

.clear-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-button:hover {
  background-color: var(--secondary-color);
}

.story-count {
  font-size: 1.2em;
  color: var(--primary-color);
  margin-bottom: 20px;
  text-align: center;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}

@media (max-width: 600px) {
  .stories-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
