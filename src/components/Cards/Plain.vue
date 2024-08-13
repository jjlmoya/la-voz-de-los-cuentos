<template>
  <a class="plain-card" :href="toStory(story.key)">
    <VText ellipsis class="plain-card__element">{{ story.name }}</VText>
    <VText ellipsis class="plain-card__element">{{ saga }}</VText>
    <VText ellipsis class="plain-card__element">{{ time }}</VText>
  </a>
</template>

<script setup>
  import { toStory } from '../../router'
  import { VText } from '@overgaming/vicius'
  import useStory from '../../composables/useStory'
  const props = defineProps({
    story: {
      type: Object,
      default: {}
    }
  })

  const { getTime, getSaga } = useStory(props.story)
  const time = getTime()
  const saga = getSaga()
</script>

<style scoped>
  .plain-card {
    display: grid;
    grid-template-columns: 4fr 2fr 50px;
    padding: var(--v-unit-4);
    grid-gap: var(--v-unit-8);
  }

  .plain-card:nth-child(even) {
    background-color: var(--v-color-surface);
  }
</style>
