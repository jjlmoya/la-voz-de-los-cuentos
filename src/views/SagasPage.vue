<template>
  <div class="sagas-page">
    <MainLayout>
      <div class="sagas-content">
        <h1 class="page-title">Nuestros Sagas Mágicas</h1>
        <div class="search-container">
          <input
            type="text"
            v-model="search"
            placeholder="Encuentra tu saga favorita..."
            class="search-input"
          />
          <button @click="clearSearch" class="clear-button">Limpiar</button>
        </div>
        <p class="saga-count" v-html="sagaCountMessage"></p>
        <div class="sagas-grid">
          <BasicCard
            linkType="PLAYLIST"
            v-for="saga in filteredSagas"
            :key="saga.key"
            :entry="saga.data"
            isSaga
          />
        </div>
      </div>  
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout.vue';
import { ref, computed, onMounted } from 'vue';
import sagasData from '@/assets/sagas.json';
import BasicCard from '@/components/BasicCard.vue';

export default {
  name: 'SagasPage',
  components: {
    MainLayout,
    BasicCard,
  },
  setup() {
    const sagas = ref({});
    const search = ref('');

    onMounted(() => {
      sagas.value = sagasData;
    });

    const sortedsagas = computed(() => {
      return Object.entries(sagas.value)
        .map(([key, data]) => ({ key, data }))
        .sort((a, b) => a.data.order - b.data.order);
    });

    const filteredSagas = computed(() => {
      if (!search.value) {
        return sortedsagas.value;
      }
      return sortedsagas.value.filter((saga) =>
        saga.data.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const sagaCountMessage = computed(() => {
      const total = sortedsagas.value.length;
      const filtered = filteredSagas.value.length;
      if (!search.value) {
        return `Tenemos <span class="text-secondary">${total}</span> sagas mágicas para ti`;
      }
      return `Encontramos <span class="text-secondary">${filtered}</span> sagas que coinciden con tu búsqueda`;
    });

    const clearSearch = () => {
      search.value = '';
    };

    return {
      search,
      sortedsagas,
      filteredSagas,
      sagaCountMessage,
      clearSearch,
    };
  },
};
</script>

<style scoped>
.sagas-content {
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

.saga-count {
  font-size: 1.2em;
  color: var(--primary-color);
  margin-bottom: 20px;
  text-align: center;
}

.sagas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}

@media (max-width: 600px) {
  .sagas-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
