<template>
  <transition name="custom-draft-banner-slide">
    <div
      v-if="showBanner && hasDraft"
      class="custom-draft-banner"
    >
      <div class="custom-draft-banner__content">
        <div class="custom-draft-banner__icon">📝</div>
        <div class="custom-draft-banner__info">
          <p class="custom-draft-banner__title">
            {{ t('page.custom.draft.saved') }}
          </p>
          <p class="custom-draft-banner__details">
            {{ draftInfo.lastModified }}
            <span class="custom-draft-banner__progress">
              ({{ draftInfo.progress }}% completado)
            </span>
          </p>
        </div>
      </div>

      <div class="custom-draft-banner__actions">
        <button
          class="custom-draft-banner__button custom-draft-banner__button--primary"
          @click="onLoadDraft"
        >
          {{ t('page.custom.draft.continue') }}
        </button>
        <button
          class="custom-draft-banner__button custom-draft-banner__button--secondary"
          @click="onDiscardDraft"
        >
          {{ t('page.custom.draft.discard') }}
        </button>
      </div>

      <button
        class="custom-draft-banner__close"
        @click="closeBanner"
        :aria-label="t('page.custom.draft.close')"
      >
        ✕
      </button>
    </div>
  </transition>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import t from '../../translations'

  const props = defineProps({
    hasDraft: {
      type: Boolean,
      default: false
    },
    draftInfo: {
      type: Object,
      default: () => ({
        lastModified: '',
        progress: 0
      })
    }
  })

  const emit = defineEmits(['load', 'discard', 'close'])

  const showBanner = ref(true)

  const onLoadDraft = () => {
    showBanner.value = false
    emit('load')
  }

  const onDiscardDraft = () => {
    showBanner.value = false
    emit('discard')
  }

  const closeBanner = () => {
    showBanner.value = false
    emit('close')
  }

  onMounted(() => {
    if (!props.hasDraft) {
      showBanner.value = false
    }
  })
</script>

<style scoped>
  .custom-draft-banner {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: var(--v-unit-3);
    padding: var(--v-unit-3) var(--v-unit-4);
    margin-bottom: var(--v-unit-4);
    background: linear-gradient(135deg, rgba(var(--v-color-primary-rgb), 0.1) 0%, rgba(var(--v-color-accent-primary-rgb), 0.05) 100%);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.2);
    border-radius: var(--v-radius-lg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    animation: slideDown 0.3s ease;
  }

  .custom-draft-banner__content {
    display: flex;
    align-items: center;
    gap: var(--v-unit-3);
  }

  .custom-draft-banner__icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .custom-draft-banner__info {
    text-align: left;
  }

  .custom-draft-banner__title {
    margin: 0;
    font-weight: 600;
    color: var(--v-color-text-high);
    font-size: 14px;
  }

  .custom-draft-banner__details {
    margin: var(--v-unit-1) 0 0 0;
    font-size: 12px;
    color: var(--v-color-text-medium);
  }

  .custom-draft-banner__progress {
    color: var(--v-color-primary);
    font-weight: 600;
  }

  .custom-draft-banner__actions {
    display: flex;
    gap: var(--v-unit-2);
  }

  .custom-draft-banner__button {
    padding: var(--v-unit-2) var(--v-unit-3);
    border: none;
    border-radius: var(--v-radius-md);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .custom-draft-banner__button--primary {
    background: var(--v-color-primary);
    color: white;
  }

  .custom-draft-banner__button--primary:hover {
    background: var(--v-color-accent-primary);
    transform: translateY(-2px);
  }

  .custom-draft-banner__button--secondary {
    background: transparent;
    color: var(--v-color-text-medium);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.2);
  }

  .custom-draft-banner__button--secondary:hover {
    background: rgba(var(--v-color-primary-rgb), 0.05);
    color: var(--v-color-primary);
  }

  .custom-draft-banner__close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--v-color-text-medium);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .custom-draft-banner__close:hover {
    color: var(--v-color-primary);
    transform: scale(1.1);
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .custom-draft-banner-slide-enter-active,
  .custom-draft-banner-slide-leave-active {
    transition: all 0.3s ease;
  }

  .custom-draft-banner-slide-enter-from,
  .custom-draft-banner-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }

  @media (max-width: 768px) {
    .custom-draft-banner {
      grid-template-columns: 1fr;
      gap: var(--v-unit-2);
      padding: var(--v-unit-2) var(--v-unit-3);
    }

    .custom-draft-banner__content {
      gap: var(--v-unit-2);
    }

    .custom-draft-banner__icon {
      font-size: 20px;
    }

    .custom-draft-banner__title {
      font-size: 13px;
    }

    .custom-draft-banner__actions {
      width: 100%;
      flex-direction: column;
    }

    .custom-draft-banner__button {
      width: 100%;
    }

    .custom-draft-banner__close {
      position: absolute;
      top: var(--v-unit-2);
      right: var(--v-unit-2);
    }
  }
</style>
