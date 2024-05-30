<!-- src/components/Featuredstories.vue -->
<template>
  <section class="featured-stories">
    <h2>Nuestros Cuentos</h2>
    <div class="stories-list">
      <BasicCard linkType="VIDEO" v-for="(saga, key) in stories" :key="key" :saga="saga" />
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import storiesData from '@/assets/stories.json';
import BasicCard from '@/components/BasicCard.vue';

export default {
  name: 'FeaturedStories',
  components: {
    BasicCard
  },
  setup() {
    const stories = ref({});

    onMounted(() => {
      stories.value = storiesData;
    });

    return {
      stories
    };
  }
};
</script>

<style scoped>
.featured-stories {
  padding: 2rem 1rem;
  text-align: center;
}
.featured-stories h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}
.stories-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}
</style>
