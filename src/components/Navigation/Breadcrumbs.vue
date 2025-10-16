<template>
  <div class="breadcrumbs">
    <VContainer size="xl">
      <nav aria-label="Breadcrumb">
        <!-- Desktop view: Original text buttons -->
        <div class="breadcrumbs__trail breadcrumbs__trail--desktop">
          <a href="/" class="breadcrumb-item breadcrumb-item--home btn-playful breadcrumb-enhanced">
            {{ t('story.breadcrumb.home') }}
          </a>

          <template v-if="sagaName">
            <span class="breadcrumb-sep">→</span>
            <a :href="sagaUrl" class="breadcrumb-item breadcrumb-item--saga btn-playful breadcrumb-enhanced">
              {{ sagaName }}
            </a>
          </template>

          <span class="breadcrumb-sep">→</span>
          <span class="breadcrumb-item breadcrumb-item--current breadcrumb-enhanced breadcrumb-current">
            {{ currentPage }}
          </span>
        </div>

        <!-- Mobile view: Icon-based breadcrumbs -->
        <div class="breadcrumbs__trail breadcrumbs__trail--mobile">
          <!-- Home icon -->
          <a href="/" class="breadcrumb-icon" :aria-label="`${t('story.breadcrumb.home')}`">
            <img src="/assets/menu-icons/home.webp" :alt="t('story.breadcrumb.home')" />
            <span class="breadcrumb-icon__text">{{ t('story.breadcrumb.home') }}</span>
          </a>

          <!-- Saga icon -->
          <template v-if="sagaName">
            <span class="breadcrumb-sep-mobile">→</span>
            <a
              :href="sagaUrl"
              class="breadcrumb-icon"
              :class="{ 'breadcrumb-icon--current': !isStory }"
              :aria-label="sagaName"
            >
              <img
                v-if="sagaIconPath"
                :src="sagaIconPath"
                :alt="sagaName"
                class="breadcrumb-icon__saga"
              />
              <img
                v-else
                src="/assets/menu-icons/sagas.webp"
                :alt="sagaName"
                class="breadcrumb-icon__saga-default"
              />
              <span class="breadcrumb-icon__text">{{ sagaName }}</span>
            </a>
          </template>

          <!-- Story icon (si es un cuento, siempre en mobile) -->
          <template v-if="isStory">
            <span class="breadcrumb-sep-mobile">→</span>
            <span class="breadcrumb-icon breadcrumb-icon--current" :aria-label="currentPage">
              <img src="/assets/menu-icons/stories.webp" :alt="currentPage" />
              <span class="breadcrumb-icon__text">{{ currentPage }}</span>
            </span>
          </template>
        </div>
      </nav>
    </VContainer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { VContainer, VText } from '@overgaming/vicius'
import t from '../../translations'
import { toSaga } from '../../router'

const props = defineProps({
  currentPage: {
    type: String,
    required: true
  },
  sagaName: {
    type: String,
    default: null
  },
  sagaKey: {
    type: String,
    default: null
  },
  isStory: {
    type: Boolean,
    default: true // true si es un cuento, false si es una saga
  }
})

const sagaUrl = computed(() => {
  return props.sagaKey ? toSaga(props.sagaKey) : '#'
})

// Compute saga icon path based on saga key
const sagaIconPath = computed(() => {
  if (!props.sagaKey) return null

  // Map saga keys to their icon filenames
  const iconMap = {
    'la-vida-de-eloy': 'eloy',
    'llamarada': 'llamarada',
    'luna-y-la-fisica': 'luna',
    'sdg': 'sdg',
    'tupi-y-su-sombrero': 'tupi',
    'el-finalizador': 'finalizador',
    'paco-el-cacahuete-sonador': 'paco',
    'carlota-cucaracha': 'cockroach',
    'vuestras-peticiones': 'feather',
    'leyendas': 'legends',
    'el-tragaluces': null, // Use default
    'relojmedio': null, // Use default
    '458': '458'
  }

  const iconName = iconMap[props.sagaKey]
  if (iconName) {
    return `/assets/sagas/${iconName}.webp`
  }
  return null
})
</script>

<style scoped>
.breadcrumbs {
  background-color: var(--v-color-background-soft);
  border-bottom: 1px solid var(--v-color-background);
  margin-bottom: var(--v-unit-6);
  padding: var(--v-unit-4) 0;
}

/* Desktop breadcrumbs (text buttons) */
.breadcrumbs__trail--desktop {
  display: flex;
  align-items: center;
  gap: var(--v-unit-2);
  flex-wrap: wrap;
}

.breadcrumbs__trail--mobile {
  display: none;
}

.breadcrumb-item {
  font-size: var(--v-font-size-sm);
  font-weight: 500;
  padding: var(--v-unit-2) var(--v-unit-3);
  border-radius: var(--v-radius-md);
  text-decoration: none;
  transition: all 0.2s ease;
  color: var(--v-color-text-medium);
}

