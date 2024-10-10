<template>
  <div class="tgc-card__back">
    <div class="tgc-card__layer tgc-card__image">
      <img :src="`/cards/rear.webp`" alt="Back Image" />
    </div>
    <Border />
  </div>
</template>

<script setup>
  import Border from './Border.vue'
</script>

<style>
  .tgc-card__back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }
</style>
