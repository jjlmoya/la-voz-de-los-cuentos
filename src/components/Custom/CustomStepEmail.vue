<template>
  <div class="custom-step-email">
    <div class="custom-step-email__image">
      <img
        src="/assets/custom/owl-messenger-1200.webp"
        alt="Owl messenger"
        class="custom-step-email__img"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="custom-step-email__form">
      <h2 class="custom-step-email__title">
        {{ t('page.custom.input.email') }}
      </h2>

      <p class="custom-step-email__subtitle">
        {{
          t('page.custom.step.email.subtitle') ||
          'Necesitamos tu email para enviarte el cuento cuando esté listo'
        }}
      </p>

      <VInput
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        type="email"
        :placeholder="t('page.custom.input.email.placeholder') || 'tu@email.com'"
        :aria-label="t('page.custom.input.email')"
        class="custom-step-email__input"
      />

      <div v-if="modelValue" class="custom-step-email__validation">
        <transition name="fade">
          <div
            v-if="isValidEmail"
            class="custom-step-email__validation-success"
          >
            <span class="custom-step-email__validation-icon">✓</span>
            {{ t('page.custom.step.email.valid') || 'Email válido' }}
          </div>
          <div v-else class="custom-step-email__validation-error">
            <span class="custom-step-email__validation-icon">✗</span>
            {{ t('page.custom.step.email.invalid') || 'Email no válido' }}
          </div>
        </transition>
      </div>

      <div class="custom-step-email__info">
        <p class="custom-step-email__info-icon">🔒</p>
        <p class="custom-step-email__info-text">
          {{
            t('page.custom.step.email.privacy') ||
            'Tu email está seguro y no lo compartiremos con nadie'
          }}
        </p>
      </div>

      <div class="custom-step-email__timeline">
        <h3 class="custom-step-email__timeline-title">
          {{ t('page.custom.step.email.timeline') || '⏱️ Cuándo lo recibirás' }}
        </h3>
        <div class="custom-step-email__timeline-steps">
          <div class="custom-step-email__timeline-item">
            <div class="custom-step-email__timeline-number">1</div>
            <p>{{ t('page.custom.step.email.timeline.1') || 'Recibimos tu solicitud' }}</p>
          </div>
          <div class="custom-step-email__timeline-item">
            <div class="custom-step-email__timeline-number">2</div>
            <p>{{ t('page.custom.step.email.timeline.2') || 'Nuestros creadores trabajan en tu cuento' }}</p>
          </div>
          <div class="custom-step-email__timeline-item">
            <div class="custom-step-email__timeline-number">3</div>
            <p>{{ t('page.custom.step.email.timeline.3') || 'Te lo enviamos en 3-5 días' }}</p>
          </div>
        </div>
        <p class="custom-step-email__timeline-note">
          {{ t('page.custom.step.email.timeline.note') || 'Tiempo estimado según volumen de solicitudes' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import t from '../../translations'
  import { VInput } from '@overgaming/vicius'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  defineEmits(['update:modelValue'])

  const isValidEmail = computed(() => {
    if (!props.modelValue) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(props.modelValue)
  })
</script>

<style scoped>
  .custom-step-email {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-6);
    align-items: flex-start;
  }

  .custom-step-email__image {
    position: relative;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-step-email__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .custom-step-email__form {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-3);
  }

  .custom-step-email__title {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: var(--v-color-text-high);
  }

  .custom-step-email__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
    line-height: 1.5;
  }

  .custom-step-email__input {
    font-size: 16px;
    border: 2px solid rgba(var(--v-color-primary-rgb), 0.3) !important;
    background-color: var(--v-color-background) !important;
  }

  .custom-step-email__input:focus {
    border-color: var(--v-color-primary) !important;
    box-shadow: 0 0 0 3px rgba(var(--v-color-primary-rgb), 0.1) !important;
  }

  .custom-step-email__validation {
    min-height: 32px;
    display: flex;
    align-items: center;
  }

  .custom-step-email__validation-success,
  .custom-step-email__validation-error {
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
    padding: var(--v-unit-2) var(--v-unit-3);
    border-radius: var(--v-radius-md);
    font-size: 13px;
    font-weight: 600;
  }

  .custom-step-email__validation-success {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .custom-step-email__validation-error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .custom-step-email__validation-icon {
    font-weight: 700;
  }

  .custom-step-email__info {
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
    padding: var(--v-unit-3);
    background: rgba(var(--v-color-primary-rgb), 0.05);
    border-radius: var(--v-radius-md);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
  }

  .custom-step-email__info-icon {
    font-size: 20px;
    margin: 0;
    flex-shrink: 0;
  }

  .custom-step-email__info-text {
    margin: 0;
    font-size: 13px;
    color: var(--v-color-text-medium);
    line-height: 1.4;
  }

  .custom-step-email__timeline {
    padding: var(--v-unit-4);
    background: var(--v-color-surface-high);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
    border-radius: var(--v-radius-lg);
  }

  .custom-step-email__timeline-title {
    margin: 0 0 var(--v-unit-3) 0;
    font-size: 14px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .custom-step-email__timeline-steps {
    display: grid;
    gap: var(--v-unit-3);
    margin-bottom: var(--v-unit-3);
  }

  .custom-step-email__timeline-item {
    display: flex;
    align-items: flex-start;
    gap: var(--v-unit-2);
  }

  .custom-step-email__timeline-number {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--v-color-primary);
    color: white;
    border-radius: 50%;
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
  }

  .custom-step-email__timeline-item p {
    margin: 0;
    font-size: 13px;
    color: var(--v-color-text-medium);
    line-height: 1.4;
    padding-top: 2px;
  }

  .custom-step-email__timeline-note {
    margin: 0;
    font-size: 11px;
    color: var(--v-color-text-medium);
    font-style: italic;
    text-align: center;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    .custom-step-email {
      grid-template-columns: 1fr;
      gap: var(--v-unit-4);
    }

    .custom-step-email__title {
      font-size: 20px;
    }
  }
</style>
