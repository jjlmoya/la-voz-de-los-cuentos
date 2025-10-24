<template>
  <div class="level-progress-section">
    <!-- Profile Header with Level Badge -->
    <div class="level-profile">
      <div class="level-profile__avatar-wrapper">
        <img
          :src="`/assets/account/dashboard-assets/avatar-level-${playerProfile.level}.png`"
          :alt="`Level ${playerProfile.level}`"
          class="level-profile__avatar"
        />
        <div class="level-profile__badge">
          <img
            src="/assets/account/dashboard-assets/level-badge.png"
            alt="level"
            class="level-profile__badge-icon"
          />
          <span class="level-profile__badge-number">{{ playerProfile.level }}</span>
        </div>
      </div>

      <div class="level-profile__info">
        <div class="level-profile__title">{{ playerProfile.titleKey ? t(playerProfile.titleKey) : playerProfile.title }}</div>
        <div class="level-profile__subtitle">{{ t('gamification.level.title') }}</div>
        <div class="level-profile__xp">
          <span class="level-profile__xp-label">{{ t('gamification.xp.total') }}</span>
          <span class="level-profile__xp-value">{{ playerProfile.totalXP.toLocaleString() }} XP</span>
        </div>
      </div>
    </div>

    <!-- XP Progress Bar -->
    <div class="xp-progress-container">
      <div class="xp-progress-header">
        <div>
          <span class="xp-progress-current">{{ playerProfile.currentLevelXP }}/{{ playerProfile.nextLevelXP }} XP</span>
        </div>
        <div v-if="!nextLevelInfo.isMaxLevel" class="xp-progress-next">
          {{ t('gamification.level.nextLevel') }}: {{ nextLevelInfo.level }}
        </div>
        <div v-else class="xp-progress-max">
          {{ t('gamification.level.reached') }} {{ playerProfile.level }}
        </div>
      </div>

      <div class="xp-progress-bar-wrapper">
        <img
          src="/assets/account/dashboard-assets/xp-bar.png"
          alt="xp bar"
          class="xp-progress-bar-background"
        />
        <div
          class="xp-progress-bar-fill"
          :style="{ width: nextLevelInfo.xpProgress + '%' }"
        ></div>
        <div class="xp-progress-bar-label">
          {{ Math.round(nextLevelInfo.xpProgress) }}%
        </div>
      </div>
    </div>

    <!-- Reading Statistics -->
    <div class="reading-stats">
      <h3 class="reading-stats__title">{{ t('account.dashboard.readingStats') }}</h3>
      <div class="stats-row">
        <div class="stat">
          <div class="stat__label">{{ t('account.dashboard.storiesRead') }}</div>
          <div class="stat__value">{{ readingStats.totalStoriesRead }}</div>
        </div>
        <div class="stat">
          <div class="stat__label">{{ t('account.dashboard.totalReading') }}</div>
          <div class="stat__value">{{ readingStats.totalReadingTime }}</div>
        </div>
        <div class="stat">
          <div class="stat__label">{{ t('account.dashboard.averagePerStory') }}</div>
          <div class="stat__value">{{ readingStats.averagePerStory }} min</div>
        </div>
      </div>
    </div>

    <!-- Level Tiers Info -->
    <div class="level-tiers">
      <h3 class="level-tiers__title">{{ t('gamification.level.title') }}</h3>
      <div class="tiers-grid">
        <div
          v-for="tier in levelTiers"
          :key="tier.tier"
          :class="['tier-card', `tier-card--${tier.tier}`, { 'tier-card--active': isCurrentTier(tier.tier) }]"
        >
          <div class="tier-card__levels">{{ tier.minLevel }}-{{ tier.maxLevel }}</div>
          <div class="tier-card__title">{{ t(tier.titleKey) }}</div>
          <div class="tier-card__color-dot" :style="{ backgroundColor: getColorValue(tier.color) }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useGameification from '../../composables/useGameification'
import t from '../../translations'

const { playerProfile, nextLevelInfo, readingStats } = useGameification()

const levelTiers = [
  { tier: 'apprentice', minLevel: 1, maxLevel: 3, titleKey: 'gamification.level.apprentice', color: 'blue' },
  { tier: 'adventurer', minLevel: 4, maxLevel: 6, titleKey: 'gamification.level.adventurer', color: 'green' },
  { tier: 'explorer', minLevel: 7, maxLevel: 9, titleKey: 'gamification.level.explorer', color: 'purple' },
  { tier: 'guardian', minLevel: 10, maxLevel: 15, titleKey: 'gamification.level.guardian', color: 'gold' },
  { tier: 'master', minLevel: 16, maxLevel: 20, titleKey: 'gamification.level.master', color: 'silver' }
]

const colorMap = {
  blue: 'rgb(33, 150, 243)',
  green: 'rgb(76, 175, 80)',
  purple: 'rgb(156, 39, 176)',
  gold: 'rgb(255, 193, 7)',
  silver: 'rgb(158, 158, 158)'
}

function getColorValue(color) {
  return colorMap[color] || colorMap.blue
}

function isCurrentTier(tier) {
  const tierMap = {
    apprentice: [1, 3],
    adventurer: [4, 6],
    explorer: [7, 9],
    guardian: [10, 15],
    master: [16, 20]
  }
  const [min, max] = tierMap[tier]
  return playerProfile.value.level >= min && playerProfile.value.level <= max
}
</script>

