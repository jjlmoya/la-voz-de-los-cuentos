<template>
  <a class="description-card" :href="toSaga(slug)">
    <div class="description-card__wrapper">
      <div class="description-card__content">
        <VText variant="header">{{ title }}</VText>
        <VText max-lines="4" variant="body">
          <div v-html="content"></div>
        </VText>
      </div>
      <div class="description-card__image">
        <VImage
          aspectRation="1/1"
          :src="`/assets/sagas/${lang}/${slug}.webp`"
        />
      </div>
    </div>
  </a>
</template>

<script setup>
  const lang = import.meta.env.PUBLIC_LANG
  import { VImage, VText } from '@overgaming/vicius'
  import { toSaga } from '../../router'
  defineProps({
    title: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    isStory: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    }
  })
</script>

<style scoped>
  .description-card {
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-2);
    overflow: hidden;
    min-height: 250px;
  }
  .description-card__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }

  .description-card__content {
    padding: var(--v-unit-8);
    display: grid;
    align-self: center;
    gap: var(--v-unit-4);
  }

  .description-card__image {
    position: relative;
    display: grid;
  }
  .description-card__image .v-image {
    position: absolute;
    transform: rotate(25deg);
    margin-left: 16px;
    top: 50px;
  }
</style>
