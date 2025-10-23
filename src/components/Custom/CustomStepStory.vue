<template>
  <div class="custom-step-story">
    <div class="custom-step-story__image">
      <img
        src="/assets/custom/magic-book-writing.webp"
        alt="Magic book writing"
        class="custom-step-story__img"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="custom-step-story__form">
      <h2 class="custom-step-story__title">
        {{ t('page.custom.input.story') }}
        <span class="custom-step-story__mandatory">*</span>
      </h2>

      <p class="custom-step-story__subtitle">
        {{
          t('page.custom.step.story.subtitle')
        }}
      </p>

      <textarea
        :modelValue="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="
          t('page.custom.step.story.placeholder')
        "
        maxlength="2000"
        class="custom-step-story__textarea"
        :aria-label="t('page.custom.input.story')"
      />

      <div class="custom-step-story__counter">
        <span class="custom-step-story__counter-text">
          {{ modelValue.length }} / 2000
        </span>
        <div class="custom-step-story__counter-bar">
          <div
            class="custom-step-story__counter-fill"
            :style="{ width: `${(modelValue.length / 2000) * 100}%` }"
          ></div>
        </div>
      </div>


      <div v-if="modelValue" class="custom-step-story__info">
        <p class="custom-step-story__info-text">
          <img
            src="/assets/custom/icon-check-circle.webp"
            alt="Completado"
            class="custom-step-story__info-icon-img"
            loading="lazy"
            decoding="async"
          />
          {{ t('page.custom.step.story.info') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import t from '../../translations'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
  .custom-step-story {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-6);
    align-items: flex-start;
  }

  .custom-step-story__image {
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

  .custom-step-story__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .custom-step-story__form {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-3);
  }

  .custom-step-story__title {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: var(--v-color-text-high);
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
  }

  .custom-step-story__mandatory {
    color: var(--v-color-error);
    font-weight: 700;
  }

  .custom-step-story__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
    line-height: 1.5;
  }

  .custom-step-story__textarea {
    width: 100%;
    min-height: 200px;
    padding: var(--v-unit-3);
    border: 2px solid var(--v-color-primary) !important;
    border-radius: var(--v-radius-lg);
    background: var(--v-color-surface-high) !important;
    color: var(--v-color-text-high) !important;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.6;
    resize: vertical;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .custom-step-story__textarea:focus {
    outline: none;
    border-color: var(--v-color-accent-primary) !important;
    box-shadow: 0 0 0 3px rgba(var(--v-color-primary-rgb), 0.2), 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .custom-step-story__textarea::placeholder {
    color: var(--v-color-text-medium);
    opacity: 0.7;
  }

  .custom-step-story__counter {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-1);
  }

  .custom-step-story__counter-text {
    font-size: 12px;
    color: var(--v-color-text-medium);
    text-align: right;
  }

  .custom-step-story__counter-bar {
    height: 4px;
    background: rgba(var(--v-color-primary-rgb), 0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .custom-step-story__counter-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--v-color-primary), var(--v-color-accent-primary));
    transition: width 0.3s ease;
  }


  .custom-step-story__info {
    padding: var(--v-unit-3);
    background: rgba(34, 197, 94, 0.05);
    border-radius: var(--v-radius-md);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .custom-step-story__info-text {
    margin: 0;
    font-size: 13px;
    color: #22c55e;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
  }

  .custom-step-story__info-icon-img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .custom-step-story {
      grid-template-columns: 1fr;
      gap: var(--v-unit-4);
    }

    .custom-step-story__title {
      font-size: 20px;
    }

    .custom-step-story__textarea {
      min-height: 150px;
    }

  }
</style>
