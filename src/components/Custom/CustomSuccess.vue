<template>
  <div class="custom-success">
    <div class="custom-success__animation">
      <img
        src="/assets/custom/success-celebration-1200.webp"
        alt="Success celebration"
        class="custom-success__image"
        loading="lazy"
        decoding="async"
      />
      <div class="custom-success__confetti">
        <span v-for="i in 20" :key="i" class="custom-success__confetti-piece"
          >✨</span
        >
      </div>
    </div>

    <div class="custom-success__content">
      <h2 class="custom-success__title">
        {{ t('page.custom.button.success') }}
      </h2>

      <p class="custom-success__subtitle">
        {{
          t('page.custom.success.message') ||
          '¡Nos pondremos a ello enseguida! Tu cuento estará listo en 3-5 días.'
        }}
      </p>

      <div class="custom-success__steps">
        <div class="custom-success__step">
          <div class="custom-success__step-number">1</div>
          <h3 class="custom-success__step-title">
            {{ t('page.custom.success.step1') || 'Solicitud Recibida' }}
          </h3>
          <p class="custom-success__step-description">
            {{
              t('page.custom.success.step1.desc') ||
              'Hemos guardado todos los detalles de tu cuento'
            }}
          </p>
        </div>

        <div class="custom-success__step">
          <div class="custom-success__step-number">2</div>
          <h3 class="custom-success__step-title">
            {{ t('page.custom.success.step2') || 'Creación' }}
          </h3>
          <p class="custom-success__step-description">
            {{
              t('page.custom.success.step2.desc') ||
              'Nuestros creadores escriben tu historia'
            }}
          </p>
        </div>

        <div class="custom-success__step">
          <div class="custom-success__step-number">3</div>
          <h3 class="custom-success__step-title">
            {{ t('page.custom.success.step3') || 'Entrega' }}
          </h3>
          <p class="custom-success__step-description">
            {{
              t('page.custom.success.step3.desc') ||
              'Te lo enviaremos por email completamente listo'
            }}
          </p>
        </div>
      </div>

      <div class="custom-success__info">
        <p class="custom-success__info-icon">📧</p>
        <p class="custom-success__info-text">
          {{
            t('page.custom.success.email') ||
            'Revisa tu email (incluyendo spam) para el cuento'
          }}
        </p>
      </div>

      <div class="custom-success__actions">
        <VButton @click="goHome" class="custom-success__button">
          {{ t('page.custom.success.home') || 'Volver al Inicio' }}
        </VButton>
        <VButton
          @click="goStories"
          variant="secondary"
          class="custom-success__button"
        >
          {{ t('page.custom.success.explore') || 'Explorar Cuentos' }}
        </VButton>
      </div>

      <p class="custom-success__footer">
        {{
          t('page.custom.success.footer') ||
          '¡Gracias por elegirnos! Si tienes dudas, contáctanos.'
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'
  import { VButton } from '@overgaming/vicius'

  const goHome = () => {
    window.location.href = '/'
  }

  const goStories = () => {
    const storyPath =
      import.meta.env.PUBLIC_LANG === 'en' ? '/stories' : '/cuentos'
    window.location.href = storyPath
  }
</script>

<style scoped>
  .custom-success {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-8);
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }

  .custom-success__animation {
    position: relative;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-success__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .custom-success__confetti {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .custom-success__confetti-piece {
    position: absolute;
    font-size: 20px;
    opacity: 0;
    animation: float-down 3s ease-in infinite;
  }

  .custom-success__confetti-piece:nth-child(1) {
    left: 10%;
    animation-delay: 0s;
  }
  .custom-success__confetti-piece:nth-child(2) {
    left: 20%;
    animation-delay: 0.2s;
  }
  .custom-success__confetti-piece:nth-child(3) {
    left: 30%;
    animation-delay: 0.4s;
  }
  .custom-success__confetti-piece:nth-child(4) {
    left: 40%;
    animation-delay: 0.6s;
  }
  .custom-success__confetti-piece:nth-child(5) {
    left: 50%;
    animation-delay: 0.8s;
  }
  .custom-success__confetti-piece:nth-child(n + 6) {
    left: calc(50% + (var(--piece, 0)) * 10%);
  }

  @keyframes float-down {
    0% {
      transform: translateY(-20px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }

  .custom-success__content {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-4);
  }

  .custom-success__title {
    margin: 0;
    font-size: 32px;
    font-weight: 800;
    color: var(--v-color-text-high);
    line-height: 1.2;
  }

  .custom-success__subtitle {
    margin: 0;
    font-size: 16px;
    color: var(--v-color-text-medium);
    line-height: 1.6;
  }

  .custom-success__steps {
    display: grid;
    gap: var(--v-unit-4);
    padding: var(--v-unit-4);
    background: var(--v-color-surface-high);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.1);
    border-radius: var(--v-radius-lg);
  }

  .custom-success__step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--v-unit-3);
    align-items: flex-start;
  }

  .custom-success__step-number {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
    color: white;
    border-radius: 50%;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .custom-success__step-title {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: 14px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .custom-success__step-description {
    margin: 0;
    font-size: 13px;
    color: var(--v-color-text-medium);
    line-height: 1.4;
  }

  .custom-success__info {
    display: flex;
    align-items: center;
    gap: var(--v-unit-3);
    padding: var(--v-unit-3) var(--v-unit-4);
    background: rgba(var(--v-color-accent-primary-rgb), 0.1);
    border: 1px solid rgba(var(--v-color-accent-primary-rgb), 0.2);
    border-radius: var(--v-radius-lg);
  }

  .custom-success__info-icon {
    font-size: 28px;
    margin: 0;
    flex-shrink: 0;
  }

  .custom-success__info-text {
    margin: 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
    line-height: 1.4;
  }

  .custom-success__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-3);
  }

  .custom-success__button {
    width: 100%;
  }

  .custom-success__footer {
    margin: 0;
    text-align: center;
    font-size: 12px;
    color: var(--v-color-text-medium);
    font-style: italic;
  }

  @media (max-width: 768px) {
    .custom-success {
      grid-template-columns: 1fr;
      gap: var(--v-unit-6);
    }

    .custom-success__title {
      font-size: 24px;
    }

    .custom-success__actions {
      grid-template-columns: 1fr;
    }
  }
</style>
