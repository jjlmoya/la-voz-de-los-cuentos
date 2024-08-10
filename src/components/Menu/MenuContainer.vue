<template>
  <VNavigation class="navigation">
    <template #header>
      <VImage
        src="/assets/hero/title.png"
        aspectRatio="1/1"
        loading="lazy"
        alt="Logo"
      />
    </template>

    <slot />

    <template #footer>
      <VImage src="/assets/hero/owl-layer.png" loading="lazy" alt="Logo" />
    </template>
  </VNavigation>
</template>

<script setup>
  import { VImage, VNavigation } from '@overgaming/vicius'
</script>

<style scoped>
  .navigation {
    height: 100dvh;
  }
</style>
