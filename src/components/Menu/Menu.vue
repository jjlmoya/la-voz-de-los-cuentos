<template>
  <VMenu class="menu stagger-children">
    <VMenuItem 
      v-for="(entry, index) in menu" 
      :active="entry.active" 
      :href="entry.link" 
      class="animate-on-hover btn-playful menu-item-enhanced"
      :class="`menu-item-color-${index % 4}`"
    >
      {{ entry.label }}
    </VMenuItem>
  </VMenu>
</template>

<script setup>
  import t from '../../translations'
  import { VMenu, VMenuItem } from '@overgaming/vicius'
  import { ref, onMounted } from 'vue'
  import {
    toStories,
    toSagas,
    toCustomStory,
    toNewsLetters,
    toAccount,
    toCharacters
  } from '../../router'
  import useNewsLetters from '../../composables/useNewsLetters'
  const { hasNewsLetters } = useNewsLetters()

  const menu = ref(
    [
      {
        label: t('menu.home'),
        link: '/'
      },
      {
        label: t('menu.stories'),
        link: toStories()
      },
      {
        label: t('menu.sagas'),
        link: toSagas()
      },
      {
        label: t('menu.characters'),
        link: toCharacters()
      },
      {
        label: t('menu.account'),
        link: toAccount()
      },
      {
        label: t('menu.custom'),
        link: toCustomStory()
      },
      {
        label: t('menu.newsletter'),
        link: toNewsLetters(),
        hide: !hasNewsLetters()
      }
    ].filter(entry => !entry.hide)
  )

  onMounted(() => {
    const current = window.location.pathname
    menu.value = menu.value.map(entry => {
      if (current === entry.link) {
        return {
          ...entry,
          active: true
        }
      }
      return entry
    })
  })
</script>

<style scoped>
.menu-item-enhanced {
  min-height: 48px !important;
  padding: var(--v-unit-4) var(--v-unit-6) !important;
  margin: var(--v-unit-2) !important;
  border-radius: var(--v-radius-lg) !important;
  font-size: var(--v-font-size-lg) !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  border: 3px solid transparent !important;
  color: white !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
  box-shadow: var(--v-shadow-md) !important;
}

.menu-item-enhanced:focus,
.menu-item-enhanced[active="true"] {
  border-color: var(--v-color-background) !important;
  box-shadow: var(--v-shadow-lg), 0 0 0 4px var(--v-color-accent-primary-hover) !important;
  transform: scale(1.05) !important;
}

.menu-item-color-0 {
  background: linear-gradient(135deg, var(--v-color-primary) 0%, var(--v-color-accent-primary) 100%) !important;
}

.menu-item-color-1 {
  background: linear-gradient(135deg, var(--v-color-accent-primary) 0%, var(--v-color-primary) 100%) !important;
}

.menu-item-color-2 {
  background: linear-gradient(135deg, var(--v-color-primary) 30%, var(--v-color-accent-primary-hover) 100%) !important;
}

.menu-item-color-3 {
  background: linear-gradient(135deg, var(--v-color-accent-primary-hover) 0%, var(--v-color-accent-primary) 100%) !important;
}

@media (max-width: 768px) {
  .menu-item-enhanced {
    min-height: 52px !important;
    padding: var(--v-unit-6) var(--v-unit-8) !important;
    margin: var(--v-unit-3) !important;
    font-size: var(--v-font-size-xl) !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-item-enhanced {
    transition: none !important;
  }
}
</style>
