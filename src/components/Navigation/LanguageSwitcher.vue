<template>
  <a
    v-if="alternateUrl"
    :href="alternateUrl"
    :aria-label="t('language.switch.aria')"
    class="language-switcher"
  >
    <div class="language-switcher__content">
      <img
        :src="`/assets/logo/${targetLang}.webp`"
        :alt="`${targetLang.toUpperCase()} Logo`"
        class="language-switcher__logo"
      />
      <div class="language-switcher__text-wrapper">
        <span class="language-switcher__text">{{ targetLang === 'es' ? 'Español' : 'English' }}</span>
      </div>
    </div>
  </a>
</template>

<script setup>
import t from '../../translations'
import { getStories, getSagas, getSongs } from '../../data'

const props = defineProps({
  order: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['story', 'saga', 'song'].includes(value)
  }
})

const lang = import.meta.env.PUBLIC_LANG
const targetLang = lang === 'es' ? 'en' : 'es'
const targetFlag = targetLang === 'es' ? 'ES' : 'EN'

const BASE_URLS = {
  es: 'https://lavozdeloscuentos.es',
  en: 'https://buboboo.com'
}

const PATH_PATTERNS = {
  story: {
    es: '/cuento/',
    en: '/story/'
  },
  saga: {
    es: '/saga/',
    en: '/saga/'
  },
  song: {
    es: '/cancion/',
    en: '/song/'
  }
}

const getTargetItem = () => {
  let items

  switch (props.type) {
    case 'story':
      items = getStories(targetLang)
      break
    case 'saga':
      items = getSagas(targetLang)
      break
    case 'song':
      items = getSongs(targetLang)
      break
    default:
      return null
  }

  return items.find(item => item.order === props.order)
}

const getAlternateUrl = () => {
  const targetItem = getTargetItem()

  if (!targetItem) return null

  const baseUrl = BASE_URLS[targetLang]
  const pathPattern = PATH_PATTERNS[props.type][targetLang]

  return `${baseUrl}${pathPattern}${targetItem.key}/`
}

const alternateUrl = getAlternateUrl()
</script>

<style>
.language-switcher {
  position: fixed;
  right: 0;
  top: 100px;
  z-index: 100;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    .language-switcher__content {
      box-shadow: -6px 6px 24px rgba(var(--v-color-primary-rgb), 0.4);
    }

    .language-switcher__logo {
      transform: rotate(-5deg) scale(1.1);
    }
  }

  @media (width >= 1360px) {
    right: 0;
  }

  @media (max-width: 768px) {
    top: 80px;
  }
}

.language-switcher__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--v-unit-2);
  padding: var(--v-unit-3) var(--v-unit-1);
  background: white;
  border: 3px solid var(--v-color-primary);
  border-right: none;
  border-top-left-radius: var(--v-radius-xl);
  border-bottom-left-radius: var(--v-radius-xl);
  box-shadow: -4px 4px 16px rgba(var(--v-color-primary-rgb), 0.25);
  position: relative;
  overflow: visible;
  transition: box-shadow 0.3s ease;
  writing-mode: vertical-rl;
  text-orientation: mixed;

  @media (max-width: 768px) {
    padding: var(--v-unit-2) var(--v-unit-1);
    gap: var(--v-unit-1);
  }
}

.language-switcher__logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  flex-shrink: 0;
  transform: rotate(-90deg);

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
}

.language-switcher__text-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-switcher__text {
  font-size: 11px;
  font-weight: 700;
  color: var(--v-color-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
  writing-mode: vertical-rl;
  text-orientation: mixed;

  @media (max-width: 768px) {
    font-size: 10px;
  }
}

/* Ensure content is above */
.language-switcher__logo,
.language-switcher__text-wrapper {
  position: relative;
  z-index: 2;
}
</style>
