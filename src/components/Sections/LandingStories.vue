<template>
  <div class="sections-landing">
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
  import useLanding from '../../composables/useLanding'
  const props = defineProps({
    landing: {
      default: {},
      type: Object
    }
  })
  const { getStories } = useLanding(props.landing)
  const stories = getStories()
</script>

<style scoped>
  .sections-landing {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: var(--v-unit-8);
  }
</style>
