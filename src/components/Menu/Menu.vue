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

  const menu = ref([
    {
      label: t('menu.home'),
      link: '/'
    },
    {
      label: t('menu.stories'),
      link: '/cuentos/'
    },
    {
      label: t('menu.sagas'),
      link: '/sagas/'
    },
    {
      label: t('menu.custom'),
      link: '/personalizado/cuento/'
    },
    {
      label: t('menu.newsletter'),
      link: '/newsletters/'
    }
  ])

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
