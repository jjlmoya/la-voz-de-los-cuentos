<template>
  <div class="custom-share-gate">
    <div class="custom-share-gate__container">
      <div class="custom-share-gate__animation">
        <div class="custom-share-gate__icon">🔒</div>
        <div class="custom-share-gate__stars">
          <span v-for="i in 5" :key="i" class="custom-share-gate__star"
            >✨</span
          >
        </div>
      </div>

      <h2 class="custom-share-gate__title">
        {{ t('page.custom.sharegate.title') || 'Uno más para desbloquear' }}
      </h2>

      <p class="custom-share-gate__description">
        {{
          t('page.custom.sharegate.description') ||
          'Ayúdanos a compartir la magia con más gente. Comparte la página o un cuento/canción y desbloquea el acceso a crear tu historia personalizada.'
        }}
      </p>

      <div class="custom-share-gate__options">
        <div class="custom-share-gate__option">
          <h3 class="custom-share-gate__option-title">
            {{ t('page.custom.sharegate.option1') || 'Opción 1: Comparte esta página' }}
          </h3>
          <SocialShare
            :url="mainPageUrl"
            :title="shareTitle"
            :label="false"
            :onShare="onShareSuccess"
            class="custom-share-gate__share-buttons"
          />
        </div>

        <div class="custom-share-gate__divider">
          <span>{{ t('page.custom.sharegate.or') || 'O' }}</span>
        </div>

        <div class="custom-share-gate__option">
          <h3 class="custom-share-gate__option-title">
            {{
              t('page.custom.sharegate.option2') || 'Opción 2: Comparte una historia o canción'
            }}
          </h3>
          <p class="custom-share-gate__option-description">
            {{
              t('page.custom.sharegate.option2.description') ||
              'Ve a cualquier cuento o canción y comparte desde allí'
            }}
          </p>
          <VButton
            @click="goToStories"
            variant="secondary"
            class="custom-share-gate__button"
          >
            {{
              t('page.custom.sharegate.exploreStories') ||
              'Explorar Cuentos'
            }}
            →
          </VButton>
        </div>
      </div>

      <div class="custom-share-gate__stats">
        <div class="custom-share-gate__stat">
          <div class="custom-share-gate__stat-number">{{ shareCount }}</div>
          <div class="custom-share-gate__stat-label">
            {{
              t('page.custom.sharegate.timesShared') || 'veces compartido'
            }}
          </div>
        </div>
        <div class="custom-share-gate__stat">
          <div class="custom-share-gate__stat-icon">📍</div>
          <div class="custom-share-gate__stat-label">
            {{
              t('page.custom.sharegate.helped') ||
              'Personas ayudadas'
            }}
          </div>
        </div>
      </div>

      <div
        v-if="hasShared"
        class="custom-share-gate__success"
      >
        <div class="custom-share-gate__success-icon">🎉</div>
        <p class="custom-share-gate__success-text">
          {{
            t('page.custom.sharegate.success') ||
            '¡Gracias! Ya puedes continuar con tu cuento.'
          }}
        </p>
        <VButton
          @click="$emit('proceed')"
          class="custom-share-gate__success-button"
        >
          {{
            t('page.custom.sharegate.continue') || 'Continuar'
          }}
        </VButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import t from '../../translations'
  import { VButton } from '@overgaming/vicius'
  import SocialShare from '../Social/Share.vue'
  import { toStories } from '../../router'

  const props = defineProps({
    mainPageUrl: {
      type: String,
      default: '/'
    },
    shareCount: {
      type: Number,
      default: 0
    },
    hasShared: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['share-success', 'proceed'])

  const shareTitle = computed(() => {
    return (
      t('page.custom.sharegate.shareText') ||
      'Crea tu propio cuento personalizado en La Voz de los Cuentos'
    )
  })

  const onShareSuccess = () => {
    emit('share-success')
  }

  const goToStories = () => {
    window.location.href = toStories()
  }
</script>

<style scoped>
  .custom-share-gate {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: var(--v-unit-8);
  }

  .custom-share-gate__container {
    max-width: 600px;
    width: 100%;
    text-align: center;
  }

  .custom-share-gate__animation {
    position: relative;
    margin-bottom: var(--v-unit-6);
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-share-gate__icon {
    font-size: 48px;
    animation: bounce 2s ease-in-out infinite;
  }

  .custom-share-gate__stars {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .custom-share-gate__star {
    position: absolute;
    font-size: 24px;
    animation: float 3s ease-in-out infinite;
    opacity: 0.6;
  }

  .custom-share-gate__star:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .custom-share-gate__star:nth-child(2) {
    top: 20%;
    right: 10%;
    animation-delay: 0.4s;
  }

  .custom-share-gate__star:nth-child(3) {
    bottom: 15%;
    left: 15%;
    animation-delay: 0.8s;
  }

  .custom-share-gate__star:nth-child(4) {
    top: 30%;
    left: 50%;
    animation-delay: 1.2s;
  }

  .custom-share-gate__star:nth-child(5) {
    bottom: 20%;
    right: 15%;
    animation-delay: 1.6s;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-20px) scale(1.1);
      opacity: 1;
    }
  }

  .custom-share-gate__title {
    font-size: 28px;
    font-weight: 800;
    color: var(--v-color-text-high);
    margin: 0 0 var(--v-unit-3) 0;
  }

  .custom-share-gate__description {
    font-size: 16px;
    color: var(--v-color-text-medium);
    margin: 0 0 var(--v-unit-6) 0;
    line-height: 1.6;
  }

  .custom-share-gate__options {
    background: var(--v-color-surface-high);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
    border-radius: var(--v-radius-lg);
    padding: var(--v-unit-6);
    margin-bottom: var(--v-unit-6);
  }

  .custom-share-gate__option {
    text-align: center;
  }

  .custom-share-gate__option-title {
    margin: 0 0 var(--v-unit-3) 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .custom-share-gate__option-description {
    margin: 0 0 var(--v-unit-3) 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
  }

  .custom-share-gate__share-buttons {
    margin-bottom: var(--v-unit-4);
  }

  .custom-share-gate__button {
    width: 100%;
  }

  .custom-share-gate__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--v-unit-2);
    margin: var(--v-unit-4) 0;
    color: var(--v-color-text-medium);
    font-weight: 600;
  }

  .custom-share-gate__divider::before,
  .custom-share-gate__divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(var(--v-color-primary-rgb), 0.1);
  }

  .custom-share-gate__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--v-unit-4);
    margin-bottom: var(--v-unit-6);
  }

  .custom-share-gate__stat {
    padding: var(--v-unit-3);
    background: rgba(var(--v-color-primary-rgb), 0.05);
    border-radius: var(--v-radius-md);
  }

  .custom-share-gate__stat-number {
    font-size: 24px;
    font-weight: 800;
    color: var(--v-color-primary);
    margin-bottom: var(--v-unit-1);
  }

  .custom-share-gate__stat-icon {
    font-size: 28px;
    margin-bottom: var(--v-unit-1);
  }

  .custom-share-gate__stat-label {
    font-size: 12px;
    color: var(--v-color-text-medium);
    font-weight: 600;
  }

  .custom-share-gate__success {
    padding: var(--v-unit-6);
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
    border: 2px solid #22c55e;
    border-radius: var(--v-radius-lg);
    animation: slideUp 0.4s ease;
  }

  .custom-share-gate__success-icon {
    font-size: 48px;
    margin-bottom: var(--v-unit-2);
    display: block;
    animation: bounce 0.6s ease;
  }

  .custom-share-gate__success-text {
    margin: 0 0 var(--v-unit-4) 0;
    font-size: 16px;
    color: #22c55e;
    font-weight: 600;
  }

  .custom-share-gate__success-button {
    width: 100%;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .custom-share-gate {
      min-height: auto;
      padding: var(--v-unit-4);
    }

    .custom-share-gate__title {
      font-size: 20px;
    }

    .custom-share-gate__description {
      font-size: 14px;
    }

    .custom-share-gate__options {
      padding: var(--v-unit-4);
    }

    .custom-share-gate__option-title {
      font-size: 14px;
    }

    .custom-share-gate__stats {
      gap: var(--v-unit-2);
    }
  }
</style>
