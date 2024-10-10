<template>
  <div class="tgc-card__front">
    <div class="tgc-card__layer tgc-card__image">
      <img :src="`/cards/${image}.webp`" alt="Front Image" />
    </div>
    <CardName :name="name" :size="size" />
    <Border />
  </div>
</template>

<script setup>
  import CardName from './Name.vue'
  import Border from './Border.vue'

  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    }
  })
</script>

<style>
  .tgc-card__front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    z-index: 2;
    transform: rotateY(0deg);
  }
</style>
