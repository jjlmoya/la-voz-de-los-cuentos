<template>
  <div class="simple-breadcrumbs">
    <VContainer size="xl">
      <div class="breadcrumb-path">
        
        <!-- Inicio -->
        <div class="breadcrumb-node">
          <a href="/" class="node">
            <span class="node-icon">🏠</span>
            <span class="node-text">{{ t('story.breadcrumb.home') }}</span>
          </a>
        </div>
        
        <!-- Arrow -->
        <div v-if="sagaName || currentPage" class="arrow">→</div>
        
        <!-- Saga -->
        <div v-if="sagaName" class="breadcrumb-node">
          <a :href="sagaUrl" class="node">
            <span class="node-icon">📚</span>
            <span class="node-text">{{ sagaName }}</span>
          </a>
        </div>
        
        <!-- Arrow to story -->
        <div v-if="sagaName && currentPage !== sagaName" class="arrow">→</div>
        
        <!-- Historia actual -->
        <div v-if="sagaName && currentPage !== sagaName" class="breadcrumb-node current">
          <div class="node">
            <span class="node-icon">✨</span>
            <span class="node-text">{{ currentPage }}</span>
          </div>
        </div>
        
      </div>
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

// Ya no necesitamos lógica compleja, solo el sagaUrl
</script>

<style scoped>
.simple-breadcrumbs {
  background: linear-gradient(135deg, 
    var(--v-color-background-soft) 0%, 
    var(--v-color-background) 100%);
  padding: var(--v-unit-4) 0;
  margin-bottom: var(--v-unit-6);
}

.breadcrumb-path {
  display: flex;
  align-items: center;
  gap: var(--v-unit-3);
  flex-wrap: wrap;
}

.breadcrumb-node {
  display: flex;
  align-items: center;
}

.node {
  display: flex;
  align-items: center;
  gap: var(--v-unit-2);
  padding: var(--v-unit-3) var(--v-unit-4);
  background: var(--v-color-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--v-radius-xl);
  font-size: var(--v-font-size-md);
  font-weight: 600;
  box-shadow: var(--v-shadow-sm);
  transition: all 0.3s ease;
  min-height: 44px;
}

.node:hover {
  background: var(--v-color-accent-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--v-shadow-md);
}

.breadcrumb-node.current .node {
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  color: #5d4e37;
  font-weight: 700;
  animation: pulse-current 2s ease-in-out infinite;
}

@keyframes pulse-current {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.node-icon {
  font-size: var(--v-font-size-lg);
  line-height: 1;
}

.node-text {
  font-size: var(--v-font-size-md);
  line-height: 1.2;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.arrow {
  font-size: var(--v-font-size-xl);
  color: var(--v-color-primary);
  font-weight: 700;
  margin: 0 var(--v-unit-2);
}

@media (max-width: 768px) {
  .breadcrumb-path {
    gap: var(--v-unit-2);
  }
  
  .node {
    padding: var(--v-unit-2) var(--v-unit-3);
    font-size: var(--v-font-size-sm);
    min-height: 40px;
  }
  
  .node-text {
    font-size: var(--v-font-size-sm);
    max-width: 120px;
  }
  
  .node-icon {
    font-size: var(--v-font-size-md);
  }
  
  .arrow {
    font-size: var(--v-font-size-lg);
    margin: 0 var(--v-unit-1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .breadcrumb-node.current .node {
    animation: none;
  }
  
  .node {
    transition: none;
  }
}
</style>