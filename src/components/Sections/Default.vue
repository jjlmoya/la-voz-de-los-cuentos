<template>
  <div class="section-default">
    <div class="section-default__header">
      <VText
        as="h2"
        class="section-default__title"
        variant="header"
        v-if="title"
      >
        {{ title }}
      </VText>
      <VLink
        v-if="moreLink"
        color="primary"
        :href="moreLink"
        class="section-default__more"
        >Ver mas</VLink
      >
    </div>
    <div class="section-default__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { VText, VLink } from '@overgaming/vicius'
  defineProps({
    title: {
      type: String,
      default: ''
    },
    moreLink: {
      required: false,
      type: String,
      default: ''
    }
  })
</script>

<style scoped>
  .section-default {
    padding-top: var(--v-unit-4);
    position: relative;
    display: grid;
    grid-gap: var(--v-unit-2) 0;
  }
  .section-default__title {
    font-size: 24px;
  }
  .section-default__header {
    display: grid;
    grid-auto-flow: column;
  }
  .section-default__more {
    justify-self: flex-end;
    align-self: center;
    font-size: 14px;
  }
</style>
