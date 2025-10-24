<template>
  <Transition name="level-up">
    <div v-if="isVisible" class="level-up-modal-backdrop">
      <div class="level-up-modal">
        <!-- Celebration Character -->
        <div class="level-up-celebration">
          <img
            src="/assets/account/dashboard-assets/level-up-celebration.png"
            alt="celebration"
            class="celebration-image"
          />
        </div>

        <!-- Level Up Message -->
        <div class="level-up-content">
          <h2 class="level-up-title">{{ t('gamification.levelUp.title') }}</h2>

          <div class="level-badge-display">
            <img
              :src="`/assets/account/dashboard-assets/avatar-level-${newLevel}.png`"
              :alt="`Level ${newLevel}`"
              class="level-avatar"
            />
            <div class="level-number">{{ newLevel }}</div>
          </div>

          <p class="level-up-message">
            {{ newTitle }}
          </p>

          <p class="level-up-subtitle">
            {{ t('gamification.levelUp.celebration') }}
          </p>

          <!-- XP Earned Display -->
          <div class="xp-earned-box">
            <span class="xp-earned-label">{{ t('gamification.xp.earned') }}</span>
            <span class="xp-earned-value">+{{ xpGained }} XP</span>
          </div>

          <!-- Action Button -->
          <button class="level-up-button" @click="closeModal">
            {{ t('account.dashboard.start') }}
          </button>
        </div>

        <!-- Confetti/Celebration Effects (CSS animations) -->
        <div class="celebration-effect celebration-effect--1"></div>
        <div class="celebration-effect celebration-effect--2"></div>
        <div class="celebration-effect celebration-effect--3"></div>
        <div class="celebration-effect celebration-effect--4"></div>
        <div class="celebration-effect celebration-effect--5"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import t from '../../translations'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  newLevel: {
    type: Number,
    required: true
  },
  newTitle: {
    type: String,
    required: true
  },
  xpGained: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

const isVisible = ref(false)

watch(
  () => props.isOpen,
  (newVal) => {
    isVisible.value = newVal
    if (newVal) {
      // Auto-close after 4 seconds
      setTimeout(() => {
        closeModal()
      }, 4000)
    }
  }
)

function closeModal() {
  isVisible.value = false
  emit('close')
}
</script>

<style scoped>
.level-up-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--v-unit-4);
}

.level-up-modal {
  position: relative;
  background: linear-gradient(135deg, var(--v-color-accent-primary-alpha-20), var(--v-color-primary-alpha-10));
  border: 3px solid var(--v-color-primary);
  border-radius: var(--v-radius-xl);
  padding: var(--v-unit-8);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--v-unit-6);
  box-shadow: 0 20px 60px rgba(33, 150, 243, 0.4);
  animation: modalEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalEnter {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Celebration Character */
.level-up-celebration {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.celebration-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Level Up Content */
.level-up-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--v-unit-4);
  text-align: center;
}

.level-up-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: var(--v-color-primary);
  animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Level Badge Display */
.level-badge-display {
  position: relative;
  width: 140px;
  height: 140px;
  animation: zoomIn 0.6s ease-out 0.2s both;
}

@keyframes zoomIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.level-avatar {
  width: 100%;
  height: 100%;
  border-radius: var(--v-radius-lg);
  border: 4px solid var(--v-color-primary);
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3);
}

.level-number {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--v-color-accent-primary), var(--v-color-primary));
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.level-up-message {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--v-color-primary);
  animation: slideDown 0.6s ease-out 0.3s both;
}

.level-up-subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--v-color-text-medium);
  animation: slideDown 0.6s ease-out 0.4s both;
}

/* XP Earned Box */
.xp-earned-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--v-unit-2);
  padding: var(--v-unit-4) var(--v-unit-6);
  background: var(--v-color-primary-alpha-20);
  border-radius: var(--v-radius-lg);
  border: 2px dashed var(--v-color-primary);
  animation: slideDown 0.6s ease-out 0.5s both;
}

.xp-earned-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--v-color-text-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.xp-earned-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--v-color-primary);
}

/* Action Button */
.level-up-button {
  padding: var(--v-unit-3) var(--v-unit-8);
  background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
  color: white;
  border: none;
  border-radius: var(--v-radius-lg);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: slideDown 0.6s ease-out 0.6s both;
}

.level-up-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.4);
}

.level-up-button:active {
  transform: translateY(-2px);
}

/* Celebration Effects */
.celebration-effect {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--v-color-primary);
  border-radius: 50%;
  pointer-events: none;
}

.celebration-effect--1 {
  top: 20px;
  left: 10%;
  animation: confetti 3s ease-out forwards;
  background: var(--v-color-primary);
}

.celebration-effect--2 {
  top: 20px;
  right: 10%;
  animation: confetti 3s ease-out 0.2s forwards;
  background: var(--v-color-accent-primary);
}

.celebration-effect--3 {
  top: 30%;
  left: 5%;
  animation: confetti 3s ease-out 0.4s forwards;
  background: #4CAF50;
}

.celebration-effect--4 {
  top: 30%;
  right: 5%;
  animation: confetti 3s ease-out 0.6s forwards;
  background: #FF9800;
}

.celebration-effect--5 {
  top: 50%;
  left: 50%;
  animation: confetti 3s ease-out 0.8s forwards;
  background: #9C27B0;
  transform: translateX(-50%);
}

@keyframes confetti {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(400px) translateX(100px) rotate(720deg);
    opacity: 0;
  }
}

/* Transitions */
.level-up-enter-active,
.level-up-leave-active {
  transition: opacity 0.3s ease;
}

.level-up-enter-from,
.level-up-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .level-up-modal {
    padding: var(--v-unit-6);
    max-width: 90vw;
  }

  .level-up-title {
    font-size: 24px;
  }

  .level-up-message {
    font-size: 16px;
  }

  .celebration-image {
    width: 120px;
    height: 120px;
  }

  .level-badge-display {
    width: 100px;
    height: 100px;
  }

  .level-number {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>
