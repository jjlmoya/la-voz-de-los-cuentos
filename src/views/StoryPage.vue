<template>
  <div>
    <MainLayout>
      <div v-if="story" class="story-container" id="story-container">
        <h1 class="story-title">{{ story.name }}</h1>
        
        <!-- Font Size Selector -->
        
        
        <div v-if="story.youtube" class="youtube-embed">
          <iframe :src="`https://www.youtube.com/embed/${story.youtube}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div v-if="story.spotify" class="spotify-embed">
          <iframe 
            :src="`https://podcasters.spotify.com/pod/show/lavozdeloscuentos/embed/episodes/${story.spotify}`" frameborder="0" 
            scrolling="no">
          </iframe>
        </div>
        <div class="font-size-selector">
          <label for="font-size">Tamaño del texto</label>
          <input type="range" id="font-size" min="20" max="36" v-model="fontSize">
          <span>{{ fontSize }}px</span>
        </div>
        <button @click="printPDF" class="download-button">.pdf</button>
      
        <div class="story-content" :style="{ fontSize: fontSize + 'px' }">
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
    const fontSize = ref(localStorage.getItem('fontSize') || 16); // Load font size from localStorage or set default

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

    const printPDF = () => {
      window.print();
    };

    // Watch for changes in fontSize to update localStorage
    watch(fontSize, (newFontSize) => {
      localStorage.setItem('fontSize', newFontSize);
    });

    // Watch for changes in route parameters to reload the story
    watch(route, loadStory);

    // Load the story initially
    loadStory();

    return {
      story,
      formattedStory,
      relatedStories,
      fontSize,
      printPDF
    };
  }
};
</script>

<style>
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

.youtube-embed, .spotify-embed {
  text-align: center;
  margin-bottom: 8px;
}

.youtube-embed iframe, .spotify-embed iframe {
  width: 100%;
  border-radius: 8px;
}

.spotify-embed iframe {
  height: 100px;
}

.youtube-embed iframe {
  height: 400px;
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

.download-button {
  display: block;
  margin: 8px auto;
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-button:hover {
  background-color: var(--primary-color);
}

.font-size-selector {
  display: grid;
  justify-content: center;
  padding: 8px;
}

.font-size-selector label {
  margin-right: 10px;
  font-size: 1.2em;
  color: var(--secondary-color);
}

.font-size-selector span {
  font-size: 1.2em;
  color: var(--secondary-color);
}

.font-size-selector input {
  margin-right: 10px;
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

@media print {
  .youtube-embed, .spotify-embed, .related-stories, .download-button, .font-size-selector, footer {
    display: none !important;
  }

  .story-container {
    box-shadow: none;
    background: none;
    padding: 0;
    margin: 0;
  }
  
  .story-title, .story-content {
    color: black;
  }
}
</style>
