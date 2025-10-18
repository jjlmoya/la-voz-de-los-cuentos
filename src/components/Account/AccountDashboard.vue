<template>
  <div class="account-dashboard">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div class="dashboard-header__content">
        <h1 class="dashboard-header__title">{{ t('account.dashboard.title') }}</h1>
        <p class="dashboard-header__subtitle">
          {{ t('account.dashboard.subtitle') }}
        </p>
      </div>
      <div class="dashboard-header__decoration">
        <img src="/assets/account/dashboard-assets/dashboard-decoration.webp" alt="decoration" class="dashboard-header__image" />
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="dashboard-summary">
      <AccountSummary :lang="lang" />
    </div>

    <!-- Streak Card -->
    <div class="dashboard-section">
      <StreakCard />
    </div>

    <!-- Statistics Section -->
    <div class="dashboard-section">
      <h2 class="dashboard-section__title">{{ t('account.dashboard.statistics') }}</h2>
      <div class="stats-grid">
        <div class="stat-card stat-card--time">
          <img src="/assets/account/dashboard-assets/stat-time.webp" alt="time" class="stat-card__icon" />
          <div class="stat-card__label">{{ t('account.dashboard.totalTime') }}</div>
          <div class="stat-card__value">{{ totalTimeSpent || 0 }}h</div>
        </div>
        <div class="stat-card stat-card--progress">
          <img src="/assets/account/dashboard-assets/stat-progress.webp" alt="progress" class="stat-card__icon" />
          <div class="stat-card__label">{{ t('account.dashboard.progress') }}</div>
          <div class="stat-card__value">{{ progressPercentage || 0 }}%</div>
        </div>
        <div class="stat-card stat-card--books">
          <img src="/assets/account/dashboard-assets/stat-books.webp" alt="books" class="stat-card__icon" />
          <div class="stat-card__label">{{ t('account.dashboard.storiesRead') }}</div>
          <div class="stat-card__value">{{ storiesRead || 0 }}</div>
        </div>
      </div>
    </div>

    <!-- Recent Reading History -->
    <div class="dashboard-section" v-if="recentStories.length > 0">
      <h2 class="dashboard-section__title">{{ t('account.dashboard.recentlyReading') }}</h2>
      <div class="stories-row">
        <a
          v-for="story in recentStories"
          :key="story.key"
          :href="toStory(story.key)"
          class="story-card"
        >
          <div class="story-card__progress">
            <div class="story-card__progress-bar" :style="{ width: story.progress + '%' }"></div>
          </div>
          <div class="story-card__content">
            <h3 class="story-card__title">{{ story.name }}</h3>
            <p class="story-card__time">{{ story.timeSpent > 0 ? story.timeSpent : 0 }} min de {{ story.totalTime > 0 ? story.totalTime : 0 }} min</p>
          </div>
        </a>
      </div>
    </div>

    <!-- Suggested Next Stories -->
    <div class="dashboard-section" v-if="suggestedStories.length > 0">
      <h2 class="dashboard-section__title">{{ t('account.dashboard.nextToRead') }}</h2>
      <div class="stories-carousel">
        <a
          v-for="story in suggestedStories"
          :key="story.key"
          :href="toStory(story.key)"
          class="carousel-card"
        >
          <div class="carousel-card__header">
            <span class="carousel-card__tag">{{ t('account.dashboard.suggested') }}</span>
          </div>
          <div class="carousel-card__content">
            <h3 class="carousel-card__title">{{ story.name }}</h3>
            <p class="carousel-card__time">{{ story.time ? Math.ceil(parseInt(story.time) / 60) : 0 }} {{ t('account.dashboard.minutes') }}</p>
            <p class="carousel-card__saga" v-if="story.saga">{{ getSagaName(story.saga) }}</p>
          </div>
          <div class="carousel-card__cta">
            {{ t('account.dashboard.start') }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import AccountSummary from './AccountSummary.vue'
  import StreakCard from '../Cards/StreakCard.vue'
  import useStories from '../../composables/useStories'
  import { getSagas } from '../../data'
  import { toStory } from '../../router'
  import t from '../../translations'

  defineProps({
    lang: {
      type: String,
      default: 'es'
    }
  })

  const { getAllStories } = useStories()
  const allSagas = getSagas()

  const getSagaName = (sagaKey) => {
    const saga = allSagas.find(s => s.key === sagaKey)
    return saga ? saga.name : sagaKey
  }

  const totalTimeSpent = ref(0)
  const progressPercentage = ref(0)
  const storiesRead = ref(0)
  const recentStories = ref([])
  const suggestedStories = ref([])

  onMounted(() => {
    if (typeof localStorage === 'undefined') return

    try {
      const storiesData = localStorage.getItem('storiesData')
      if (!storiesData) return

      const parsedData = JSON.parse(storiesData)
      if (!Array.isArray(parsedData)) return

      const allStories = getAllStories()

      const totalTime = parsedData.reduce((sum, entry) => sum + (entry && entry.spentTime || 0), 0)
      totalTimeSpent.value = Math.round(totalTime / 3600)

      const completedCount = parsedData.filter(entry => entry && entry.finished === true).length
      progressPercentage.value = allStories.length > 0 ? Math.round((completedCount / allStories.length) * 100) : 0

      storiesRead.value = completedCount

      const storiesWithProgress = parsedData
        .map(entry => {
          if (!entry || !entry.key) return null
          const fullStory = allStories.find(s => s.key === entry.key)
          if (!fullStory) return null
          const totalTimeNum = parseFloat(String(entry.totalTime).replace(',', '.'))
          if (isNaN(totalTimeNum) || totalTimeNum <= 0) return null
          const progress = Math.round((entry.spentTime / totalTimeNum) * 100)
          return {
            ...fullStory,
            timeSpent: Math.max(0, Math.round(entry.spentTime / 60)),
            totalTime: Math.max(1, Math.ceil(totalTimeNum / 60)),
            progress: Math.min(100, Math.max(0, progress))
          }
        })
        .filter(s => s && s.progress > 0 && s.progress < 100)
        .sort((a, b) => b.timeSpent - a.timeSpent)
        .slice(0, 3)

      recentStories.value = storiesWithProgress

      const unreadStories = allStories.filter(story => {
        const storyData = parsedData.find(s => s && s.key === story.key)
        return !storyData || storyData.finished !== true
      })

      suggestedStories.value = unreadStories
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  })
</script>

<style scoped>
  .account-dashboard {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-12);
    padding: var(--v-unit-8);
  }

  .dashboard-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--v-unit-8);
    align-items: center;
    background: linear-gradient(135deg, var(--v-color-accent-primary-alpha-10), var(--v-color-primary-alpha-5));
    padding: var(--v-unit-8);
    border-radius: var(--v-radius-xl);
    border: 1px solid var(--v-color-primary-alpha-20);
  }

  .dashboard-header__title {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: var(--v-color-primary);
    line-height: 1.2;
  }

  .dashboard-header__subtitle {
    margin: var(--v-unit-3) 0 0 0;
    font-size: 16px;
    color: var(--v-color-text-medium);
  }

  .dashboard-header__image {
    width: 200px;
    height: 200px;
    object-fit: contain;
    opacity: 0.9;
  }

  .dashboard-summary {
    margin: 0;
  }

  .dashboard-section {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-6);
  }

  .dashboard-section__title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--v-unit-6);
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--v-unit-3);
    padding: var(--v-unit-6);
    background: linear-gradient(135deg, var(--v-color-surface-high), var(--v-color-surface));
    border: 1px solid var(--v-color-primary-alpha-20);
    border-radius: var(--v-radius-lg);
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    border-color: var(--v-color-primary-alpha-40);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .stat-card__icon {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  .stat-card--time {
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05));
    border-color: rgba(255, 152, 0, 0.3);
  }

  .stat-card--progress {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
    border-color: rgba(76, 175, 80, 0.3);
  }

  .stat-card--books {
    background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05));
    border-color: rgba(233, 30, 99, 0.3);
  }

  .stat-card__label {
    font-size: 12px;
    color: var(--v-color-text-medium);
    text-align: center;
  }

  .stat-card__value {
    font-size: 24px;
    font-weight: 700;
    color: var(--v-color-primary);
  }

  .stories-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--v-unit-6);
  }

  .story-card {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-3);
    padding: var(--v-unit-4);
    background: linear-gradient(135deg, var(--v-color-surface-high), var(--v-color-surface));
    border: 1px solid var(--v-color-primary-alpha-20);
    border-radius: var(--v-radius-lg);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .story-card:hover {
    transform: translateY(-4px);
    border-color: var(--v-color-primary-alpha-40);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .story-card__progress {
    width: 100%;
    height: 6px;
    background: var(--v-color-primary-alpha-20);
    border-radius: var(--v-radius-sm);
    overflow: hidden;
  }

  .story-card__progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--v-color-primary), var(--v-color-accent-primary));
    transition: width 0.3s ease;
  }

  .story-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-2);
  }

  .story-card__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--v-color-text-high);
  }

  .story-card__time {
    margin: 0;
    font-size: 13px;
    color: var(--v-color-text-medium);
  }

  .stories-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--v-unit-6);
  }

  .carousel-card {
    display: flex;
    flex-direction: column;
    padding: var(--v-unit-6);
    background: linear-gradient(135deg, var(--v-color-accent-primary-alpha-10), var(--v-color-primary-alpha-5));
    border: 2px solid var(--v-color-primary);
    border-radius: var(--v-radius-lg);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    gap: var(--v-unit-4);
  }

  .carousel-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--v-color-accent-primary);
  }

  .carousel-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .carousel-card__tag {
    display: inline-block;
    padding: 4px 12px;
    background: var(--v-color-primary);
    color: white;
    font-size: 11px;
    font-weight: 700;
    border-radius: var(--v-radius-sm);
  }

  .carousel-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-2);
    flex: 1;
  }

  .carousel-card__title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--v-color-text-high);
  }

  .carousel-card__time {
    margin: 0;
    font-size: 14px;
    color: var(--v-color-text-medium);
  }

  .carousel-card__saga {
    margin: 0;
    font-size: 13px;
    color: var(--v-color-primary);
    font-weight: 600;
  }

  .carousel-card__cta {
    align-self: flex-start;
    padding: var(--v-unit-2) var(--v-unit-4);
    background: var(--v-color-primary);
    color: white;
    font-size: 14px;
    font-weight: 600;
    border-radius: var(--v-radius-sm);
    transition: all 0.3s ease;
  }

  .carousel-card:hover .carousel-card__cta {
    background: var(--v-color-accent-primary);
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    .account-dashboard {
      gap: var(--v-unit-8);
      padding: var(--v-unit-4);
    }

    .dashboard-header {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .dashboard-header__title {
      font-size: 24px;
    }

    .dashboard-header__image {
      width: 150px;
      height: 150px;
    }

    .dashboard-section__title {
      font-size: 20px;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--v-unit-4);
    }

    .stories-row,
    .stories-carousel {
      grid-template-columns: 1fr;
    }
  }
</style>
