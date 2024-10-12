<template>
  <div class="tgc-booster-pack"></div>
</template>

<script setup></script>

<style>
  body {
    &:has(.tgc-booster-pack) {
      overflow-y: hidden;
    }
  }
  .tgc-booster-pack {
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    height: 100vh;
    width: 100vw;
    background-color: var(--v-color-backdrop);
    z-index: calc(var(--v-z-index-knight) - 1);
    pointer-events: none;
    transition: var(--v-duration-fast) var(--v-easing-standard);
    transition-property: background-color, opacity;
  }
</style>
