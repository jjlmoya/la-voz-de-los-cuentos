<template>
  <VContainer size="xs" class="user-resume" v-if="map.read">
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

    <StoriesSection :stories="activeStories">
      <template #fallback>
        <div v-if="activeSection === 'favorites'"></div>
        <div v-if="activeSection === 'pending'"></div>
        <TutorialProgress v-if="activeSection === 'read'" />
      </template>
    </StoriesSection>
  </VContainer>
</template>

<script setup>
  import { ref, onMounted, toValue } from 'vue'
  import { VContainer } from '@overgaming/vicius'
  import t from '../../translations'
  import UserResumeEntry from './UserResumeEntry.vue'
  import StoriesSection from '../Sections/StoriesSection.vue'
  import useStories from '../../composables/useStories'
  import TutorialProgress from '../Tutorial/Progress.vue'
  const { getCompleteStories, getPendingStories, getFavoriteStories } =
    useStories()

  const map = ref({})
  onMounted(() => {
    map.value = {
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
    activeSection.value = 'read'
    activeStories.value = getCompleteStories()
    activeText.value = toValue(map).read.text
  })
  const activeSection = ref()
  const activeStories = ref()
  const activeText = ref()

  const setActiveSection = key => {
    const _mapped = toValue(map)[key]
    activeSection.value = key
    activeStories.value = _mapped.stories || []
    activeText.value = _mapped.text
  }
</script>

<style>
  .user-resume {
    display: grid;
    margin: 0 auto;
    grid-gap: var(--v-unit-8);
  }
  .user-resume__content {
    display: grid;
    grid-gap: var(--v-unit-2);

    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
  }
</style>
