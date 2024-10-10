<template>
  <div
    class="tgc-card"
    :class="[{ 'tgc-card--flipped': isFlipped }, `tgc-card--${size}`]"
    @click="flipCard"
    @mousemove="rotateCard"
    @mouseleave="resetRotation"
  >
    <div class="tgc-card__content" :style="cardStyle">
      <Front :name="name" :image="image" :size="size" />
      <Back />
    </div>
  </div>
</template>

<script setup>
  import Back from './Details/Back.vue'
  import Front from './Details/Front.vue'
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
      default: 'default'
    },
    flipped: {
      type: Boolean,
      default: false
    }
  })

  const isFlipped = ref(props.flipped)
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
</script>

<style>
  .tgc-card {
    perspective: 250px;
    cursor: pointer;
  }

  .tgc-card__content {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
  }

  .tgc-card__layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
  }
 
  .tgc-card--xxs {
    width: 60px;
    height: 100px;
    .tgc-card__image img {
      border-radius: 4px;
    }
  }

  .tgc-card--xs {
    width: 120px;
    height: 200px;
    .tgc-card__image img {
      border-radius: 6px;
    }
  }

  .tgc-card--md {
    width: 168px;
    height: 300px;
    .tgc-card__image img {
      border-radius: 8px;
    }
  }

  .tgc-card--xl {
    width: 300px;
    height: 500px;
    .tgc-card__image img {
      border-radius: 16px;
    }
  }
</style>
