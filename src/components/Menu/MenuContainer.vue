<template>
  <VNavigation class="menu-container">
    <template #header>
      <VImage
        src="/assets/hero/title.png"
        aspectRatio="1/1"
        loading="lazy"
        alt="Logo"
      ></VImage>
    </template>
    <div class="menu-container-content">
      <slot></slot>
    </div>
    <template #footer>
      <VImage
        src="/assets/hero/owl-layer.png"
        loading="lazy"
        alt="Logo"
      ></VImage>
    </template>
  </VNavigation>
</template>

<script setup>
  import { VImage, VNavigation } from '@overgaming/vicius'
</script>

<style scoped>
  .menu-container {
    top: 0;
    position: sticky;
    display: grid;
    height: 100vh;
    background-color: var(--v-color-surface-mod);
  }

  .menu-container-content {
    padding: var(--v-unit-4);
  }
</style>
