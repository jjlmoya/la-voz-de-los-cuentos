<template>
  <VContainer size="xl" class="account-page">
    <div class="account-page__content">
      <!-- Header con botón de volver y título -->
      <div class="account-page__header">
        <a :href="toAccountHome()" class="account-page__back-button" :title="t('account.backToHome')">
          <span class="account-page__back-icon">←</span>
        </a>
        <div class="account-page__title">
          <h1 class="account-page__title-main">{{ pageTitle }}</h1>
        </div>
      </div>

      <slot />
    </div>
  </VContainer>
</template>

<script setup>
  import t from '../../translations'
  import { VContainer } from '@overgaming/vicius'
  import { toAccount } from '../../router'

  const props = defineProps({
    pageTitle: {
      type: String,
      default: 'Cuenta'
    }
  })

  const toAccountHome = () => toAccount()
</script>

<style scoped>
  .account-page {
    min-height: 70vh;
    padding: var(--v-unit-8);
  }

  .account-page__content {
    display: grid;
    grid-gap: var(--v-unit-6);
  }

  /* Header con botón de volver */
  .account-page__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: var(--v-unit-6);
  }

  .account-page__back-button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
    border: 3px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .account-page__back-button:hover {
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  }

  .account-page__back-button:active {
    transform: translateY(-50%) scale(0.9);
  }

  .account-page__back-icon {
    font-size: 28px;
    color: white;
    font-weight: 700;
    line-height: 1;
  }

  /* Título */
  .account-page__title {
    text-align: center;
    padding: 0 60px;
  }

  .account-page__title-main {
    margin: 0;
    font-size: 48px;
    font-weight: 700;
    color: var(--v-color-primary);
    animation: slideInDown 0.6s ease-out forwards;
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .account-page {
      padding: var(--v-unit-4);
    }

    .account-page__header {
      margin-bottom: var(--v-unit-4);
    }

    .account-page__title {
      padding: 0 50px;
    }

    .account-page__title-main {
      font-size: 32px;
    }

    .account-page__back-button {
      width: 40px;
      height: 40px;
    }

    .account-page__back-icon {
      font-size: 20px;
    }
  }
</style>
