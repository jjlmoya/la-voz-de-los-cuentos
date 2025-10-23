<template>
  <div class="custom-welcome">
    <div class="custom-welcome__hero">
      <img
        src="/assets/custom/welcome-hero-1200.webp"
        alt="Welcome to Custom Story"
        class="custom-welcome__image"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="custom-welcome__content">
      <div class="custom-welcome__badge">✨ Crea tu historia mágica</div>

      <h1 class="custom-welcome__title">
        {{ t('page.custom.h1') }}
      </h1>

      <p class="custom-welcome__description">
        {{ t('page.custom.description') }}
      </p>

      <div class="custom-welcome__steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="custom-welcome__step"
        >
          <div class="custom-welcome__step-icon">{{ step.icon }}</div>
          <h3 class="custom-welcome__step-title">{{ step.title }}</h3>
          <p class="custom-welcome__step-description">{{ step.description }}</p>
        </div>
      </div>

      <div class="custom-welcome__cta">
        <VButton
          size="lg"
          @click="$emit('start')"
          class="custom-welcome__button"
        >
          {{ t('page.custom.welcome.start') || 'Comenzar' }}
          <span class="custom-welcome__button-arrow">→</span>
        </VButton>
      </div>

      <div class="custom-welcome__benefits">
        <div class="custom-welcome__benefit">
          <span class="custom-welcome__benefit-icon">🎁</span>
          <span>Completamente gratuito</span>
        </div>
        <div class="custom-welcome__benefit">
          <span class="custom-welcome__benefit-icon">⚡</span>
          <span>Rápido y fácil</span>
        </div>
        <div class="custom-welcome__benefit">
          <span class="custom-welcome__benefit-icon">🎭</span>
          <span>100% personalizado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'
  import { VButton } from '@overgaming/vicius'

  defineEmits(['start'])

  const steps = [
    {
      icon: '✏️',
      title: t('page.custom.welcome.step1.title') || 'Dale un nombre',
      description:
        t('page.custom.welcome.step1.description') ||
        'Elige el nombre del protagonista de tu cuento'
    },
    {
      icon: '📖',
      title: t('page.custom.welcome.step2.title') || 'Cuéntanos tu historia',
      description:
        t('page.custom.welcome.step2.description') ||
        'Describe qué tipo de cuento quieres que creemos para ti'
    },
    {
      icon: '📧',
      title: t('page.custom.welcome.step3.title') || 'Recíbelo en tu email',
      description:
        t('page.custom.welcome.step3.description') ||
        'Te lo enviaremos en 3-5 días completamente listo'
    }
  ]
</script>

<style scoped>
  .custom-welcome {
    display: grid;
    gap: var(--v-unit-8);
    max-width: 900px;
    margin: 0 auto;
  }

  .custom-welcome__hero {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: var(--v-radius-xl);
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .custom-welcome__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .custom-welcome__content {
    text-align: center;
    padding: 0 var(--v-unit-4);
  }

  .custom-welcome__badge {
    display: inline-block;
    padding: var(--v-unit-1) var(--v-unit-3);
    background: rgba(var(--v-color-primary-rgb), 0.1);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.2);
    border-radius: var(--v-radius-full);
    color: var(--v-color-primary);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: var(--v-unit-4);
  }

  .custom-welcome__title {
    font-size: clamp(24px, 5vw, 40px);
    font-weight: 800;
    color: var(--v-color-text-high);
    margin: 0 0 var(--v-unit-3) 0;
    line-height: 1.2;
  }

  .custom-welcome__description {
    font-size: clamp(14px, 2vw, 18px);
    color: var(--v-color-text-medium);
    margin: 0 0 var(--v-unit-8) 0;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .custom-welcome__steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--v-unit-6);
    margin-bottom: var(--v-unit-8);
  }

  .custom-welcome__step {
    padding: var(--v-unit-4);
    background: var(--v-color-surface-high);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
    border-radius: var(--v-radius-lg);
    transition: all 0.3s ease;
  }

  .custom-welcome__step:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--v-color-primary-rgb), 0.3);
    box-shadow: 0 8px 16px rgba(var(--v-color-primary-rgb), 0.1);
  }

  .custom-welcome__step-icon {
    font-size: 32px;
    margin-bottom: var(--v-unit-2);
    display: block;
  }

  .custom-welcome__step-title {
    margin: 0 0 var(--v-unit-2) 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .custom-welcome__step-description {
    margin: 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
    line-height: 1.5;
  }

  .custom-welcome__cta {
    margin-bottom: var(--v-unit-6);
  }

  .custom-welcome__button {
    display: inline-flex;
    align-items: center;
    gap: var(--v-unit-2);
    min-width: 200px;
  }

  .custom-welcome__button-arrow {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .custom-welcome__button:hover .custom-welcome__button-arrow {
    transform: translateX(4px);
  }

  .custom-welcome__benefits {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--v-unit-4);
    padding-top: var(--v-unit-4);
    border-top: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
  }

  .custom-welcome__benefit {
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
    font-size: 13px;
    color: var(--v-color-text-medium);
  }

  .custom-welcome__benefit-icon {
    font-size: 18px;
    display: block;
  }

  @media (max-width: 768px) {
    .custom-welcome {
      gap: var(--v-unit-6);
    }

    .custom-welcome__content {
      padding: 0 var(--v-unit-2);
    }

    .custom-welcome__title {
      font-size: 24px;
      margin-bottom: var(--v-unit-2);
    }

    .custom-welcome__description {
      font-size: 14px;
      margin-bottom: var(--v-unit-6);
    }

    .custom-welcome__steps {
      gap: var(--v-unit-4);
    }

    .custom-welcome__step {
      padding: var(--v-unit-3);
    }

    .custom-welcome__benefits {
      flex-direction: column;
      gap: var(--v-unit-3);
    }

    .custom-welcome__button {
      min-width: auto;
      width: 100%;
      justify-content: center;
    }
  }
</style>
