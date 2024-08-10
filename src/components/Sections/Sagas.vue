<template>
  <div class="sections-new">
    <DescriptionCard
      v-for="saga in sagas"
      :slug="saga.key"
      :isStory="false"
      :key="saga.key"
      :title="saga.name"
      :content="saga.description"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    amount: {
      type: Number,
      default: 7
    }
  })
  import DescriptionCard from '../Cards/Description.vue'
  import useSagas from '../../composables/useSagas'

  const { getLastNSagas } = useSagas()
  const sagas = getLastNSagas(props.amount)
</script>

<style scoped>
  .sections-new {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    grid-gap: var(--v-unit-8);
  }
</style>
