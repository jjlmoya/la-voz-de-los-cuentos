<template>
  <div class="sections-newsletters">
    <NewsLettersCards
      v-for="newsletter in newsletters"
      :newsletter="newsletter"
    />
  </div>
</template>

<script setup>
  import NewsLettersCards from '../Cards/NewsLetters.vue'
  import useNewsLetters from '../../composables/useNewsLetters'

  const { getAll } = useNewsLetters()
  const newsletters = getAll()
  console.log({ newsletters })
</script>

<style scoped>
  .sections-newsletters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(600px, 100%), 1fr));
    grid-gap: var(--v-unit-8);
  }
</style>
