<template>
  <footer class="footer animate-fadeInUp animate-delay-2">
    <VContainer class="footer-container stagger-children">
      <!-- Header -->
      <div class="footer-header">
        <VText class="footer-title" variant="header" as="h3">
          {{ siteName }} v{{ pkg.version }}
        </VText>
      </div>

      <!-- Newsletter Section -->
      <div class="footer-newsletter">
        <VText variant="subtitle" class="footer-section-title">
          {{ t('footer.newsletter') }}
        </VText>
        <VField class="newsletter-field">
          <VInput
            v-if="!successMessage"
            aria-label="Input Email Newsletter"
            id="emailInput"
            type="email"
            name="emailInput"
            v-model="email"
            :invalid="emailError"
            @input="validateEmail"
            placeholder="tu@email.com"
          />
          <template #label v-if="!successMessage">
            <VFieldLabel for="emailInput">Email:</VFieldLabel>
          </template>
          <template #message>
            <VText v-if="successMessage" class="success-message celebrate animate-bounceIn">
              {{ t('footer.newsletters.thanks') }}
            </VText>
            <VText v-if="emailError" class="error-message">
              {{ t('footer.newsletters.error') }}
            </VText>
          </template>
          <VButton
            v-if="!successMessage"
            color="primary"
            :disabled="!isEmailValid || isSubmitting"
            @click="submitForm"
            class="newsletter-button btn-playful"
          >
            {{ t('footer.newsletter.button') }}
          </VButton>
        </VField>
      </div>

      <!-- Main Content -->
      <div class="footer-content">
        <!-- Sites Section -->
        <div class="footer-section">
          <VText variant="subtitle" class="footer-section-title">
            {{ t('footer.sites') }}
          </VText>
          <div class="footer-links">
            <VLink
              v-for="brand in getBrands()"
              :key="brand.name"
              :href="brand.link"
              rel="noopener noreferrer dofollow"
              class="footer-link link-playful"
            >
              {{ brand.name }} [{{ brand.lang }}]
            </VLink>
          </div>
        </div>

        <!-- Social Media Section -->
        <div class="footer-section">
          <VText variant="subtitle" class="footer-section-title">
            {{ t('footer.community') }}
          </VText>
          <div class="footer-social">
            <VLink
              v-if="links.youtube"
              :href="`https://www.youtube.com/${links.youtube}?sub_confirmation=1`"
              class="footer-link link-playful animate-on-hover"
            >
              Youtube
            </VLink>
            <VLink
              v-if="links.spotify"
              :href="`https://open.spotify.com/show/${links.spotify}`"
              class="footer-link link-playful animate-on-hover"
            >
              Spotify
            </VLink>
            <VLink
              v-if="links.tiktok"
              :href="`https://www.tiktok.com/${links.tiktok}`"
              class="footer-link link-playful animate-on-hover"
            >
              TikTok
            </VLink>
            <VLink
              v-if="links.instagram"
              :href="`https://www.instagram.com/${links.instagram}/`"
              class="footer-link link-playful animate-on-hover"
            >
              Instagram
            </VLink>
            <VLink
              v-if="links.facebook"
              :href="`https://www.facebook.com/${links.facebook}`"
              class="footer-link link-playful animate-on-hover"
            >
              Facebook
            </VLink>
          </div>
        </div>

        <!-- Interesting Section -->
        <div class="footer-section">
          <VText variant="subtitle" class="footer-section-title">
            {{ t('footer.interesting') }}
          </VText>
          <div class="footer-links">
            <VLink :href="toCustomStory()" class="footer-link link-playful animate-on-hover">
              {{ t('footer.interesting.custom') }}
            </VLink>
            <VLink 
              v-if="links.email" 
              :href="`mailto:${links.email}`"
              class="footer-link link-playful animate-on-hover"
            >
              {{ t('footer.interesting.contact') }}
            </VLink>
          </div>
        </div>
      </div>

      <!-- Landing Links -->
      <div class="footer-landing" v-if="landings.length">
        <VLink 
          v-for="(landing, index) in landings" 
          :key="landing.key"
          :href="toLandingsPage(landing.key)"
          class="landing-link"
        >
          {{ landing.title }}{{ index < landings.length - 1 ? ' · ' : '' }}
        </VLink>
      </div>
    </VContainer>
  </footer>
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
    background-color: var(--v-color-background-soft);
    border-radius: var(--v-radius-lg) var(--v-radius-lg) 0 0;
  }

  .footer-container {
    padding: var(--v-unit-8) var(--v-unit-4);
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-6);
  }

  .footer-header {
    text-align: center;
    padding-bottom: var(--v-unit-4);
    border-bottom: 1px solid var(--v-color-text-low);
  }

  .footer-title {
    color: var(--v-color-text-high);
    margin: 0;
  }

  .footer-newsletter {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-3);
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
  }

  .footer-section-title {
    color: var(--v-color-primary);
    font-weight: 500;
    margin: 0 0 var(--v-unit-2) 0;
    text-align: center;
  }

  .newsletter-field {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-2);
  }

  .newsletter-button {
    align-self: stretch;
    margin-top: var(--v-unit-2);
  }

  .success-message {
    color: var(--v-color-accent-primary);
    text-align: center;
  }

  .error-message {
    color: #e74c3c;
    text-align: center;
  }

  .footer-content {
    display: grid;
    gap: var(--v-unit-6);
    grid-template-columns: 1fr;
  }

  .footer-section {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-3);
    text-align: center;
  }

  .footer-links,
  .footer-social {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-2);
    align-items: center;
  }

  .footer-link {
    color: var(--v-color-text-medium);
    text-decoration: none;
    padding: var(--v-unit-1) var(--v-unit-2);
    border-radius: var(--v-radius-sm);
    transition: all 0.2s ease;
    font-size: var(--v-font-size-sm);
  }

  .footer-link:hover {
    color: var(--v-color-text-high);
    background-color: var(--v-color-background);
    transform: translateY(-1px);
  }

  .footer-landing {
    padding-top: var(--v-unit-4);
    border-top: 1px solid var(--v-color-text-low);
    text-align: center;
    line-height: 1.4;
  }

  .landing-link {
    color: var(--v-color-text-low);
    text-decoration: none;
    font-size: var(--v-font-size-xs);
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  .landing-link:hover {
    opacity: 1;
    text-decoration: underline;
  }

  /* Mobile improvements */
  @media (max-width: 480px) {
    .footer-container {
      padding: var(--v-unit-6) var(--v-unit-3);
      gap: var(--v-unit-4);
    }

    .footer-newsletter {
      max-width: 100%;
    }

    .footer-section-title {
      font-size: var(--v-font-size-md);
    }

    .footer-link {
      padding: var(--v-unit-2) var(--v-unit-3);
      font-size: var(--v-font-size-md);
    }
  }

  /* Tablet and Desktop */
  @media (min-width: 768px) {
    .footer-container {
      padding: var(--v-unit-8);
      gap: var(--v-unit-8);
    }

    .footer-content {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--v-unit-8);
    }

    .footer-section {
      text-align: left;
    }

    .footer-section-title {
      text-align: left;
    }

    .footer-links,
    .footer-social {
      align-items: flex-start;
    }

    .footer-newsletter {
      max-width: 500px;
    }

    .newsletter-field {
      flex-direction: row;
      align-items: flex-end;
      gap: var(--v-unit-3);
    }

    .newsletter-button {
      align-self: flex-end;
      margin-top: 0;
      flex-shrink: 0;
    }
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    .footer-content {
      gap: var(--v-unit-12);
    }
  }

  /* Button styling */
  .footer :deep(.v-button) {
    color: white;
  }
</style>
