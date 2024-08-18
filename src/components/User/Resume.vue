<template>
  <div class="user-resume">
    <div class="user-resume__content">
      <UserResumeEntry
        @click="setActiveSection('read')"
        :active="activeSection === 'read'"
        :title="t('page.account.resume.read')"
        :value="map?.read?.stories?.length || 0"
      />
      <UserResumeEntry
        @click="setActiveSection('pending')"
        :active="activeSection === 'pending'"
        :title="t('page.account.resume.pending')"
        :value="map?.pending?.stories?.length || 0"
      />
      <UserResumeEntry
        @click="setActiveSection('favorites')"
        :active="activeSection === 'favorites'"
        :title="t('page.account.resume.favorites')"
        :value="map?.favorites?.stories?.length || 0"
      />
    </div>

    <StoriesSection :stories="activeStories" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import t from '../../translations'
  import UserResumeEntry from './UserResumeEntry.vue'
  import StoriesSection from '../Sections/StoriesSection.vue'
  import useStories from '../../composables/useStories'

  const { getCompleteStories, getPendingStories, getFavoriteStories } =
    useStories()
  const map = {
    read: {
      text: 'page.account.resume.read',
      stories: getCompleteStories()
    },
    pending: {
      text: 'page.account.resume.pending',
      stories: getPendingStories()
    },
    favorites: {
      text: 'page.account.resume.favorites',
      stories: getFavoriteStories()
    }
  }
  const activeSection = ref('read')
  const activeStories = ref(getCompleteStories())
  const activeText = ref(map.read.text)

  const setActiveSection = key => {
    const _mapped = map[key]
    activeSection.value = key
    activeStories.value = _mapped.stories || []
    activeText.value = _mapped.text
  }
</script>

<style>
  .user-resume {
    display: grid;
    margin: 0 auto;
    max-width: 500px;
    grid-gap: var(--v-unit-8);
  }
  .user-resume__content {
    display: grid;
    grid-gap: var(--v-unit-2);

    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
  }
</style>
