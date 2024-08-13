<template>
  <a class="newsletter-card" :href="toNewsLetter(newsletter.id)">
    <VLink class="newsletter-card__element"
      >#{{ newsletter.id }} - {{ newsletter.title }}</VLink
    >
  </a>
</template>

<script setup>
  import { toNewsLetter } from '../../router'
  import { VLink } from '@overgaming/vicius'
  defineProps({
    newsletter: {
      type: Object,
      default: {}
    }
  })
</script>

<style scoped>
  .newsletter-card {
    display: grid;
    grid-template-columns: 4fr 2fr 50px;
    padding: var(--v-unit-2);
    border-radius: var(--v-unit-2);
    grid-gap: var(--v-unit-8);
    text-decoration: underline;
  }
</style>
