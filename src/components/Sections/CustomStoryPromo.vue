<template>
  <div class="custom-story-promo">
    <div class="custom-story-promo__content">
      <div class="custom-story-promo__icon">
        <img
          src="/assets/custom/icon-sparkles.webp"
          alt="Magia"
          class="custom-story-promo__icon-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="custom-story-promo__info">
        <p class="custom-story-promo__badge">
          {{ t('section.custom.badge') }}
        </p>
        <h2 class="custom-story-promo__title">
          {{ t('section.custom.title') }}
        </h2>
        <p class="custom-story-promo__description">
          {{ t('section.custom.description') }}
        </p>

        <div class="custom-story-promo__benefits">
          <div class="custom-story-promo__benefit">
            <img
              src="/assets/custom/icon-gift.webp"
              alt="Gratuito"
              class="custom-story-promo__benefit-icon"
              loading="lazy"
              decoding="async"
            />
            <span>{{ t('section.custom.benefit1') }}</span>
          </div>
          <div class="custom-story-promo__benefit">
            <img
              src="/assets/custom/icon-lightning.webp"
              alt="Rápido"
              class="custom-story-promo__benefit-icon"
              loading="lazy"
              decoding="async"
            />
            <span>{{ t('section.custom.benefit2') }}</span>
          </div>
          <div class="custom-story-promo__benefit">
            <img
              src="/assets/custom/icon-envelope.webp"
              alt="Personalizado"
              class="custom-story-promo__benefit-icon"
              loading="lazy"
              decoding="async"
            />
            <span>{{ t('section.custom.benefit3') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="custom-story-promo__cta">
      <a
        :href="customStoryUrl"
        class="custom-story-promo__button"
      >
        <span>{{ t('section.custom.cta') }}</span>
        <span class="custom-story-promo__arrow">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'

  const customStoryUrl = t('/personalizado/cuento/', '/custom/story/')
</script>

<style scoped>
  .custom-story-promo {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--v-unit-6);
    align-items: center;
    padding: var(--v-unit-6);
    margin-bottom: var(--v-unit-8);
    background: linear-gradient(135deg,
      rgba(var(--v-color-primary-rgb), 0.12) 0%,
      rgba(var(--v-color-accent-primary-rgb), 0.08) 100%);
    border: 2px solid rgba(var(--v-color-primary-rgb), 0.25);
    border-radius: var(--v-radius-xl);
    box-shadow: 0 8px 32px rgba(var(--v-color-primary-rgb), 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
    overflow: hidden;
    position: relative;
    animation: fadeInUp 0.6s ease;
  }

  .custom-story-promo::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(var(--v-color-primary-rgb), 0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: float 6s ease-in-out infinite;
  }

  .custom-story-promo__content {
    display: flex;
    gap: var(--v-unit-4);
    align-items: flex-start;
    position: relative;
    z-index: 1;
  }

  .custom-story-promo__icon {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg,
      rgba(var(--v-color-primary-rgb), 0.15) 0%,
      rgba(var(--v-color-accent-primary-rgb), 0.1) 100%);
    border-radius: var(--v-radius-lg);
    border: 1px solid rgba(var(--v-color-primary-rgb), 0.2);
    animation: pulse 3s ease-in-out infinite;
  }

  .custom-story-promo__icon-img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    display: block;
  }

  .custom-story-promo__info {
    flex: 1;
  }

  .custom-story-promo__badge {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: 12px;
    font-weight: 700;
    color: var(--v-color-primary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .custom-story-promo__title {
    margin: 0 0 var(--v-unit-2) 0;
    font-size: clamp(20px, 4vw, 32px);
    font-weight: 800;
    color: var(--v-color-text-high);
    line-height: 1.2;
  }

  .custom-story-promo__description {
    margin: 0 0 var(--v-unit-4) 0;
    font-size: 16px;
    color: var(--v-color-text-medium);
    line-height: 1.6;
    max-width: 500px;
  }

  .custom-story-promo__benefits {
    display: flex;
    flex-wrap: wrap;
    gap: var(--v-unit-3);
  }

  .custom-story-promo__benefit {
    display: flex;
    align-items: center;
    gap: var(--v-unit-2);
    font-size: 14px;
    color: var(--v-color-text-medium);
    font-weight: 500;
  }

  .custom-story-promo__benefit-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
  }

  .custom-story-promo__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .custom-story-promo__button {
    display: inline-flex;
    align-items: center;
    gap: var(--v-unit-2);
    padding: var(--v-unit-3) var(--v-unit-6);
    background: linear-gradient(135deg,
      var(--v-color-primary) 0%,
      var(--v-color-accent-primary) 100%);
    color: white;
    font-size: 16px;
    font-weight: 700;
    border-radius: var(--v-radius-lg);
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 8px 16px rgba(var(--v-color-primary-rgb), 0.3),
                0 0 0 0 rgba(var(--v-color-primary-rgb), 0.1);
    cursor: pointer;
    border: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
  }

  .custom-story-promo__button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  .custom-story-promo__button:hover::before {
    left: 100%;
  }

  .custom-story-promo__button:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(var(--v-color-primary-rgb), 0.4),
                0 0 20px rgba(var(--v-color-primary-rgb), 0.2);
  }

  .custom-story-promo__button:active {
    transform: translateY(-2px);
  }

  .custom-story-promo__arrow {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .custom-story-promo__button:hover .custom-story-promo__arrow {
    transform: translateX(4px);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(var(--v-color-primary-rgb), 0.1);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 0 8px rgba(var(--v-color-primary-rgb), 0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @media (max-width: 768px) {
    .custom-story-promo {
      grid-template-columns: 1fr;
      gap: var(--v-unit-4);
      padding: var(--v-unit-4);
      margin-bottom: var(--v-unit-6);
    }

    .custom-story-promo__content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--v-unit-3);
    }

    .custom-story-promo__icon {
      width: 64px;
      height: 64px;
    }

    .custom-story-promo__icon-img {
      width: 40px;
      height: 40px;
    }

    .custom-story-promo__title {
      font-size: 24px;
    }

    .custom-story-promo__description {
      font-size: 14px;
      margin-bottom: var(--v-unit-3);
    }

    .custom-story-promo__benefits {
      justify-content: center;
      gap: var(--v-unit-2);
    }

    .custom-story-promo__benefit {
      font-size: 13px;
    }

    .custom-story-promo__cta {
      width: 100%;
    }

    .custom-story-promo__button {
      width: 100%;
      justify-content: center;
      padding: var(--v-unit-3) var(--v-unit-4);
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    .custom-story-promo {
      padding: var(--v-unit-3);
    }

    .custom-story-promo__title {
      font-size: 20px;
    }

    .custom-story-promo__benefits {
      flex-direction: column;
      gap: var(--v-unit-2);
    }

    .custom-story-promo__benefit {
      justify-content: flex-start;
    }
  }
</style>
