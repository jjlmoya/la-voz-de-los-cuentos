<template>
  <div>
    <MainLayout>
      <div v-if="story" class="story-container">
        <h1 class="story-title">{{ story.name }}</h1>
        <div v-if="story.youtube" class="youtube-embed">
          <iframe :src="`https://www.youtube.com/embed/${story.youtube}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="story-content">
          <p v-for="(paragraph, index) in formattedStory" :key="index">{{ paragraph }}</p>
        </div>
        <div class="related-stories">
          <h2>Cuentos Relacionados</h2>
          <div class="related-stories-list">
            <div v-for="relatedStory in relatedStories" :key="relatedStory.key" class="related-story-card">
              <router-link :to="`/cuento/${relatedStory.key}`">
                <img :src="require(`@/assets/stories/${relatedStory.key}.png`)" alt="Imagen del cuento" class="related-story-image"/>
                <p class="related-story-title">{{ relatedStory.name }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading-message">
        <p>Error 404, cuento no disponible</p>
      </div>
    </MainLayout>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layout/MainLayout.vue';
import stories from '@/assets/stories.json';

export default {
  name: 'StoryPage',
  components: {
    MainLayout
  },
  setup() {
    const route = useRoute();
    const story = ref(null);
    const relatedStories = ref([]);

    const loadStory = () => {
      const storyKey = route.params.id;
      story.value = stories.find(story => story.key === storyKey);
      setRelatedStories();
    };

    const formattedStory = computed(() => {
      return story.value ? story.value.story.split('\r\n').filter((p, index) => p.trim() !== '' && index > 0) : [];
    });

    const setRelatedStories = () => {
      const currentStoryKey = route.params.id;
      const otherStories = stories.filter(story => story.key !== currentStoryKey);
      relatedStories.value = otherStories.sort(() => 0.5 - Math.random()).slice(0, 6);
    };

    // Watch for changes in route parameters to reload the story
    watch(route, loadStory);

    // Load the story initially
    loadStory();

    return {
      story,
      formattedStory,
      relatedStories
    };
  }
};
</script>

<style scoped>
.story-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.story-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.youtube-embed {
  text-align: center;
  margin-bottom: 20px;
}

.youtube-embed iframe {
  width: 100%;
  height: 400px;
  border-radius: 8px;
}

.story-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.story-content {
  font-size: 1.3em;
  line-height: 1.8;
  color: black;
}

.story-content p {
  margin-bottom: 20px;
  text-align: justify;
}

.related-stories {
  margin-top: 40px;
}

.related-stories h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.related-stories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.related-story-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  width: calc(33% - 20px);
  text-align: center;
}

.related-story-card:hover {
  transform: scale(1.05);
}

.related-story-image {
  width: 100%;
  height: auto;
}

.related-story-title {
  padding: 10px;
  font-size: 1.1em;
  color: var(--title-color);
}
a {
    text-decoration: none;
}

.loading-message {
  text-align: center;
  font-size: 1.5em;
  padding: 50px 0;
}

@media (max-width: 768px) {
  .related-story-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .related-story-card {
    width: 100%;
  }

  .story-content {
    font-size: 1em;
  }
}
</style>
