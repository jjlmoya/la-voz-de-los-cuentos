<template>
  <section class="featured-stories">
    <h2> 
        Descubre Nuestros <span class="stories-list-number">{{sortedstories.length }}</span> Cuentos
    </h2>
    <div class="stories-list">
      <BasicCard
       linkType="PLAYLIST" 
       v-for="story in sortedstories" 
       :key="story.key" 
       :entry="story.data" />
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
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

    const sortedstories = computed(() => {
      return Object.entries(stories.value)
        .map(([key, data]) => ({ key, data }))
        .sort((a, b) => a.data.order - b.data.order);
    });

    return {
      sortedstories
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
  overflow-x: auto;
  padding-bottom: 1rem;
}
.stories-list-number {
  color:var(--secondary-color);
  font-weight: 500;
}
</style>
