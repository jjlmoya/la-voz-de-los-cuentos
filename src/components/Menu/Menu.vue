<template>
  <VMenu class="menu">
    <VMenuItem v-for="entry in menu" :active="entry.active" :href="entry.link">
      {{ entry.label }}
    </VMenuItem>
  </VMenu>
</template>

<script setup>
  import { VMenu, VMenuItem } from '@overgaming/vicius'
  import { ref, onMounted } from 'vue'

  const menu = ref([
    {
      label: 'Inicio',
      link: '/'
    },
    {
      label: 'Cuentos',
      link: '/cuentos/'
    },
    {
      label: 'Sagas',
      link: '/sagas/'
    },
    {
      label: 'Cuento Personalizado',
      link: '/personalizado/cuento/'
    },
    {
      label: 'NewsLetter',
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
