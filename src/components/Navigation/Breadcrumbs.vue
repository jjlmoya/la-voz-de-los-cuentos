<template>
  <div class="breadcrumbs animate-fadeInUp">
    <VContainer size="xl">
      <nav aria-label="Breadcrumb">
        <div class="breadcrumbs__trail stagger-children">
          <a href="/" class="breadcrumb-item breadcrumb-item--home btn-playful">
            {{ t('story.breadcrumb.home') }}
          </a>
          
          <template v-if="sagaName">
            <span class="breadcrumb-sep">/</span>
            <a :href="sagaUrl" class="breadcrumb-item breadcrumb-item--saga btn-playful">
              {{ sagaName }}
            </a>
          </template>
          
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-item breadcrumb-item--current animate-pulse">
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

.breadcrumb-sep {
  color: var(--v-color-text-low);
  margin: 0 var(--v-unit-2);
  font-size: var(--v-font-size-sm);
  user-select: none;
}
</style>