.breadcrumb-enhanced {
  font-size: var(--v-font-size-lg) !important;
  font-weight: 600 !important;
  padding: var(--v-unit-4) var(--v-unit-6) !important;
  border-radius: var(--v-radius-lg) !important;
  min-height: 44px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
  box-shadow: var(--v-shadow-sm) !important;
  border: 2px solid transparent !important;
}

.breadcrumb-item--home,
.breadcrumb-item--saga {
  background-color: var(--v-color-primary);
  color: white;
}

.breadcrumb-item--home:hover,
.breadcrumb-item--saga:hover {
  background-color: var(--v-color-accent-primary-hover);
  box-shadow: var(--v-shadow-sm);
}

.breadcrumb-item--current {
  background-color: var(--v-color-background);
  color: var(--v-color-text-high);
  border: 1px solid var(--v-color-primary);
  font-weight: 600;
}

.breadcrumb-enhanced.breadcrumb-item--home {
  background: linear-gradient(135deg, var(--v-color-primary) 0%, var(--v-color-accent-primary) 100%) !important;
  color: white !important;
}

.breadcrumb-enhanced.breadcrumb-item--saga {
  background: linear-gradient(135deg, var(--v-color-accent-primary) 0%, var(--v-color-accent-primary-hover) 100%) !important;
  color: white !important;
}

.breadcrumb-current {
  background: linear-gradient(135deg, var(--v-color-background) 0%, var(--v-color-background-soft) 100%) !important;
  color: var(--v-color-text-high) !important;
  border: 3px solid var(--v-color-primary) !important;
  font-weight: 700 !important;
}

.breadcrumb-enhanced:focus {
  border-color: var(--v-color-accent-primary-hover) !important;
  box-shadow: var(--v-shadow-md), 0 0 0 3px var(--v-color-accent-primary-hover) !important;
}

.breadcrumb-sep {
  color: var(--v-color-primary);
  margin: 0 var(--v-unit-4);
  font-size: var(--v-font-size-xl);
  font-weight: 700;
  user-select: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Mobile icon-based breadcrumbs */
.breadcrumb-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--v-unit-1);
  text-decoration: none;
  padding: var(--v-unit-3);
  border-radius: var(--v-radius-lg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: var(--v-color-text-high);
  font-size: var(--v-font-size-xs);
  font-weight: 600;
  min-width: 56px;
  position: relative;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border: 3px solid var(--v-color-primary);
  box-shadow: 0 4px 12px rgba(var(--v-color-primary-rgb), 0.2);
}

.breadcrumb-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.breadcrumb-icon__text {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.breadcrumb-icon:hover:not(.breadcrumb-icon--current),
.breadcrumb-icon:active:not(.breadcrumb-icon--current) {
  background: linear-gradient(135deg, var(--v-color-primary) 0%, var(--v-color-accent-primary) 100%);
  color: white;
  transform: scale(1.15) translateY(-4px);
  box-shadow: 0 8px 20px rgba(var(--v-color-primary-rgb), 0.4);
  border-color: var(--v-color-primary);
}

.breadcrumb-icon:hover:not(.breadcrumb-icon--current) img,
.breadcrumb-icon:active:not(.breadcrumb-icon--current) img {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
  transform: scale(1.2) rotate(-8deg);
}

.breadcrumb-icon:active:not(.breadcrumb-icon--current) {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-color-primary-rgb), 0.3);
}

.breadcrumb-icon:focus-visible {
  outline: 2px solid var(--v-color-primary);
  outline-offset: 2px;
}

.breadcrumb-icon--current {
  pointer-events: none;
  background: linear-gradient(135deg, var(--v-color-background) 0%, var(--v-color-background-soft) 100%);
  border: 2px solid var(--v-color-primary);
  opacity: 1;
  cursor: default;
}

.breadcrumb-icon--current img {
  opacity: 0.7;
}

.breadcrumb-sep-mobile {
  color: var(--v-color-primary);
  font-size: 16px;
  font-weight: 700;
  user-select: none;
  margin: 0 var(--v-unit-1);
  opacity: 0.6;
}

/* Mobile layout */
@media (max-width: 768px) {
  .breadcrumbs {
    padding: var(--v-unit-2) 0;
  }

  .breadcrumbs__trail--desktop {
    display: none;
  }

  .breadcrumbs__trail--mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 var(--v-unit-2);
  }

  .breadcrumb-icon {
    flex-shrink: 0;
    min-width: 48px;
  }

  .breadcrumb-icon img {
    width: 28px;
    height: 28px;
  }

  .breadcrumb-icon__text {
    max-width: 44px;
    font-size: 9px;
  }

  .breadcrumb-sep-mobile {
    margin: 0 var(--v-unit-1);
    font-size: 14px;
  }
}
</style>