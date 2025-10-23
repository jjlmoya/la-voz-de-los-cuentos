<template>
  <div class="custom-step-newsletter">
    <div class="custom-step-newsletter__image">
      <img
        src="/assets/custom/treasure-newsletter-1200.webp"
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
          t('page.custom.step.newsletter.subtitle') ||
          'Recibe más cuentos mágicos cada mes en tu email'
        }}
      </p>

      <div class="custom-step-newsletter__card">
        <div class="custom-step-newsletter__card-icon">🎁</div>
        <h3 class="custom-step-newsletter__card-title">
          {{ t('page.custom.step.newsletter.title') || 'Newsletter Mensual' }}
        </h3>

        <ul class="custom-step-newsletter__benefits">
          <li>
            <span class="custom-step-newsletter__benefit-icon">✓</span>
            {{ t('page.custom.step.newsletter.benefit1') || 'Nuevos cuentos cada mes' }}
          </li>
          <li>
            <span class="custom-step-newsletter__benefit-icon">✓</span>
            {{ t('page.custom.step.newsletter.benefit2') || 'Historias exclusivas' }}
          </li>
          <li>
            <span class="custom-step-newsletter__benefit-icon">✓</span>
            {{ t('page.custom.step.newsletter.benefit3') || 'Actividades y juegos' }}
          </li>
          <li>
            <span class="custom-step-newsletter__benefit-icon">✓</span>
            {{ t('page.custom.step.newsletter.benefit4') || 'Sin spam, sin publicidad' }}
          </li>
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
            {{ t('page.custom.button.accept') || 'Sí, suscríbeme' }}
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
            {{ t('page.custom.button.decline') || 'No, gracias' }}
          </span>
        </button>
      </div>

      <p class="custom-step-newsletter__disclaimer">
        {{
          t('page.custom.step.newsletter.disclaimer') ||
          'Puedes darte de baja en cualquier momento desde los emails que recibas'
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
  }

  .custom-step-newsletter__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
    text-align: center;
  }

  .custom-step-newsletter__card-icon {
    font-size: 32px;
    margin-bottom: var(--v-unit-2);
    display: block;
  }

  .custom-step-newsletter__card-title {
    margin: 0 0 var(--v-unit-3) 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .custom-step-newsletter__benefits {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--v-unit-2);
    text-align: left;
  }

  .custom-step-newsletter__benefits li {
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
    font-size: 13px;
    color: var(--v-color-text-medium);
  }

  .custom-step-newsletter__benefit-icon {
    color: var(--v-color-primary);
    font-weight: 700;
    flex-shrink: 0;
  }

  .custom-step-newsletter__options {
    display: grid;
    gap: var(--v-unit-3);
  }

  .custom-step-newsletter__option {
    display: flex;
    align-items: center;
    gap: var(--v-unit-3);
    padding: var(--v-unit-3);
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
