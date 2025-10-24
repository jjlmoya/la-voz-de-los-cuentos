<template>
  <nav class="menu-nav">
    <a
      v-for="entry in menu"
      :key="entry.link"
      :href="entry.link"
      class="menu-item"
      :class="{ 'menu-item--active': entry.active }"
    >
      <img
        :src="`/assets/menu-icons/${entry.icon}.webp`"
        :alt="entry.label"
        class="menu-item__icon"
      />
      <span class="menu-item__text">{{ entry.label }}</span>
      <!-- Level Badge for Account Menu Item - Client Only to avoid hydration mismatch -->
      <ClientOnly>
        <span v-if="entry.link === toAccount()" class="menu-item__level-badge">
          <span class="menu-item__level-label">Nivel</span>
          <span class="menu-item__level-number">{{ playerProfile.level }}</span>
        </span>
      </ClientOnly>
    </a>
  </nav>
</template>

<script setup>
  import { ClientOnly } from 'astro:components'
  import t from '../../translations'
  import { ref, onMounted } from 'vue'
  import {
    toStories,
    toSagas,
    toCustomStory,
    toNewsLetters,
    toAccount,
    toCharacters,
    toSongs
  } from '../../router'
  import useNewsLetters from '../../composables/useNewsLetters'
  import useGameification from '../../composables/useGameification'
  const { hasNewsLetters } = useNewsLetters()
  const { playerProfile } = useGameification()

  const menu = ref(
    [
      {
        label: t('menu.home'),
        link: '/',
        icon: 'home'
      },
      {
        label: t('menu.stories'),
        link: toStories(),
        icon: 'stories'
      },
      {
        label: t('menu.sagas'),
        link: toSagas(),
        icon: 'sagas'
      },
      {
        label: t('menu.songs'),
        link: toSongs(),
        icon: 'songs'
      },
      {
        label: t('menu.characters'),
        link: toCharacters(),
        icon: 'characters'
      },
      {
        label: t('menu.account'),
        link: toAccount(),
        icon: 'account'
      },
      {
        label: t('menu.custom'),
        link: toCustomStory(),
        icon: 'custom'
      },
      {
        label: t('menu.newsletter'),
        link: toNewsLetters(),
        icon: 'newsletter',
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
.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: var(--v-unit-2) 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--v-unit-4);
  padding: 8px var(--v-unit-4);
  padding-left: 6px;
  margin: var(--v-unit-6) var(--v-unit-3);
  margin-left: var(--v-unit-6);
  height: 44px;
  font-size: var(--v-font-size-md);
  font-weight: 700;
  line-height: 1.2;
  color: var(--v-color-text-high);
  text-decoration: none;
  border-radius: 24px;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: visible;
}

.menu-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg,
    rgba(255, 182, 193, 0.5),
    rgba(135, 206, 250, 0.5),
    rgba(152, 251, 152, 0.5),
    rgba(255, 218, 185, 0.5));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-item:nth-child(1)::before { background: linear-gradient(135deg, rgba(255, 182, 193, 0.6), rgba(255, 105, 180, 0.6)); }
.menu-item:nth-child(2)::before { background: linear-gradient(135deg, rgba(135, 206, 250, 0.6), rgba(79, 195, 247, 0.6)); }
.menu-item:nth-child(3)::before { background: linear-gradient(135deg, rgba(152, 251, 152, 0.6), rgba(129, 199, 132, 0.6)); }
.menu-item:nth-child(4)::before { background: linear-gradient(135deg, rgba(255, 218, 185, 0.6), rgba(255, 179, 0, 0.6)); }
.menu-item:nth-child(5)::before { background: linear-gradient(135deg, rgba(221, 160, 221, 0.6), rgba(186, 85, 211, 0.6)); }
.menu-item:nth-child(6)::before { background: linear-gradient(135deg, rgba(255, 215, 0, 0.6), rgba(255, 193, 7, 0.6)); }
.menu-item:nth-child(7)::before { background: linear-gradient(135deg, rgba(238, 130, 238, 0.6), rgba(218, 112, 214, 0.6)); }
.menu-item:nth-child(8)::before { background: linear-gradient(135deg, rgba(173, 216, 230, 0.6), rgba(135, 206, 235, 0.6)); }

.menu-item__icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
  margin-left: -20px;
  z-index: 2;
  position: relative;
  animation: subtle-bounce 3s ease-in-out infinite;
}

.menu-item:nth-child(1) .menu-item__icon { animation-delay: 0s; }
.menu-item:nth-child(2) .menu-item__icon { animation-delay: 0.2s; }
.menu-item:nth-child(3) .menu-item__icon { animation-delay: 0.4s; }
.menu-item:nth-child(4) .menu-item__icon { animation-delay: 0.6s; }
.menu-item:nth-child(5) .menu-item__icon { animation-delay: 0.8s; }
.menu-item:nth-child(6) .menu-item__icon { animation-delay: 1s; }
.menu-item:nth-child(7) .menu-item__icon { animation-delay: 1.2s; }
.menu-item:nth-child(8) .menu-item__icon { animation-delay: 1.4s; }

@keyframes subtle-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-4px) scale(1.05); }
}

.menu-item__text {
  position: relative;
  flex: 1;
}

.menu-item__level-badge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 48px;
  padding: 4px 8px;
  background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.4);
  margin-left: auto;
  animation: pulse 2s ease-in-out infinite;
}

.menu-item__level-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.menu-item__level-number {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.4);
  }
  50% {
    box-shadow: 0 2px 16px rgba(33, 150, 243, 0.7);
  }
}

.menu-item--active .menu-item__level-badge {
  animation: pulse-active 1.5s ease-in-out infinite;
}

@keyframes pulse-active {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.6), 0 0 0 0 rgba(33, 150, 243, 0.7);
  }
  50% {
    box-shadow: 0 4px 20px rgba(33, 150, 243, 0.8), 0 0 0 8px rgba(33, 150, 243, 0);
  }
}

.menu-item--active {
  transform: translateX(4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.menu-item--active::before {
  opacity: 1;
}

.menu-item--active .menu-item__icon {
  transform: scale(1.15) rotate(-8deg);
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.25));
  animation: wiggle-infinite 2s ease-in-out infinite;
}

@keyframes wiggle-infinite {
  0%, 100% { transform: scale(1.15) rotate(-8deg) translateY(0); }
  15% { transform: scale(1.2) rotate(-12deg) translateY(-3px); }
  30% { transform: scale(1.15) rotate(-4deg) translateY(0); }
  45% { transform: scale(1.18) rotate(-10deg) translateY(-2px); }
  60% { transform: scale(1.15) rotate(-6deg) translateY(0); }
  75% { transform: scale(1.17) rotate(-11deg) translateY(-1px); }
}

@keyframes slideIn {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
