<template>
  <section class="featured-sagas">
    <h2>Nuestras Sagas</h2>
    <div class="sagas-list">
      <BasicCard linkType="PLAYLIST" v-for="saga in sortedSagas" :key="saga.key" :saga="saga.data" />
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import sagasData from '@/assets/sagas.json';
import BasicCard from '@/components/BasicCard.vue';

export default {
  name: 'FeaturedSagas',
  components: {
    BasicCard
  },
  setup() {
    const sagas = ref({});

    onMounted(() => {
      sagas.value = sagasData;
    });

    const sortedSagas = computed(() => {
      return Object.entries(sagas.value)
        .map(([key, data]) => ({ key, data }))
        .sort((a, b) => a.data.order - b.data.order);
    });

    return {
      sortedSagas
    };
  }
};
</script>


<style scoped>
.featured-sagas {
  padding: 2rem 1rem;
  text-align: center;
}
.featured-sagas h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}
.sagas-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}
</style>
