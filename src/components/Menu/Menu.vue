<template>
  <VMenu class="menu">
    <VMenuItem v-for="entry in menu" :active="entry.active" :href="entry.link">
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
    toAccount
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
