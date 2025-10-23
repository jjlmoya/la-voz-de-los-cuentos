<template>
  <div class="custom-step-name">
    <div class="custom-step-name__image">
      <img
        v-if="!modelValue"
        src="/assets/custom/character-waiting-1200.webp"
        alt="Character waiting"
        class="custom-step-name__img"
        loading="lazy"
        decoding="async"
      />
      <img
        v-else
        src="/assets/custom/character-alive-1200.webp"
        alt="Character with life"
        class="custom-step-name__img custom-step-name__img--active"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="custom-step-name__form">
      <h2 class="custom-step-name__title">
        {{ t('page.custom.input.name') }}
      </h2>

      <p class="custom-step-name__subtitle">
        {{
          t('page.custom.step.name.subtitle') ||
          'Este será el nombre del protagonista de tu cuento'
        }}
      </p>

      <VInput
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :placeholder="
          t('page.custom.step.name.placeholder') || 'ej: Lucas, Elena, Milo...'
        "
        type="text"
        maxlength="50"
        :aria-label="t('page.custom.input.name')"
        class="custom-step-name__input"
      />

      <div class="custom-step-name__counter">
        <span class="custom-step-name__counter-text">
          {{ modelValue.length }} / 50
        </span>
        <div class="custom-step-name__counter-bar">
          <div
            class="custom-step-name__counter-fill"
            :style="{ width: `${(modelValue.length / 50) * 100}%` }"
          ></div>
        </div>
      </div>

      <div v-if="showSuggestions" class="custom-step-name__suggestions">
        <p class="custom-step-name__suggestions-title">
          {{
            t('page.custom.step.name.suggestions') ||
            'Nombres populares:'
          }}
        </p>
        <div class="custom-step-name__suggestions-list">
          <button
            v-for="name in suggestedNames"
            :key="name"
            @click="$emit('update:modelValue', name)"
            class="custom-step-name__suggestion-chip"
          >
            {{ name }}
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-if="modelValue" class="custom-step-name__preview">
          <p class="custom-step-name__preview-label">
            {{
              t('page.custom.step.name.preview') ||
              'Así aparecerá el nombre:'
            }}
          </p>
          <h3 class="custom-step-name__preview-name">{{ modelValue }}</h3>
        </div>
      </transition>
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

  const suggestedNames = [
    'Lucas',
    'Elena',
    'Milo',
    'Sofía',
    'Marco',
    'Luna',
    'Óscar',
    'Ines'
  ]

  const showSuggestions = computed(() => !props.modelValue)
</script>

<style scoped>
  .custom-step-name {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-6);
    align-items: center;
  }

  .custom-step-name__image {
    position: relative;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-step-name__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.4s ease;
    opacity: 0.8;
  }

  .custom-step-name__img--active {
    opacity: 1;
    animation: characterAlive 0.6s ease;
  }

  @keyframes characterAlive {
    0% {
      transform: scale(0.9) rotateZ(-5deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.05) rotateZ(2deg);
    }
    100% {
      transform: scale(1) rotateZ(0);
      opacity: 1;
    }
  }

  .custom-step-name__form {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-3);
  }

  .custom-step-name__title {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: var(--v-color-text-high);
  }

  .custom-step-name__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
    line-height: 1.5;
  }

  .custom-step-name__input {
    font-size: 16px;
  }

  .custom-step-name__counter {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-1);
  }

  .custom-step-name__counter-text {
    font-size: 12px;
    color: var(--v-color-text-medium);
    text-align: right;
  }

  .custom-step-name__counter-bar {
    height: 4px;
    background: rgba(var(--v-color-primary-rgb), 0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .custom-step-name__counter-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--v-color-primary), var(--v-color-accent-primary));
    transition: width 0.3s ease;
  }

  .custom-step-name__suggestions {
    background: rgba(var(--v-color-primary-rgb), 0.05);
    padding: var(--v-unit-3);
    border-radius: var(--v-radius-md);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
  }

  .custom-step-name__suggestions-title {
    margin: 0 0 var(--v-unit-2) 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--v-color-primary);
    text-transform: uppercase;
  }

  .custom-step-name__suggestions-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: var(--v-unit-2);
  }

  .custom-step-name__suggestion-chip {
    padding: var(--v-unit-1) var(--v-unit-2);
    background: transparent;
    border: 1px solid var(--v-color-primary);
    border-radius: var(--v-radius-full);
    color: var(--v-color-primary);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .custom-step-name__suggestion-chip:hover {
    background: var(--v-color-primary);
    color: white;
    transform: scale(1.05);
  }

  .custom-step-name__preview {
    padding: var(--v-unit-3);
    background: linear-gradient(135deg, rgba(var(--v-color-accent-primary-rgb), 0.1), rgba(var(--v-color-primary-rgb), 0.05));
    border-radius: var(--v-radius-md);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.2);
  }

  .custom-step-name__preview-label {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: 12px;
    color: var(--v-color-text-medium);
    font-weight: 600;
  }

  .custom-step-name__preview-name {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: var(--v-color-primary);
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
    .custom-step-name {
      grid-template-columns: 1fr;
      gap: var(--v-unit-4);
    }

    .custom-step-name__title {
      font-size: 20px;
    }

    .custom-step-name__suggestions-list {
      grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
    }
  }
</style>
