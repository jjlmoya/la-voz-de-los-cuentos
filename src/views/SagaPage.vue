<template>
  <div>
    <MainLayout>
      <div class="saga-container">
        <h1 class="saga-title">{{ saga.name }}</h1>
        <iframe 
          v-if="saga.youtube" 
          :src="'https://www.youtube.com/embed/videoseries?list=' + saga.youtube" 
          width="100%" 
          height="600" 
          frameborder="0" 
          allowfullscreen>
        </iframe>
        <div v-else class="no-playlist">
          <p>No hay playlist disponible para esta saga.</p>
        </div>
        <h2 class="stories-title">Cuentos en esta saga</h2>
        <div class="stories-grid">
          <BasicCard v-for="story in filteredStories" :key="story.key" :entry="story" />
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout.vue';
import BasicCard from '@/components/BasicCard.vue';
import sagaData from '@/assets/sagas.json';
import storyData from '@/assets/stories.json';

export default {
  name: 'SagaPage',
  components: {
    MainLayout,
    BasicCard
  },
  data() {
    return {
      saga: null,
      filteredStories: []
    };
  },
  created() {
    const sagaId = this.$route.params.id;
    this.saga = sagaData.find(saga => saga.key === sagaId);
    if (this.saga) {
      this.filteredStories = storyData.filter(story => story.saga === sagaId);
    }
  }
};
</script>

<style scoped>
.saga-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.saga-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
}

.no-playlist {
  text-align: center;
  margin-bottom: 20px;
}

.stories-title {
  font-size: 2rem;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

</style>
