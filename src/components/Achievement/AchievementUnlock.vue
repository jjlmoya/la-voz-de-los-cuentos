<template>
  <Teleport to="body">
    <Transition name="achievement-unlock-v2">
      <div v-if="currentNotification" class="achievement-unlock-v2" @click.self="handleClose">
        <div class="achievement-unlock-v2__container" :class="containerClasses">
          <!-- Fondo mágico con gradiente -->
          <div class="achievement-unlock-v2__bg-glow" />

          <!-- Imagen de logro conseguido -->
          <div class="achievement-unlock-v2__image-wrapper">
            <div v-if="notification" class="achievement-unlock-v2__icon-frame">
              <img
                :src="getIconPath(notification.iconId)"
                :alt="notification.nameEs"
                class="achievement-unlock-v2__icon"
                @error="handleImageError"
              />
              <!-- Overlay de brillo para logros desbloqueados -->
              <div v-if="notification.type === 'unlock'" class="achievement-unlock-v2__shine" />
            </div>

            <!-- Fallback si no hay icono -->
            <img
              v-if="!notification || !notification.iconId"
              src="/assets/account/get-achievement.webp"
              alt="Achievement Unlocked"
              class="achievement-unlock-v2__fallback-image"
            />
          </div>

          <!-- Contenido -->
          <div class="achievement-unlock-v2__content">
            <p class="achievement-unlock-v2__label">
              {{
                notification?.type === 'unlock'
                  ? t('achievement.unlocked')
                  : t('achievement.progress') || 'Progreso'
              }}
            </p>

            <h2 class="achievement-unlock-v2__title">
              {{ notificationName }}
            </h2>

            <p class="achievement-unlock-v2__description">
              {{ notificationDescription }}
            </p>

            <!-- Barra de progreso (para notificaciones de progreso) -->
            <div v-if="notification?.type === 'progress'" class="achievement-unlock-v2__progress">
              <div class="achievement-unlock-v2__progress-bar">
                <div
                  class="achievement-unlock-v2__progress-fill"
                  :style="{ width: `${notification.progress}%` }"
                />
              </div>
              <p class="achievement-unlock-v2__progress-text">
                {{ notification.current }}/{{ notification.target }}
              </p>
            </div>
          </div>

          <!-- Botón para ir a logros (solo en desbloqueos) -->
          <a
            v-if="notification?.type === 'unlock'"
            :href="achievementsLink"
            class="achievement-unlock-v2__button"
            @click="handleClose"
          >
            {{ t('achievement.view') }}
          </a>

          <!-- Confeti mejorado -->
          <div
            v-for="i in 12"
            :key="i"
            class="achievement-unlock-v2__confetti"
            :style="getConfettiStyle(i)"
          />

          <!-- Partículas de brillo -->
          <div
            v-for="i in 6"
            :key="`spark-${i}`"
            class="achievement-unlock-v2__spark"
            :style="getSparkStyle(i)"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useAchievementNotification } from '../../composables/useAchievementNotification'
import { toAccountAchievements } from '../../router'
import t from '../../translations/index'

const { currentNotification, dismiss } = useAchievementNotification()

const notification = computed(() => {
  return currentNotification.value?.data || null
})

const notificationName = computed(() => {
  return notification.value ? t(notification.value.nameKey) : ''
})

const notificationDescription = computed(() => {
  return notification.value ? t(notification.value.descriptionKey) : ''
})

const containerClasses = computed(() => ({
  'achievement-unlock-v2__container--progress': notification.value?.type === 'progress',
  'achievement-unlock-v2__container--unlock': notification.value?.type === 'unlock'
}))

const achievementsLink = computed(() => toAccountAchievements())

function getIconPath(iconId, metadata) {
  if (!iconId) return '/assets/account/get-achievement.webp'

  const folder = metadata?.folder || 'read'
  return `/assets/achievements/${folder}/${iconId}.png`
}

function handleImageError(event) {
  console.warn('Failed to load achievement icon:', event.target.src)
  event.target.style.display = 'none'
}

function getConfettiStyle(index) {
  const angles = Array.from({ length: 12 }, (_, i) => (i * 360) / 12)
  const angle = angles[index - 1]
  const delay = (index * 0.05) % 0.6

  return {
    '--angle': angle,
    '--delay': `${delay}s`,
    animationDelay: `${delay}s`
  }
}

function getSparkStyle(index) {
  const angles = Array.from({ length: 6 }, (_, i) => (i * 360) / 6)
  const angle = angles[index - 1]
  const delay = (index * 0.1) % 0.5

  return {
    '--angle': angle,
    '--delay': `${delay}s`,
    animationDelay: `${delay}s`
  }
}

const handleClose = () => {
  dismiss()
}
</script>

<style scoped>
:root {
  --achievement-primary: #FFD700;
  --achievement-secondary: #FF9800;
  --achievement-accent: #E91E63;
}

.achievement-unlock-v2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 9999;
}

.achievement-unlock-v2__container {
  position: relative;
  border-radius: var(--v-radius-xl);
  padding: var(--v-unit-8);
  max-width: 450px;
  width: 90%;
  box-shadow: 0 25px 80px rgba(255, 193, 7, 0.3), 0 0 60px rgba(255, 193, 7, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: unlockPopIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
}

.achievement-unlock-v2__container--unlock {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.95), rgba(255, 235, 59, 0.95));
  border: 3px solid #FFD700;
}

.achievement-unlock-v2__container--progress {
  background: linear-gradient(135deg, rgba(76, 175, 255, 0.95), rgba(100, 200, 255, 0.95));
  border: 3px solid #42A5F5;
}

