<template>
  <div class="custom-step-name">
    <div class="custom-step-name__image">
      <img
        v-if="!modelValue"
        src="/assets/custom/character-waiting.webp"
        alt="Character waiting"
        class="custom-step-name__img"
        loading="lazy"
        decoding="async"
      />
      <img
        v-else
        src="/assets/custom/character-alive.webp"
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

      <!-- Protagonist Section -->
      <div class="custom-step-name__section">
        <p class="custom-step-name__section-label">
          {{ t('page.custom.step.name.protagonist') }}
        </p>

        <p class="custom-step-name__subtitle">
          {{ t('page.custom.step.name.subtitle') }}
        </p>

        <VInput
          :modelValue="modelValue"
          @update:modelValue="$emit('update:modelValue', $event)"
          :placeholder="t('page.custom.step.name.placeholder')"
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
      </div>

      <!-- Secondary Characters Section -->
      <div class="custom-step-name__section custom-step-name__section--secondary">
        <p class="custom-step-name__section-label">
          {{ t('page.custom.step.name.secondary') }}
        </p>

        <div class="custom-step-name__secondary-list">
          <div
            v-for="(character, index) in secondaryCharacters"
            :key="index"
            class="custom-step-name__character-input"
          >
            <VInput
              :modelValue="character"
              @update:modelValue="updateSecondary(index, $event)"
              :placeholder="`Personaje secundario ${index + 1}...`"
              maxlength="50"
              class="custom-step-name__input custom-step-name__input--secondary"
            />
            <button
              @click="removeSecondary(index)"
              class="custom-step-name__remove-btn"
              :aria-label="`Eliminar personaje ${index + 1}`"
            >
              ✕
            </button>
          </div>
        </div>

        <button
          v-if="secondaryCharacters.length < 5"
          @click="addSecondary"
          class="custom-step-name__add-btn"
        >
          + {{ t('page.custom.step.name.add') }}
        </button>
      </div>

      <div v-if="showSuggestions" class="custom-step-name__suggestions">
        <p class="custom-step-name__suggestions-title">
          {{ t('page.custom.step.name.suggestions') }}
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
            {{ t('page.custom.step.name.preview') }}
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
    },
    secondaryCharacters: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['update:modelValue', 'update:secondaryCharacters'])

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

  /**
   * Add a new secondary character
   */
  const addSecondary = () => {
    if (props.secondaryCharacters.length < 5) {
      emit('update:secondaryCharacters', [...props.secondaryCharacters, ''])
    }
  }

  /**
   * Update a secondary character
   */
  const updateSecondary = (index, value) => {
    const updated = [...props.secondaryCharacters]
    updated[index] = value
    emit('update:secondaryCharacters', updated)
  }

  /**
   * Remove a secondary character
   */
  const removeSecondary = (index) => {
    const updated = props.secondaryCharacters.filter((_, i) => i !== index)
    emit('update:secondaryCharacters', updated)
  }
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
    border-radius: var(--v-radius-xl);
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(var(--v-color-primary-rgb), 0.15);
    background: linear-gradient(135deg, rgba(var(--v-color-primary-rgb), 0.05), rgba(var(--v-color-accent-primary-rgb), 0.03));
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
    border: 2px solid var(--v-color-primary) !important;
    background-color: var(--v-color-surface-high) !important;
    color: var(--v-color-text-high) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
  }

  .custom-step-name__input:focus {
    border-color: var(--v-color-accent-primary) !important;
    box-shadow: 0 0 0 3px rgba(var(--v-color-primary-rgb), 0.2), 0 2px 8px rgba(0, 0, 0, 0.1) !important;
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

  .custom-step-name__section {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-2);
    padding-bottom: var(--v-unit-4);
    border-bottom: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
  }

  .custom-step-name__section--secondary {
    border-bottom: none;
    padding-bottom: 0;
  }

  .custom-step-name__section-label {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    color: var(--v-color-text-high);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .custom-step-name__secondary-list {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-2);
  }

  .custom-step-name__character-input {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--v-unit-2);
    align-items: center;
  }

  .custom-step-name__input--secondary {
    font-size: 14px;
  }

  .custom-step-name__remove-btn {
    width: 40px;
    height: 40px;
    padding: 0;
    border: 2px solid var(--v-color-error);
    border-radius: var(--v-radius-md);
    background: transparent;
    color: var(--v-color-error);
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-step-name__remove-btn:hover {
    background: var(--v-color-error);
    color: white;
    transform: scale(1.05);
  }

  .custom-step-name__add-btn {
    align-self: flex-start;
    padding: var(--v-unit-2) var(--v-unit-3);
    border: 2px dashed var(--v-color-primary);
    border-radius: var(--v-radius-md);
    background: transparent;
    color: var(--v-color-primary);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .custom-step-name__add-btn:hover {
    background: rgba(var(--v-color-primary-rgb), 0.05);
    transform: translateY(-2px);
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
