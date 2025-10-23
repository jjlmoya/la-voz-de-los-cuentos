<template>
  <transition
    name="custom-saving-fade"
    mode="out-in"
  >
    <div
      v-if="isSaving"
      class="custom-saving-indicator"
    >
      <div class="custom-saving-indicator__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span class="custom-saving-indicator__text">{{ saveText }}</span>
    </div>
  </transition>
</template>

<script setup>
  import { computed } from 'vue'
  import t from '../../translations'

  const props = defineProps({
    isSaving: {
      type: Boolean,
      default: false
    }
  })

  const saveText = computed(() => {
    return t('page.custom.saving') || 'Guardando...'
  })
</script>

<style scoped>
  .custom-saving-indicator {
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
    padding: var(--v-unit-2) var(--v-unit-3);
    background: rgba(var(--v-color-primary-rgb), 0.1);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.2);
    border-radius: var(--v-radius-md);
    color: var(--v-color-primary);
    font-size: 13px;
    font-weight: 500;
    margin-bottom: var(--v-unit-3);
  }

  .custom-saving-indicator__dots {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .custom-saving-indicator__dots span {
    width: 4px;
    height: 4px;
    background: var(--v-color-primary);
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .custom-saving-indicator__dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .custom-saving-indicator__dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  .custom-saving-indicator__text {
    flex: 1;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .custom-saving-fade-enter-active,
  .custom-saving-fade-leave-active {
    transition: all 0.3s ease;
  }

  .custom-saving-fade-enter-from,
  .custom-saving-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    .custom-saving-indicator {
      padding: var(--v-unit-1) var(--v-unit-2);
      font-size: 12px;
      gap: var(--v-unit-1);
    }

    .custom-saving-indicator__dots span {
      width: 3px;
      height: 3px;
    }
  }
</style>
