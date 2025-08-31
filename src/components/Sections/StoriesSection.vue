<template>
  <div class="sections-stories">
    <BasicCard
      v-for="story in stories"
      :slug="story.key"
      :key="story.key"
      :title="story.name"
      :time="parseInt(story.time)"
      isStory
    />
  </div>
  <div class="sections-stories-fallback">
    <slot name="fallback" v-if="!stories.length"></slot>
  </div>
</template>

<script setup>
  import BasicCard from '../Cards/Basic.vue'
  defineProps({
    stories: {
      type: Array,
      default: []
    }
  })
</script>

<style scoped>
  .sections-stories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--v-unit-8);
    padding: 0;
  }

  @media (max-width: 480px) {
    .sections-stories {
      grid-template-columns: 1fr;
      gap: var(--v-unit-6);
    }
  }

  @media (min-width: 768px) {
    .sections-stories {
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: var(--v-unit-10);
    }
  }

  @media (min-width: 1024px) {
    .sections-stories {
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: var(--v-unit-12);
    }
  }
</style>
