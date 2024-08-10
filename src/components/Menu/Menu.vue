<template>
  <VMenu class="menu">
    <VLink
      class="menu-link"
      v-for="entry in menu"
      variant="header"
      :color="!entry.active ? 'primary' : ''"
      :href="entry.link"
    >
      {{ entry.label }}
    </VLink>
  </VMenu>
</template>

<script setup>
  import { VMenu, VLink } from '@overgaming/vicius'
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
        console.log('active')
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
  .menu-link {
    padding: var(--v-unit-1) 0;
  }
</style>
