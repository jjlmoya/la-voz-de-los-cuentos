<template>
  <a class="newsletter-card" :href="`/newsletter/${newsletter.id}/`">
    <VLink class="newsletter-card__element"
      >#{{ newsletter.id }} - {{ newsletter.title }}</VLink
    >
  </a>
</template>

<script setup>
  import { VText } from '@overgaming/vicius'
  defineProps({
    newsletter: {
      type: Object,
      default: {}
    }
  })
</script>

<style scoped>
  .newsletter-card {
    min-height: 60vh;
    display: grid;
    grid-template-columns: 4fr 2fr 50px;
    padding: var(--v-unit-2);
    border-radius: var(--v-unit-2);
    grid-gap: var(--v-unit-8);
    text-decoration: underline;
  }
</style>
