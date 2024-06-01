<template>
  <div class="story-banner">
    <div v-if="!loading && !selectedStory" class="initial-view">
      <div class="grid-container">
        <div class="grid-item image-container">
          <img :src="getImageSrc(randomStory?.key)" :alt="randomStory?.name" />
        </div>
        <div class="grid-item">
          <h2 class="story-banner__title"><span class="text-secondary"></span>Te ayudo a elegir <span class="text-secondary">tu cuento ideal</span></h2>
          <button @click="selectRandomStory" class="recommend-btn">¡ADELANTE!</button>
        </div>
      </div>
    </div>
    <div v-else>
      <transition name="fade">
        <div v-if="loading" class="grid-container loading">
          <div class="grid-item image-container">
            <img :src="getImageSrc(currentRandomStory?.key)" v-if="currentRandomStory" :alt="currentRandomStory?.name" class="story-image" />
          </div>
          <div class="grid-item">
            <p>Buscando el cuento ideal...</p>
          </div>
        </div>
        <div v-else-if="selectedStory" class="grid-container">
          <div class="grid-item image-container">
            <img :src="getImageSrc(selectedStory?.key)" :alt="selectedStory?.name" class="story-image" />
          </div>
          <div class="grid-item">
            <h2 class="text-secondary">{{ selectedStory.name }}</h2>
            <div class="button-group">
              <button @click="retryRecommendation" class="retry-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 2a10 10 0 0 0-10 10h2a8 8 0 1 1 8 8v-3l-5 5 5 5v-3a10 10 0 0 0 0-20z"/>
                </svg>
              </button>
              <a :href="youtubeLink.value" target="_blank" class="play-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import stories from '@/assets/stories.json';
import useYoutubeLink, { LinkType } from '@/hooks/useYoutubeLink';
import { ref } from 'vue';

export default {
  data() {
    return {
      stories: stories,
      selectedStory: null,
      loading: false,
      currentRandomStory: null,
      intervalId: null,
      randomStory: null,
    };
  },
  setup() {
    const youtubeLink = ref({})
    return {
      youtubeLink
    };
  },
  mounted() {
    this.randomStory = this.getRandomStory();
  },
  methods: {
    selectRandomStory() {
      if (this.loading) return;
      this.loading = true;
      let count = 0;
      this.intervalId = setInterval(() => {
        this.currentRandomStory = this.stories[Math.floor(Math.random() * this.stories.length)];
        count++;
        if (count >= 10) {
          clearInterval(this.intervalId);
          this.finalizeSelection();
        }
      }, 200); // Change story every 200ms
    },
    finalizeSelection() {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.stories.length);
        this.selectedStory = this.stories[randomIndex];
        this.currentRandomStory = null;
        this.loading = false;

        // Set YouTube link

        const { link } = useYoutubeLink( this.selectedStory?.youtube, LinkType.VIDEO);
        this.youtubeLink.value = link

      }, 200); // Short delay before final selection
    },
    retryRecommendation() {
      if (this.loading) return;
      this.selectedStory = null;
      this.selectRandomStory();
    },
    getImageSrc(key) {
      try {
        return require(`@/assets/stories/${key}.png`);
      } catch (e) {
        return require('@/assets/stories/default.png');
      }
    },
    getRandomStory() {
      const randomIndex = Math.floor(Math.random() * this.stories.length);
      return this.stories[randomIndex];
    }
  },
};
</script>

<style scoped>
.story-banner__title {
  color: var(--primary-color);
}

.story-banner {
  margin: 16px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  position: relative;
  padding: 20px;
  min-width: 200px;
  overflow: hidden; /* Prevents content from shifting during transitions */
}

.grid-container {
  padding: 16px;
  display: grid;
  grid-template-columns: 300px 300px;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.grid-container {
  padding: 16px;
  display: grid;
  grid-template-columns: 300px 300px;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

@media (max-width: 800px) {
  .grid-container {
    grid-template-columns: 1fr; /* Cambia las columnas a una sola en móviles */
  }
}


.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.story-banner img {
  width: 250px;
  height: 250px;
  border-radius: 10px 0 0px 10px;
  object-fit: cover;
}

.loading {
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.recommend-btn {
  max-width: 200px;
  background-color: var(--secondary-color);
  color: white;
  font-weight: bold;
  border: none;
  padding: 32px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.recommend-btn:hover {
  background-color: var(--primary-color);
}

.retry-btn, .play-btn {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  font-size: 2em;
  cursor: pointer;
  border-radius: 50%;
  margin-top: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
}
.retry-btn {
    background-color: var(--primary-color);
    opacity: 0.5;
}

.retry-btn:hover, .play-btn:hover {
  color: var(--secondary-color);
}

.retry-btn svg, .play-btn svg {
  width: 24px;
  height: 24px;
  fill: white;
}

.button-group {
  display: flex;
  gap: 8px;
}

.story-details {
  margin-top: 20px;
}

.story-banner h2 {
  font-size: 32px;
  display: grid;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
