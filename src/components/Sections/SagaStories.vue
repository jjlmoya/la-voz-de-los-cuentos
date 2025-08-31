<template>
  <div class="sections-saga">
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
  import useSaga from '../../composables/useSaga'
  const props = defineProps({
    saga: {
      default: {},
      type: Object
    }
  })
  const { getStories } = useSaga(props.saga)
  const stories = getStories()
</script>

<style scoped>
  .sections-saga {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--v-unit-8);
  }

  @media (max-width: 480px) {
    .sections-saga {
      grid-template-columns: 1fr;
      gap: var(--v-unit-6);
    }
  }

  @media (min-width: 768px) {
    .sections-saga {
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: var(--v-unit-10);
    }
  }

  @media (min-width: 1024px) {
    .sections-saga {
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: var(--v-unit-12);
    }
  }
</style>
