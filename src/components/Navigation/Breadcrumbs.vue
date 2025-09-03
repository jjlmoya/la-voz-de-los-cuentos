<template>
  <div class="breadcrumbs animate-fadeInUp">
    <VContainer size="xl">
      <nav aria-label="Breadcrumb" class="breadcrumbs-nav">
        <!-- Mobile: Simple back button + title -->
        <div class="breadcrumbs-mobile">
          <a href="/" class="back-button">
            ← {{ t('story.breadcrumb.home') }}
          </a>
          <div class="current-title">
            {{ currentPage }}
          </div>
        </div>
        
        <!-- Desktop: Traditional breadcrumbs -->
        <div class="breadcrumbs-desktop">
          <a href="/" class="breadcrumb-link">
            {{ t('story.breadcrumb.home') }}
          </a>
          
          <template v-if="sagaName">
            <span class="breadcrumb-sep">/</span>
            <a :href="sagaUrl" class="breadcrumb-link">
              {{ sagaName }}
            </a>
          </template>
          
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">
            {{ currentPage }}
          </span>
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
  }
})

const sagaUrl = computed(() => {
  return props.sagaKey ? toSaga(props.sagaKey) : '#'
})
</script>

<style scoped>
.breadcrumbs {
  background-color: var(--v-color-background-soft);
  border-bottom: 1px solid var(--v-color-background);
  margin-bottom: var(--v-unit-6);
  padding: var(--v-unit-4) 0;
}

/* Mobile: Clean back button + title */
.breadcrumbs-mobile {
  display: none;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: var(--v-unit-3) var(--v-unit-4);
  background: var(--v-color-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--v-radius-md);
  font-size: var(--v-font-size-md);
  font-weight: 600;
  min-height: 44px;
  box-shadow: var(--v-shadow-sm);
  transition: all 0.2s ease;
  margin-bottom: var(--v-unit-3);
}

.back-button:focus {
  box-shadow: var(--v-shadow-md), 0 0 0 3px var(--v-color-accent-primary-hover);
}

.current-title {
  font-size: var(--v-font-size-lg);
  font-weight: 700;
  color: var(--v-color-text-high);
  line-height: 1.3;
  padding: 0 var(--v-unit-2);
}

/* Desktop: Traditional breadcrumbs */
.breadcrumbs-desktop {
  display: flex;
  align-items: center;
  gap: var(--v-unit-3);
  flex-wrap: wrap;
}

.breadcrumb-link {
  font-size: var(--v-font-size-md);
  font-weight: 500;
  color: var(--v-color-primary);
  text-decoration: none;
  padding: var(--v-unit-2) var(--v-unit-3);
  border-radius: var(--v-radius-sm);
  transition: all 0.2s ease;
}

.breadcrumb-link:hover {
  background-color: var(--v-color-primary);
  color: white;
}

.breadcrumb-link:focus {
  outline: 2px solid var(--v-color-accent-primary-hover);
  outline-offset: 2px;
}

.breadcrumb-current {
  font-size: var(--v-font-size-md);
  font-weight: 600;
  color: var(--v-color-text-high);
}

.breadcrumb-sep {
  color: var(--v-color-text-low);
  font-size: var(--v-font-size-md);
  user-select: none;
}

@media (max-width: 768px) {
  .breadcrumbs-mobile {
    display: block;
  }
  
  .breadcrumbs-desktop {
    display: none;
  }
}

@media (min-width: 769px) {
  .breadcrumbs-mobile {
    display: none;
  }
  
  .breadcrumbs-desktop {
    display: flex;
  }
}
</style>