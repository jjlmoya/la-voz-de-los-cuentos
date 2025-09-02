<template>
  <div class="section-default animate-fadeInUp">
    <div class="section-default__header stagger-children">
      <VText
        as="h2"
        class="section-default__title typing-animation animate-rainbow"
        variant="header"
        color="high"
        v-if="title"
      >
        {{ title }}
      </VText>
      <VLink
        v-if="moreLink"
        color="primary"
        :href="moreLink"
        class="section-default__more link-playful animate-bounce animate-delay-3"
        >{{ t('sections.default.more') }}</VLink
      >
    </div>
    <div class="section-default__content animate-fadeInUp animate-delay-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'
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