.achievement-unlock-v2__bg-glow {
  position: absolute;
  inset: 0;
  border-radius: var(--v-radius-xl);
  background: radial-gradient(ellipse at center, rgba(255, 193, 7, 0.2), transparent 70%);
  pointer-events: none;
}

.achievement-unlock-v2__image-wrapper {
  position: relative;
  z-index: 2;
  margin-bottom: var(--v-unit-6);
  animation: imageFloat 0.7s ease-out;
}

.achievement-unlock-v2__icon-frame {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 30px rgba(255, 193, 7, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: framePulse 2s ease-in-out infinite;
}

.achievement-unlock-v2__icon {
  width: 140px;
  height: 140px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4));
}

.achievement-unlock-v2__shine {
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  animation: shineRotate 3s linear infinite;
  pointer-events: none;
}

.achievement-unlock-v2__fallback-image {
  width: 140px;
  height: 140px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4));
  animation: imageBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.achievement-unlock-v2__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
  margin-bottom: var(--v-unit-4);
}

.achievement-unlock-v2__label {
  margin: 0;
  font-size: var(--v-font-size-xs);
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  text-shadow: 0 2px 4px rgba(255, 152, 0, 0.2);
}

.achievement-unlock-v2__title {
  margin: 0;
  font-size: var(--v-font-size-2xl);
  font-weight: 800;
  color: #FFFFFF;
  text-shadow: 2px 2px 8px rgba(255, 152, 0, 0.4), 0 0 10px rgba(255, 193, 7, 0.3);
  line-height: 1.2;
}

.achievement-unlock-v2__description {
  margin: 0;
  font-size: var(--v-font-size-md);
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.5;
}

/* Progreso */
.achievement-unlock-v2__progress {
  margin-top: var(--v-unit-4);
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
  width: 100%;
}

.achievement-unlock-v2__progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
}

.achievement-unlock-v2__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #42A5F5, #66BB6A);
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(66, 165, 245, 0.6);
}

.achievement-unlock-v2__progress-text {
  margin: 0;
  font-size: var(--v-font-size-sm);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

/* Botón */
.achievement-unlock-v2__button {
  position: relative;
  z-index: 2;
  padding: var(--v-unit-2) var(--v-unit-5);
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #FFD700;
  border-radius: var(--v-radius-lg);
  color: #000000;
  font-size: var(--v-font-size-md);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 6px 20px rgba(255, 193, 7, 0.4);
}

.achievement-unlock-v2__button:hover {
  background: #FFD700;
  color: #000000;
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(255, 193, 7, 0.6);
}

.achievement-unlock-v2__button:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
}

/* Confeti mejorado (12 piezas en círculo) */
.achievement-unlock-v2__confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.achievement-unlock-v2__confetti:nth-child(9) {
  background: #FFD700;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: confettiBurst 2.5s ease-out forwards;
}

.achievement-unlock-v2__confetti:nth-child(10) {
  background: #FF9800;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: confettiBurst 2.5s ease-out forwards;
}

.achievement-unlock-v2__confetti:nth-child(11) {
  background: #E91E63;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: confettiBurst 2.5s ease-out forwards;
}

.achievement-unlock-v2__confetti:nth-child(12) {
  background: #2196F3;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: confettiBurst 2.5s ease-out forwards;
}

/* Partículas de brillo (sparks) */
.achievement-unlock-v2__spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  animation: sparkShine 1.5s ease-out forwards;
}

/* Animaciones */
@keyframes unlockPopIn {
  0% {
    transform: scale(0.2) rotateX(20deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.08) rotateX(0deg);
  }
  100% {
    transform: scale(1) rotateX(0deg);
    opacity: 1;
  }
}

@keyframes imageFloat {
  0% {
    transform: translateY(-40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes iconSpin {
  0% {
    transform: rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: rotateY(360deg) rotateZ(360deg);
  }
}

@keyframes shineRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes framePulse {
  0%,
  100% {
    box-shadow: inset 0 0 30px rgba(255, 193, 7, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  50% {
    box-shadow: inset 0 0 40px rgba(255, 193, 7, 0.4), 0 12px 32px rgba(0, 0, 0, 0.2);
  }
}

@keyframes imageBounce {
  0% {
    transform: scale(0) rotateZ(-30deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.1) rotateZ(5deg);
  }
  100% {
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
  }
}

@keyframes confettiBurst {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx, 0), 350px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes sparkShine {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx, 0), var(--ty, 200px)) scale(0);
    opacity: 0;
  }
}

/* Transiciones */
.achievement-unlock-v2-enter-active,
.achievement-unlock-v2-leave-active {
  transition: opacity 0.4s ease;
}

.achievement-unlock-v2-enter-from,
.achievement-unlock-v2-leave-to {
  opacity: 0;
}

/* Mobile */
@media (max-width: 640px) {
  .achievement-unlock-v2__container {
    max-width: 95%;
    padding: var(--v-unit-6);
  }

  .achievement-unlock-v2__icon-frame {
    width: 140px;
    height: 140px;
  }

  .achievement-unlock-v2__icon {
    width: 120px;
    height: 120px;
  }

  .achievement-unlock-v2__fallback-image {
    width: 120px;
    height: 120px;
  }

  .achievement-unlock-v2__title {
    font-size: var(--v-font-size-xl);
  }

  .achievement-unlock-v2__description {
    font-size: var(--v-font-size-sm);
  }

  .achievement-unlock-v2__button {
    padding: var(--v-unit-2) var(--v-unit-4);
    font-size: var(--v-font-size-sm);
  }
}

/* Tablet */
@media (max-width: 768px) {
  .achievement-unlock-v2__container {
    max-width: 90%;
  }
}
</style>
