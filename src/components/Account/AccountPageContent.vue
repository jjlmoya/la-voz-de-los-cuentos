<template>
  <AccountPageNav :activeTab="activeTab" :lang="lang">
    <div class="account-page-content">
      <div v-if="activeTab !== 'achievements'" class="account-page-content__stories">
        <StoriesSection :stories="stories">
          <template v-if="showTutorial" #fallback>
            <TutorialProgress />
          </template>
        </StoriesSection>
      </div>
      <div v-else class="account-page-content__achievements">
        <p>{{ t('page.account.achievements.comingSoon') }}</p>
      </div>
    </div>
  </AccountPageNav>
</template>

<script setup>
  import AccountPageNav from '../Page/AccountPageNav.vue'
  import StoriesSection from '../Sections/StoriesSection.vue'
  import TutorialProgress from '../Tutorial/Progress.vue'
  import t from '../../translations'

  defineProps({
    activeTab: {
      type: String,
      default: 'read'
    },
    lang: {
      type: String,
      default: 'es'
    },
    showTutorial: {
      type: Boolean,
      default: false
    },
    stories: {
      type: Array,
      default: () => []
    }
  })
</script>

<style scoped>
  .account-page-content {
    padding: var(--v-unit-8);
  }

  .account-page-content__stories {
    display: grid;
    grid-gap: var(--v-unit-6);
  }

  .account-page-content__achievements {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;
    padding: var(--v-unit-8);
  }

  .account-page-content__achievements p {
    margin: 0;
    font-size: var(--v-font-size-lg);
    color: var(--v-color-text-medium);
  }

  @media (max-width: 640px) {
    .account-page-content {
      padding: var(--v-unit-4);
    }

    .account-page-content__achievements {
      min-height: 300px;
      padding: var(--v-unit-4);
    }
  }
</style>
