<template>
  <div class="footer">
    <div class="footer-header">
      <VText class="footer-title" variant="header" as="h3"
        >{{ siteName }} v{{ pkg.version }}</VText
      >
    </div>
    <VDivider class="footer-divider">{{ t('footer.newsletter') }}</VDivider>
    <VContainer size="xs" class="footer-newsletter">
      <div class="footer-newsletter__content">
        <VField>
          <VInput
            v-if="!successMessage"
            aria-label="Input Email Newsletter"
            id="emailInput"
            type="email"
            name="emailInput"
            v-model="email"
            :invalid="emailError"
            @input="validateEmail"
          />
          <template #label v-if="!successMessage">
            <VFieldLabel for="emailInput">Email:</VFieldLabel>
          </template>
          <template #message>
            <VText v-if="successMessage">{{
              t('footer.newsletters.thanks')
            }}</VText>
            <VText v-if="emailError">{{ t('footer.newsletters.error') }}</VText>
          </template>
          <VButton
            v-if="!successMessage"
            color="primary"
            :disabled="!isEmailValid || isSubmitting"
            @click="submitForm"
          >
            {{ t('footer.newsletter.button') }}
          </VButton>
        </VField>
      </div>
    </VContainer>
    <div class="footer-wrapper">
      <div class="footer-links">
        <VDivider>{{ t('footer.sites') }}</VDivider>
      </div>

      <div class="footer-links">
        <VDivider>{{ t('footer.community') }}</VDivider>
      </div>
      <div class="footer-links">
        <VDivider>{{ t('footer.interesting') }}</VDivider>
      </div>
    </div>
    <div class="footer-wrapper">
      <div class="footer-links">
        <VLink
          v-for="brand in getBrands()"
          :href="brand.link"
          rel="noopener noreferrer dofollow"
          >{{ brand.name }} [{{ brand.lang }}]</VLink
        >
      </div>
      <!--
      <div class="footer-links">
        <VLink href="/saga/la-vida-de-eloy/">La Vida de Eloy</VLink>
        <VLink href="/saga/sdg/">Sistema de Distribución de Gatos</VLink>
        <VLink href="/saga/luna-y-la-fisica/">Luna y la ciencia</VLink>
        <VLink href="/saga/llamarada/">Llamarada en Imaginaria</VLink>
      </div>
      -->
      <div class="footer-links">
        <div class="footer-links__element">
          <VLink
            v-if="links.youtube"
            :href="`https://www.youtube.com/${links.youtube}?sub_confirmation=1`"
            >Youtube</VLink
          >
        </div>
        <div class="footer-links__element">
          <VLink
            v-if="links.spotify"
            :href="`https://open.spotify.com/show/${links.spotify}`"
            >Spotify</VLink
          >
        </div>
        <div class="footer-links__element">
          <VLink
            v-if="links.tiktok"
            :href="`https://www.tiktok.com/${links.tiktok}`"
            >TikTok</VLink
          >
        </div>
        <div class="footer-links__element">
          <VLink
            v-if="links.instagram"
            :href="`https://www.instagram.com/${links.instagram}/`"
            >Instagram</VLink
          >
        </div>
        <div class="footer-links__element">
          <VLink
            v-if="links.facebook"
            :href="`https://www.facebook.com/${links.facebook}`"
            >Facebook</VLink
          >
        </div>
      </div>
      <div class="footer-links">
        <VLink :href="toCustomStory()">{{
          t('footer.interesting.custom')
        }}</VLink>
        <VLink v-if="links.email" :href="`mailto:${links.email}`">{{
          t('footer.interesting.contact')
        }}</VLink>
        <!--<VLink href="/legal/cookies/">Política de Cookies</VLink>-->
        <!--<VLink href="/legal/privacidad/">Política de Privacidad</VLink>-->
      </div>
    </div>
    <div class="footer-landing">
      ·
      <VLink v-for="landing in landings" :href="toLandingsPage(landing.key)">
        {{ landing.title }}
      </VLink>
    </div>
  </div>
</template>
<script setup>
  import pkg from '../../../package.json'
  import t from '../../translations'
  import useLandings from '../../composables/useLandings'
  const { getBrands } = useBrand()
  const siteName = import.meta.env.PUBLIC_SITE_NAME
  const lang = import.meta.env.PUBLIC_LANG
  const newsletterEndpoint = import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT
  import { toCustomStory, toLandingsPage } from '../../router'
  const { getAll } = useLandings()

  const landings = getAll()

  const links = {
    email: import.meta.env.PUBLIC_EMAIL,
    instagram: import.meta.env.PUBLIC_INSTAGRAM_USER,
    tiktok: import.meta.env.PUBLIC_TIKTOK_USER,
    spotify: import.meta.env.PUBLIC_SPOTIFY_ID,
    twitter: import.meta.env.PUBLIC_TWITTER_USER,
    youtube: import.meta.env.PUBLIC_YOUTUBE_ID,
    facebook: import.meta.env.PUBLIC_FB_USER
  }
  import { ref } from 'vue'
  import {
    VText,
    VLink,
    VDivider,
    VInput,
    VContainer,
    VFieldLabel,
    VField,
    VButton
  } from '@overgaming/vicius'
  import useBrand from '../../composables/useBrand'

  const email = ref('')
  const emailError = ref(false)
  const successMessage = ref(false)
  const isEmailValid = ref(false)
  const isSubmitting = ref(false)

  function validateEmail() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    isEmailValid.value = re.test(String(email.value).toLowerCase())
    emailError.value = !isEmailValid.value
  }

  async function submitForm() {
    if (!isEmailValid.value) return

    isSubmitting.value = true
    emailError.value = false
    successMessage.value = false

    try {
      const response = await fetch(newsletterEndpoint, {
        method: 'POST',
        body: JSON.stringify({ email: email.value, lang, story: false }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        }
      })

      const result = await response.json()
      if (result.result === 'success') {
        successMessage.value = true
        email.value = ''
      } else {
        emailError.value = true
      }
    } catch (error) {
      console.error('Error:', error)
      emailError.value = true
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped>
  .footer {
    margin-top: var(--v-unit-12);
    padding: var(--v-unit-8);
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-4) var(--v-unit-4) 0 0;
    align-items: center;
    display: grid;
    grid-gap: var(--v-unit-3);
    .v-button {
      color: white;
    }
  }

  .footer-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: var(--v-unit-4);
    text-align: center;
    align-items: start;
  }
  .footer-newsletter {
    width: 100%;
    display: grid;
    justify-content: center;
  }

  .footer-title {
    text-align: center;
  }

  .footer-links {
    font-size: 16px;
    display: grid;
    grid-gap: var(--v-unit-1);
    align-items: center;
  }

  .footer-input-error {
  }
  .footer-input-success {
  }
  .footer-divider {
    color: var(--v-color-primary);
  }
  .footer-landing {
    line-height: 1;
    font-size: 9px;
    .v-link {
      padding: 0 var(--v-unit-1);
      text-decoration: underline;
      opacity: 0.8;
    }
  }
</style>
