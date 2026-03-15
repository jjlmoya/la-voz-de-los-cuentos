<template>
  <div class="stories-gallery">
    <div class="stories-gallery__header">
      <h2 class="stories-gallery__title">{{ title() }}</h2>
      <p class="stories-gallery__subtitle">{{ subtitle() }}</p>
    </div>

    <div class="stories-gallery__grid">
      <BasicCard
        v-for="story in stories()"
        :key="story.key"
        :slug="story.key"
        :title="story.name"
        :time="parseInt(story.time)"
        is-story
      />
    </div>
  </div>
</template>

<script setup>
  import BasicCard from '../Cards/Basic.vue'

  const props = defineProps({
    block: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      default: 'es'
    }
  })

  const stories = () => props.block?.stories || []
  const title = () => props.block?.title || 'Más historias para explorar'
  const subtitle = () => props.block?.subtitle || 'Descubre nuestra amplia colección de cuentos'
</script>

<style scoped>
.stories-gallery {
  width: 100%;
  padding: var(--v-unit-10) 0;
}

.stories-gallery__header {
  text-align: center;
  margin-bottom: var(--v-unit-10);
  padding: 0;
}

.stories-gallery__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  color: #0f0f1e;
  margin: 0 0 var(--v-unit-3) 0;
  letter-spacing: -1px;
}

.stories-gallery__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #6b5b95;
  margin: 0;
  font-weight: 400;
}

.stories-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--v-unit-8);
  width: 100%;
  margin: 0;
  padding: 0;
}

@media (max-width: 1024px) {
  .stories-gallery__grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--v-unit-6);
  }
}

@media (max-width: 768px) {
  .stories-gallery {
    padding: var(--v-unit-8) 0;
  }

  .stories-gallery__header {
    margin-bottom: var(--v-unit-8);
    padding: 0 var(--v-unit-3);
  }

  .stories-gallery__title {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
  }

  .stories-gallery__grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--v-unit-5);
    padding: 0 var(--v-unit-3);
  }
}

@media (max-width: 480px) {
  .stories-gallery__grid {
    grid-template-columns: 1fr;
    gap: var(--v-unit-4);
    padding: 0 var(--v-unit-2);
  }

  .stories-gallery__header {
    padding: 0 var(--v-unit-2);
    margin-bottom: var(--v-unit-6);
  }
}
</style>
