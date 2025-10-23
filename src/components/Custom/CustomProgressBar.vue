<template>
  <div class="custom-progress-bar">
    <div class="custom-progress-bar__container">
      <div class="custom-progress-bar__steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          :class="[
            'custom-progress-bar__step',
            {
              'custom-progress-bar__step--active': currentStep >= index + 1,
              'custom-progress-bar__step--completed': currentStep > index + 1
            }
          ]"
        >
          <div class="custom-progress-bar__step-icon">
            {{ step.icon }}
          </div>
          <div class="custom-progress-bar__step-label">
            {{ step.label }}
          </div>
        </div>
      </div>

      <div class="custom-progress-bar__line">
        <div
          class="custom-progress-bar__line-fill"
          :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
        ></div>
      </div>
    </div>

    <div class="custom-progress-bar__percentage">
      {{ Math.round(((currentStep - 1) / (steps.length - 1)) * 100) }}%
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    currentStep: {
      type: Number,
      default: 1
    },
    steps: {
      type: Array,
      default: () => [
        { icon: '👋', label: 'Bienvenida' },
        { icon: '✏️', label: 'Nombre' },
        { icon: '📖', label: 'Cuento' },
        { icon: '✉️', label: 'Email' },
        { icon: '🎁', label: 'Newsletter' },
        { icon: '🔄', label: 'Compartir' }
      ]
    }
  })
</script>

<style scoped>
  .custom-progress-bar {
    width: 100%;
    padding: var(--v-unit-4);
    background: var(--v-color-surface-high);
    border-radius: var(--v-radius-lg);
    margin-bottom: var(--v-unit-6);
    box-shadow: var(--v-shadow-sm);
  }

  .custom-progress-bar__container {
    position: relative;
    margin-bottom: var(--v-unit-4);
  }

  .custom-progress-bar__steps {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
    gap: var(--v-unit-3);
    position: relative;
    z-index: 2;
  }

  .custom-progress-bar__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--v-unit-2);
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .custom-progress-bar__step--active {
    opacity: 1;
  }

  .custom-progress-bar__step-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--v-color-background);
    border: 2px solid var(--v-color-primary);
    border-radius: 50%;
    font-size: 20px;
    transition: all 0.3s ease;
  }

  .custom-progress-bar__step--active .custom-progress-bar__step-icon {
    background: var(--v-color-primary);
    box-shadow: 0 0 0 4px rgba(var(--v-color-primary-rgb), 0.1);
    transform: scale(1.1);
  }

  .custom-progress-bar__step--completed .custom-progress-bar__step-icon {
    background: var(--v-color-primary);
  }

  .custom-progress-bar__step-label {
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    color: var(--v-color-text-medium);
  }

  .custom-progress-bar__step--active .custom-progress-bar__step-label {
    color: var(--v-color-primary);
    font-weight: 700;
  }

  .custom-progress-bar__line {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: var(--v-color-background);
    border-radius: 1px;
    z-index: 1;
  }

  .custom-progress-bar__line-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--v-color-primary), var(--v-color-accent-primary));
    border-radius: 1px;
    transition: width 0.4s ease;
    box-shadow: 0 0 8px rgba(var(--v-color-primary-rgb), 0.4);
  }

  .custom-progress-bar__percentage {
    text-align: center;
    font-size: 12px;
    color: var(--v-color-text-medium);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .custom-progress-bar {
      padding: var(--v-unit-3);
      margin-bottom: var(--v-unit-4);
    }

    .custom-progress-bar__steps {
      gap: var(--v-unit-2);
    }

    .custom-progress-bar__step {
      gap: var(--v-unit-1);
    }

    .custom-progress-bar__step-icon {
      width: 32px;
      height: 32px;
      font-size: 16px;
    }

    .custom-progress-bar__step-label {
      font-size: 10px;
    }

    .custom-progress-bar__line {
      top: 16px;
      left: 16px;
      right: 16px;
    }
  }
</style>
