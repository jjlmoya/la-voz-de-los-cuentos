<template>
  <div class="custom-step-newsletter">
    <div class="custom-step-newsletter__image">
      <img
        src="/assets/custom/treasure-newsletter.webp"
        alt="Treasure newsletter"
        class="custom-step-newsletter__img"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="custom-step-newsletter__form">
      <h2 class="custom-step-newsletter__title">
        {{ t('page.custom.input.newsletter') }}
      </h2>

      <p class="custom-step-newsletter__subtitle">
        {{
          t('page.custom.step.newsletter.subtitle')
        }}
      </p>

      <div class="custom-step-newsletter__card">
        <h3 class="custom-step-newsletter__card-title">
          {{ t('page.custom.step.newsletter.title') }}
        </h3>

        <ul class="custom-step-newsletter__benefits">
          <li>{{ t('page.custom.step.newsletter.benefit1') }}</li>
          <li>{{ t('page.custom.step.newsletter.benefit2') }}</li>
          <li>{{ t('page.custom.step.newsletter.benefit3') }}</li>
          <li>{{ t('page.custom.step.newsletter.benefit4') }}</li>
        </ul>
      </div>

      <div class="custom-step-newsletter__options">
        <button
          :class="[
            'custom-step-newsletter__option',
            {
              'custom-step-newsletter__option--active': modelValue === true
            }
          ]"
          @click="$emit('update:modelValue', true)"
        >
          <span class="custom-step-newsletter__option-radio">
            <span
              v-if="modelValue === true"
              class="custom-step-newsletter__option-radio-inner"
            ></span>
          </span>
          <span class="custom-step-newsletter__option-label">
            {{ t('page.custom.button.accept') }}
          </span>
        </button>

        <button
          :class="[
            'custom-step-newsletter__option',
            {
              'custom-step-newsletter__option--active': modelValue === false
            }
          ]"
          @click="$emit('update:modelValue', false)"
        >
          <span class="custom-step-newsletter__option-radio">
            <span
              v-if="modelValue === false"
              class="custom-step-newsletter__option-radio-inner"
            ></span>
          </span>
          <span class="custom-step-newsletter__option-label">
            {{ t('page.custom.button.decline') }}
          </span>
        </button>
      </div>

      <p class="custom-step-newsletter__disclaimer">
        {{
          t('page.custom.step.newsletter.disclaimer')
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'

  defineProps({
    modelValue: {
      type: Boolean,
      default: true
    }
  })

  defineEmits(['update:modelValue'])
</script>

<style scoped>
  .custom-step-newsletter {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-6);
    align-items: center;
  }

  .custom-step-newsletter__image {
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

  .custom-step-newsletter__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .custom-step-newsletter__form {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-4);
  }

  .custom-step-newsletter__title {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: var(--v-color-text-high);
  }

  .custom-step-newsletter__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
    line-height: 1.5;
  }

  .custom-step-newsletter__card {
    padding: var(--v-unit-4);
    background: linear-gradient(135deg, rgba(var(--v-color-primary-rgb), 0.1), rgba(var(--v-color-accent-primary-rgb), 0.05));
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.2);
    border-radius: var(--v-radius-lg);
  }

  .custom-step-newsletter__card-title {
    margin: 0 0 var(--v-unit-2) 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .custom-step-newsletter__benefits {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--v-unit-1);
  }

  .custom-step-newsletter__benefits li {
    font-size: 13px;
    color: var(--v-color-text-medium);
  }

  .custom-step-newsletter__options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-2);
  }

  .custom-step-newsletter__option {
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
    padding: var(--v-unit-2) var(--v-unit-3);
    background: var(--v-color-background);
    border: 2px solid rgba(var(--v-color-primary-rgb), 0.2);
    border-radius: var(--v-radius-lg);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }

  .custom-step-newsletter__option:hover {
    border-color: var(--v-color-primary);
    background: rgba(var(--v-color-primary-rgb), 0.05);
  }

  .custom-step-newsletter__option--active {
    border-color: var(--v-color-primary);
    background: rgba(var(--v-color-primary-rgb), 0.1);
  }

  .custom-step-newsletter__option-radio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid var(--v-color-primary);
    border-radius: 50%;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .custom-step-newsletter__option--active .custom-step-newsletter__option-radio {
    background: var(--v-color-primary);
  }

  .custom-step-newsletter__option-radio-inner {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    display: block;
  }

  .custom-step-newsletter__option-label {
    font-weight: 600;
    font-size: 14px;
    color: var(--v-color-text-high);
  }

  .custom-step-newsletter__disclaimer {
    margin: 0;
    font-size: 11px;
    color: var(--v-color-text-medium);
    text-align: center;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .custom-step-newsletter {
      grid-template-columns: 1fr;
      gap: var(--v-unit-4);
    }

    .custom-step-newsletter__title {
      font-size: 20px;
    }

    .custom-step-newsletter__card {
      padding: var(--v-unit-3);
    }
  }
</style>
