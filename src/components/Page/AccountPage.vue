<template>
  <VContainer size="xl" class="account-page">
    <div class="account-page__content">
      <div class="account-page__title">
          <VText as="h1" variant="header">{{ t('page.account.h1') }}</VText>
      </div>
      <UserResume />
    </div>
  </VContainer>
</template>

<script setup>
  import UserResume from '../User/Resume.vue'
  import t from '../../translations'
  import { VText, VContainer } from '@overgaming/vicius'
</script>

<style>
  .account-page {
    min-height: 70vh;
    padding: var(--v-unit-8);
  }
  .account-page__content {
    display: grid;
    grid-gap: var(--v-unit-4);
  }
  .account-page__title {
    font-size: 24px;
    text-align: center;
  }
</style>
