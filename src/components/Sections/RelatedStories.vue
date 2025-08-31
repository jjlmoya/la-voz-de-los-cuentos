<template>
  <div class="sections-related">
    <BasicCard
      v-for="_story in stories"
      :slug="_story.key"
      :key="_story.key"
      :title="_story.name"
      :time="parseInt(_story.time)"
      isStory
    />
  </div>
</template>

<script setup>
  import BasicCard from '../Cards/Basic.vue'
  import useStories from '../../composables/useStories'
  const props = defineProps({
    story: {
      default: {},
      type: Object
    }
  })
  const { getRelatedStories } = useStories()
  const stories = getRelatedStories(props.story)
</script>

<style scoped>
  .sections-related {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--v-unit-8);
  }

  @media (max-width: 480px) {
    .sections-related {
      grid-template-columns: 1fr;
      gap: var(--v-unit-6);
    }
  }

  @media (min-width: 768px) {
    .sections-related {
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: var(--v-unit-10);
    }
  }

  @media (min-width: 1024px) {
    .sections-related {
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: var(--v-unit-12);
    }
  }
</style>
