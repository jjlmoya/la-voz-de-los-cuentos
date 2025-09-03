<template>
  <div class="breadcrumbs animate-fadeInUp">
    <VContainer size="xl">
      <nav aria-label="Breadcrumb">
        <div class="breadcrumbs__trail stagger-children">
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
          <span class="breadcrumb-item breadcrumb-item--current animate-pulse breadcrumb-enhanced breadcrumb-current">
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

.breadcrumbs__trail {
  display: flex;
  align-items: center;
  gap: var(--v-unit-2);
  flex-wrap: wrap;
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

@media (max-width: 768px) {
  .breadcrumb-enhanced {
    font-size: var(--v-font-size-xl) !important;
    padding: var(--v-unit-6) var(--v-unit-8) !important;
    min-height: 48px !important;
  }
  
  .breadcrumbs__trail {
    gap: var(--v-unit-4);
  }
  
  .breadcrumb-sep {
    font-size: var(--v-font-size-xl);
    margin: 0 var(--v-unit-6);
  }
}
</style>