<style scoped>
.level-progress-section {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-8);
  padding: var(--v-unit-8);
  background: linear-gradient(135deg, var(--v-color-accent-primary-alpha-10), var(--v-color-primary-alpha-5));
  border-radius: var(--v-radius-xl);
  border: 2px solid var(--v-color-primary-alpha-30);
}

/* Profile Section */
.level-profile {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--v-unit-6);
  align-items: center;
  padding: var(--v-unit-6);
  background: white;
  border-radius: var(--v-radius-lg);
  border: 1px solid var(--v-color-primary-alpha-20);
}

.level-profile__avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
}

.level-profile__avatar {
  width: 100%;
  height: 100%;
  border-radius: var(--v-radius-lg);
  object-fit: cover;
  border: 3px solid var(--v-color-primary);
}

.level-profile__badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: white;
  border: 3px solid var(--v-color-primary);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.level-profile__badge-icon {
  width: 36px;
  height: 36px;
  position: absolute;
}

.level-profile__badge-number {
  font-size: 20px;
  font-weight: 700;
  color: var(--v-color-primary);
  z-index: 1;
}

.level-profile__info {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-3);
}

.level-profile__title {
  font-size: 24px;
  font-weight: 700;
  color: var(--v-color-primary);
  margin: 0;
}

.level-profile__subtitle {
  font-size: 14px;
  color: var(--v-color-text-medium);
  margin: 0;
}

.level-profile__xp {
  display: flex;
  align-items: center;
  gap: var(--v-unit-3);
  padding: var(--v-unit-3) var(--v-unit-4);
  background: var(--v-color-primary-alpha-10);
  border-radius: var(--v-radius-md);
}

.level-profile__xp-label {
  font-size: 12px;
  color: var(--v-color-text-medium);
  font-weight: 600;
}

.level-profile__xp-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--v-color-primary);
}

/* XP Progress Section */
.xp-progress-container {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-4);
  padding: var(--v-unit-6);
  background: white;
  border-radius: var(--v-radius-lg);
  border: 1px solid var(--v-color-primary-alpha-20);
}

.xp-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--v-unit-3);
  font-size: 14px;
  color: var(--v-color-text-medium);
}

.xp-progress-current {
  font-weight: 600;
  color: var(--v-color-primary);
}

.xp-progress-next {
  padding: 4px 12px;
  background: var(--v-color-primary-alpha-10);
  border-radius: var(--v-radius-sm);
  font-weight: 600;
}

.xp-progress-max {
  padding: 4px 12px;
  background: var(--v-color-accent-primary-alpha-10);
  border-radius: var(--v-radius-sm);
  font-weight: 600;
  color: var(--v-color-accent-primary);
}

.xp-progress-bar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  background: var(--v-color-surface);
  border-radius: var(--v-radius-md);
  overflow: hidden;
  border: 1px solid var(--v-color-primary-alpha-20);
}

.xp-progress-bar-background {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  object-fit: cover;
}

.xp-progress-bar-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--v-color-primary), var(--v-color-accent-primary));
  border-radius: var(--v-radius-md);
  transition: width 0.5s ease;
  min-width: 2%;
  box-shadow: 0 0 20px rgba(33, 150, 243, 0.4);
}

.xp-progress-bar-label {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Reading Stats Section */
.reading-stats {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-4);
  padding: var(--v-unit-6);
  background: white;
  border-radius: var(--v-radius-lg);
  border: 1px solid var(--v-color-primary-alpha-20);
}

.reading-stats__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--v-color-text-high);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--v-unit-4);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-2);
  padding: var(--v-unit-3);
  background: var(--v-color-primary-alpha-10);
  border-radius: var(--v-radius-md);
  text-align: center;
}

.stat__label {
  font-size: 12px;
  color: var(--v-color-text-medium);
  font-weight: 600;
}

.stat__value {
  font-size: 20px;
  font-weight: 700;
  color: var(--v-color-primary);
}

/* Level Tiers Section */
.level-tiers {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-4);
  padding: var(--v-unit-6);
  background: white;
  border-radius: var(--v-radius-lg);
  border: 1px solid var(--v-color-primary-alpha-20);
}

.level-tiers__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--v-color-text-high);
}

.tiers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--v-unit-4);
}

.tier-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--v-unit-3);
  padding: var(--v-unit-4);
  background: var(--v-color-surface);
  border: 2px solid var(--v-color-primary-alpha-20);
  border-radius: var(--v-radius-md);
  text-align: center;
  transition: all 0.3s ease;
}

.tier-card--active {
  border-color: var(--v-color-primary);
  background: var(--v-color-primary-alpha-10);
  box-shadow: 0 0 12px rgba(33, 150, 243, 0.2);
}

.tier-card__levels {
  font-size: 12px;
  font-weight: 700;
  color: var(--v-color-text-medium);
}

.tier-card__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--v-color-text-high);
}

.tier-card__color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.tier-card--active .tier-card__color-dot {
  transform: scale(1.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .level-progress-section {
    padding: var(--v-unit-4);
    gap: var(--v-unit-6);
  }

  .level-profile {
    grid-template-columns: 1fr;
    gap: var(--v-unit-4);
    padding: var(--v-unit-4);
  }

  .level-profile__avatar-wrapper {
    justify-self: center;
    width: 100px;
    height: 100px;
  }

  .level-profile__info {
    text-align: center;
  }

  .level-profile__title {
    font-size: 20px;
  }

  .tiers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
