<template>
  <div v-if="showCookieConsent" class="cookie-consent">
    <VText>
      Para mejorar la experiencia necesitamos cookies de terceros, <br />
      sólo usamos Google Analytics ¿Aceptas las cookies?
    </VText>
    <div class="cookie-consent-buttons">
      <VButton size="xs" @click="acceptCookies" class="cookie-consent-button"
        >Aceptar Cookies</VButton
      >
      <VButton
        variant="text"
        size="xs"
        @click="rejectCookies"
        class="cookie-consent-reject-button"
        >Rechazar</VButton
      >
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { VButton, VText } from '@overgaming/vicius'
  const showCookieConsent = ref(false)

  const acceptCookies = () => {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'G-PXYY4HM36E')
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    })
    localStorage.setItem('cookieConsent', 'granted')
    showCookieConsent.value = false
  }

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    showCookieConsent.value = false
  }

  onMounted(() => {
    if (!localStorage.getItem('cookieConsent')) {
      showCookieConsent.value = true
    }
  })
</script>

<style scoped>
  .cookie-consent {
    position: fixed;
    display: grid;
    justify-content: center;
    bottom: 0;
    left: var(--v-unit-2);
    right: var(--v-unit-2);
    background-color: rgba(0, 0, 0, 0.8);
    padding: var(--v-unit-2);
    text-align: center;
    border-radius: var(--v-unit-1);
  }

  .cookie-consent-buttons {
    margin-top: var(--v-unit-4);
    display: grid;
    grid-gap: var(--v-unit-1);
    grid-auto-flow: row;
    justify-content: center;
    align-items: center;
  }
</style>
