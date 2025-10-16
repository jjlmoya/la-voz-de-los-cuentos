<template>
  <div class="account-achievements-section">
    <div class="account-achievements-content">
      <img
        src="/assets/account/empty-states/achievements-empty.webp"
        alt="Coming soon"
        class="account-achievements-content__image"
      />
      <p class="account-achievements-content__title">{{ t('page.account.achievements.comingSoon') }}</p>
      <p class="account-achievements-content__description">{{ t('page.account.achievements.description') }}</p>
    </div>
  </div>
</template>

<script setup>
  import t from '../../translations'
</script>

<style scoped>
  .account-achievements-section {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    text-align: center;
    padding: var(--v-unit-8);
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.05), rgba(255, 235, 59, 0.05));
  }

  .account-achievements-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--v-unit-4);
    animation: fadeInDown 0.8s ease-out;
  }

  .account-achievements-content__image {
    width: 240px;
    height: 240px;
    object-fit: contain;
    opacity: 0.95;
    filter: drop-shadow(0 4px 12px rgba(255, 193, 7, 0.2));
    animation: float 3s ease-in-out infinite;
  }

  .account-achievements-content__title {
    margin: 0;
    font-size: var(--v-font-size-xl);
    font-weight: 700;
    color: var(--v-color-text-high);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .account-achievements-content__description {
    margin: 0;
    font-size: var(--v-font-size-md);
    color: var(--v-color-text-medium);
    max-width: 350px;
    line-height: 1.5;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
  }

  @media (max-width: 640px) {
    .account-achievements-section {
      min-height: 400px;
      padding: var(--v-unit-4);
    }

    .account-achievements-content {
      gap: var(--v-unit-3);
    }

    .account-achievements-content__image {
      width: 180px;
      height: 180px;
    }

    .account-achievements-content__title {
      font-size: var(--v-font-size-lg);
    }

    .account-achievements-content__description {
      font-size: var(--v-font-size-sm);
    }
  }
</style>
