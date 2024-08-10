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
  console.log(stories)
</script>

<style scoped>
  .sections-saga {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: var(--v-unit-8);
  }
</style>
