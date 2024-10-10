<template>
  <div
    class="tgc-card"
    :class="[{ 'tgc-card--flipped': isFlipped }, sizeClass]"
    @click="flipCard"
    @mousemove="rotateCard"
    @mouseleave="resetRotation"
  >
    <div class="tgc-card__content" :style="cardStyle">
      <div class="tgc-card__front">
        <div class="tgc-card__layer tgc-card__image">
          <img :src="`/cards/${image}.webp`" alt="Front Image" />
        </div>
        <div v-if="name" class="tgc-card__header">{{ name }}</div>
        <div class="tgc-card__layer tgc-card__border-fill">
          <img src="/cards/structure/border-fill.webp" alt="Border" />
        </div>
        <div class="tgc-card__layer tgc-card__border">
          <img src="/cards/structure/border.webp" alt="Border" />
        </div>
      </div>
      <div class="tgc-card__back">
        <div class="tgc-card__layer tgc-card__image">
          <img :src="`/cards/rear.webp`" alt="Back Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    size: {
      type: String,
      default: 'md'
    },
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'sample'
    }
  })

  const isFlipped = ref(false)
  const rotateX = ref(0)
  const rotateY = ref(0)

  const flipCard = () => {
    isFlipped.value = !isFlipped.value
    if (isFlipped.value) {
      resetRotation()
    }
  }

  const rotateCard = event => {
    if (isFlipped.value) return

    const card = event.currentTarget
    const cardRect = card.getBoundingClientRect()
    const cardWidth = cardRect.width
    const cardHeight = cardRect.height
    const centerX = cardRect.left + cardWidth / 2
    const centerY = cardRect.top + cardHeight / 2
    const mouseX = event.clientX
    const mouseY = event.clientY

    rotateY.value = ((mouseX - centerX) / cardWidth) * 30
    rotateX.value = ((centerY - mouseY) / cardHeight) * 30
  }

  const resetRotation = () => {
    rotateX.value = 0
    rotateY.value = 0
  }

  const cardStyle = computed(() => {
    if (isFlipped.value) {
      return {
        transform: 'rotateY(180deg)',
        transition: 'transform 0.3s ease-out'
      }
    }
    return {
      transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
      transition: 'transform 0.3s ease-out'
    }
  })

  const sizeClass = computed(() => {
    return {
      'tgc-card--xxs': props.size === 'xxs',
      'tgc-card--xs': props.size === 'xs',
      'tgc-card--md': props.size === 'md',
      'tgc-card--xl': props.size === 'xl'
    }
  })
</script>

<style scoped>
  .tgc-card {
    perspective: 1000px;
    cursor: pointer;
  }

  .tgc-card__content {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
  }

  .tgc-card__front,
  .tgc-card__back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .tgc-card__front {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .tgc-card__back {
    transform: rotateY(180deg);
  }

  .tgc-card__layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
  }

  .tgc-card__border img,
  .tgc-card__image img {
    object-fit: cover;
  }

  .tgc-card__border img {
    /*filter: invert(42%) sepia(95%) saturate(679%) hue-rotate(187deg) brightness(91%) contrast(96%);*/
    filter: invert(36%) sepia(18%) saturate(1639%) hue-rotate(115deg) brightness(93%) contrast(84%);
  }

  .tgc-card__header {
    position: absolute;
    background-color: var(--v-color-primary);
    font-weight: 500;
    color: white;
    border-radius: 0 0 5px 0;;
  }

  .tgc-card--xxs {
    width: 60px;
    height: 100px;
    .tgc-card__image img {
      border-radius: 4px;
    }
    .tgc-card__header {
      left: 1px;
      top: 1px;
      border: 1px solid var(--v-color-primary);
      padding: 0 var(--v-unit-1);
      font-size: 8px;
      line-height: 12px;
    }
  }

  .tgc-card--xs {
    width: 120px;
    height: 200px;
    .tgc-card__image img {
      border-radius: 6px;
    }
     .tgc-card__header {
      left: 2px;
      top: 2px;
      border: 1px solid var(--v-color-primary);
      padding: 0 var(--v-unit-1);
      font-size: 10px;
      line-height: 16px;
    }
  }

  .tgc-card--md {
    width: 168px;
    height: 300px;
    .tgc-card__image img {
      border-radius: 8px;
    }
    .tgc-card__header {
      left: 2px;
      top: 2px;
      border: 2px solid var(--v-color-primary);
      padding: 0 var(--v-unit-1);
      font-size: 12px;
      line-height: 18px;
    }
  }

  .tgc-card--xl {
    width: 300px;
    height: 500px;
    .tgc-card__image img {
      border-radius: 16px;
    }
    .tgc-card__header {
      top: 5px;
      left: 5px;
      padding: var(--v-unit-1) var(--v-unit-2);
      border: 2px solid var(--v-color-primary);
      line-height: 18px;
      font-size: 14px;
    }
  }
</style>
