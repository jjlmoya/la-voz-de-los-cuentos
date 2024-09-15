<template>
  <VNavigation class="navigation">
    <template #header>
      <VImage
        class="navigation__image navigation__image-logo"
        :src="`/assets/logo/${lang}.webp`"
        aspectRatio="1/1"
        loading="eager"
        alt="Logo"
      />
    </template>

    <slot />

    <template #footer>
      <VImage
        class="navigation__image"
        :src="`/assets/utils/header-bottom.webp`"
        loading="lazy"
        alt="Logo"
      />
    </template>
  </VNavigation>
</template>

<script setup>
  const lang = import.meta.env.PUBLIC_LANG
  import { VImage, VNavigation } from '@overgaming/vicius'
</script>

<style scoped>
  .navigation {
    height: 100dvh;
  }
  .navigation__image {
    background-color: var(--v-color-surface);
    margin: 0 auto;
  }
  .navigation__image-logo {
    max-width: 175px;
  }
</style>
