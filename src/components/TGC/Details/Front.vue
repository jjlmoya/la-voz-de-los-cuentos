<template>
  <div class="tgc-card__front">
    <div class="tgc-card__layer tgc-card__image" :class="{'tgc-card__front--disable': !hasCard}">
      <img v-if="hasCard" class="tgc-card-image__content" :src="`/cards/${image}.webp`" alt="Front Image" />
      <img v-if="!hasCard" class="tgc-card-image__content--disabled" src="/cards/unknown.webp" alt="Front Image" />
    </div>
    <CardName :hasCard :name="name" :size="size" />
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
    },
    hasCard: {
      type: Boolean,
      default: false
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
  .tgc-card__front--disable {
    opacity: 0.7;
    filter: grayscale(100%);
  }
</style>
