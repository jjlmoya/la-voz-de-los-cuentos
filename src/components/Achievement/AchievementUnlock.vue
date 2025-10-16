<template>
  <Teleport to="body">
    <Transition name="achievement-unlock">
      <div v-if="isVisible" class="achievement-unlock">
        <div class="achievement-unlock__container">
          <!-- Imagen de logro conseguido -->
          <div class="achievement-unlock__image-wrapper">
            <img
              src="/assets/account/get-achievement.webp"
              alt="Achievement Unlocked"
              class="achievement-unlock__image"
            />
          </div>

          <!-- Título -->
          <div class="achievement-unlock__content">
            <p class="achievement-unlock__label">{{ t('achievement.unlocked') }}</p>
            <h2 class="achievement-unlock__title">{{ achievement.name }}</h2>
            <p class="achievement-unlock__description">{{ achievement.description }}</p>
          </div>

          <!-- Confeti opcional -->
          <div v-for="i in 8" :key="i" class="achievement-unlock__confetti" :style="{ animationDelay: `${i * 0.1}s` }" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import t from '../../translations'

  const props = defineProps({
    achievement: {
      type: Object,
      default: () => ({
        name: 'Achievement',
        description: 'You have unlocked a new achievement!'
      })
    },
    duration: {
      type: Number,
      default: 4000 // 4 segundos
    },
    show: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['close'])

  const isVisible = ref(false)

  watch(
    () => props.show,
    (newVal) => {
      if (newVal) {
        isVisible.value = true
        // Auto-close después del tiempo especificado
        setTimeout(() => {
          isVisible.value = false
          emit('close')
        }, props.duration)
      }
    }
  )
</script>

<style scoped>
  .achievement-unlock {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
  }

  .achievement-unlock__container {
    position: relative;
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.95), rgba(255, 235, 59, 0.95));
    border: 3px solid #FFD700;
    border-radius: var(--v-radius-xl);
    padding: var(--v-unit-8);
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(255, 193, 7, 0.4), 0 0 40px rgba(255, 193, 7, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .achievement-unlock__image-wrapper {
    margin-bottom: var(--v-unit-4);
    animation: bounceDown 0.6s ease-out;
  }

  .achievement-unlock__image {
    width: 120px;
    height: 120px;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4));
    animation: spin 2s linear infinite;
  }

  .achievement-unlock__content {
    gap: var(--v-unit-2);
  }

  .achievement-unlock__label {
    margin: 0;
    font-size: var(--v-font-size-sm);
    font-weight: 700;
    color: #FF6F00;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .achievement-unlock__title {
    margin: var(--v-unit-2) 0;
    font-size: var(--v-font-size-xl);
    font-weight: 700;
    color: #FFFFFF;
    text-shadow: 2px 2px 4px rgba(255, 152, 0, 0.3);
  }

  .achievement-unlock__description {
    margin: var(--v-unit-2) 0 0 0;
    font-size: var(--v-font-size-md);
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.4;
  }

  /* Confeti */
  .achievement-unlock__confetti {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #FFD700;
    border-radius: 50%;
    pointer-events: none;
    animation: confettiFall 3s ease-out forwards;
  }

  .achievement-unlock__confetti:nth-child(1) {
    left: 10%;
    top: -10px;
    background: #FFD700;
  }

  .achievement-unlock__confetti:nth-child(2) {
    left: 20%;
    top: -10px;
    background: #FF9800;
  }

  .achievement-unlock__confetti:nth-child(3) {
    left: 30%;
    top: -10px;
    background: #E91E63;
  }

  .achievement-unlock__confetti:nth-child(4) {
    left: 40%;
    top: -10px;
    background: #2196F3;
  }

  .achievement-unlock__confetti:nth-child(5) {
    right: 40%;
    top: -10px;
    background: #4CAF50;
  }

  .achievement-unlock__confetti:nth-child(6) {
    right: 30%;
    top: -10px;
    background: #9C27B0;
  }

  .achievement-unlock__confetti:nth-child(7) {
    right: 20%;
    top: -10px;
    background: #00BCD4;
  }

  .achievement-unlock__confetti:nth-child(8) {
    right: 10%;
    top: -10px;
    background: #FF5722;
  }

  /* Animaciones */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popIn {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes bounceDown {
    0% {
      transform: translateY(-30px);
      opacity: 0;
    }
    60% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes confettiFall {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(300px) translateX(var(--tx)) rotate(360deg);
      opacity: 0;
    }
  }

  .achievement-unlock__confetti:nth-child(1) {
    --tx: -80px;
  }

  .achievement-unlock__confetti:nth-child(2) {
    --tx: -60px;
  }

  .achievement-unlock__confetti:nth-child(3) {
    --tx: -40px;
  }

  .achievement-unlock__confetti:nth-child(4) {
    --tx: -20px;
  }

  .achievement-unlock__confetti:nth-child(5) {
    --tx: 20px;
  }

  .achievement-unlock__confetti:nth-child(6) {
    --tx: 40px;
  }

  .achievement-unlock__confetti:nth-child(7) {
    --tx: 60px;
  }

  .achievement-unlock__confetti:nth-child(8) {
    --tx: 80px;
  }

  /* Transiciones */
  .achievement-unlock-enter-active,
  .achievement-unlock-leave-active {
    transition: opacity 0.3s ease;
  }

  .achievement-unlock-enter-from,
  .achievement-unlock-leave-to {
    opacity: 0;
  }

  /* Mobile */
  @media (max-width: 640px) {
    .achievement-unlock__container {
      max-width: 90%;
      padding: var(--v-unit-6);
    }

    .achievement-unlock__image {
      width: 100px;
      height: 100px;
    }

    .achievement-unlock__title {
      font-size: var(--v-font-size-lg);
    }

    .achievement-unlock__description {
      font-size: var(--v-font-size-sm);
    }
  }
</style>
