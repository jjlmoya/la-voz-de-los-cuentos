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
             <div class="filter-container">
          <div class="filter-group">
            <label for="order">Ordenar</label>
            <select id="order" v-model="selectedOrder" class="filter-select">
              <option value="order">Publicación </option>
              <option value="time">Duración</option>
              <option value="name">Nombre</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="filterSaga">Filtrar saga</label>
            <select id="filterSaga" v-model="selectedFilterSaga" class="filter-select">
              <option value="all">Todos</option>
              <option v-for="saga in availableSagas" :key="saga.key" :value="saga.key">{{ saga.name }}</option>
            </select>
          </div>
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
import sagasData from '@/assets/sagas.json';
import BasicCard from '@/components/BasicCard.vue';

export default {
  name: 'StoriesPage',
  components: {
    MainLayout,
    BasicCard,
  },
  setup() {
    const stories = ref({});
    const sagas = ref([]);
    const search = ref('');
    const selectedFilterSaga = ref('all');
    const selectedFilterVideo = ref('all');
    const selectedOrder = ref('order');

    onMounted(() => {
      stories.value = storiesData;
      sagas.value = sagasData;
    });

    const availableSagas = computed(() => {
      return sagas.value.map(saga => ({
        key: saga.key,
        name: saga.name
      }));
    });

    const sortedstories = computed(() => {
      return Object.entries(stories.value)
        .map(([key, data]) => ({ key, data }))
        .sort((a, b) => a.data.order - b.data.order);
    });

    const filteredStories = computed(() => {
      let storiesArray = sortedstories.value;

      if (selectedFilterSaga.value !== 'all') {
        storiesArray = storiesArray.filter((story) => story.data.saga === selectedFilterSaga.value);
      }

      if (selectedFilterVideo.value === 'withVideo') {
        storiesArray = storiesArray.filter((story) => story.data.youtube);
      } else if (selectedFilterVideo.value === 'withoutVideo') {
        storiesArray = storiesArray.filter((story) => !story.data.youtube);
      }

      if (search.value) {
        storiesArray = storiesArray.filter((story) =>
          story.data.name.toLowerCase().includes(search.value.toLowerCase())
        );
      }

      if (selectedOrder.value === 'time') {
        storiesArray.sort((a, b) => parseFloat(b.data.time) - parseFloat(a.data.time));
      } else if (selectedOrder.value === 'name') {
        storiesArray.sort((a, b) => a.data.name.localeCompare(b.data.name));
      } else if (selectedOrder.value === 'order') {
        storiesArray.sort((a, b) => a.data.order - b.data.order);
      }

      return storiesArray;
    });

    const storyCountMessage = computed(() => {
      const total = sortedstories.value.length;
      const filtered = filteredStories.value.length;
      if (!search.value && selectedFilterSaga.value === 'all' && selectedFilterVideo.value === 'all') {
        return `Tenemos <span class="text-secondary">${total}</span> cuentos mágicos para ti`;
      }
      return `Encontramos <span class="text-secondary">${filtered}</span> cuentos que coinciden con tu búsqueda`;
    });

    const clearSearch = () => {
      search.value = '';
    };

    return {
      search,
      selectedFilterSaga,
      selectedFilterVideo,
      selectedOrder,
      availableSagas,
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

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-group label {
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
}

.filter-select {
  padding: 5px 10px;
  font-size: 16px;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  border-color: var(--secondary-color);
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  justify-content: center;
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 600px) {
  .stories-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
