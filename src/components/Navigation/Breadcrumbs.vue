<template>
  <div class="story-path">
    <VContainer size="xl">
      <div class="path-container">
        <!-- Historia como un camino de piedras -->
        <div class="story-stones">
          <a href="/" class="stone stone--home">
            <span class="stone-text">{{ t('story.breadcrumb.home') }}</span>
          </a>
          
          <div class="path-line"></div>
          
          <a v-if="sagaName" :href="sagaUrl" class="stone stone--saga">
            <span class="stone-text">{{ sagaName }}</span>
          </a>
          
          <div v-if="sagaName" class="path-line"></div>
          
          <div class="stone stone--current">
            <span class="stone-text">{{ currentPage }}</span>
            <div class="current-glow"></div>
          </div>
        </div>
        
        <!-- Mobile: Mapa del tesoro style -->
        <div class="treasure-map">
          <div class="map-header">
            <span class="map-title">Tu aventura</span>
          </div>
          <div class="map-path">
            <a href="/" class="map-location map-home">
              {{ t('story.breadcrumb.home') }}
            </a>
            <template v-if="sagaName">
              <div class="map-trail"></div>
              <a :href="sagaUrl" class="map-location map-saga">
                {{ sagaName }}
              </a>
            </template>
            <div class="map-trail"></div>
            <div class="map-location map-treasure">
              {{ currentPage }}
              <div class="treasure-mark">✨</div>
            </div>
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
</script>

<style scoped>
.story-path {
  background: linear-gradient(135deg, 
    var(--v-color-background-soft) 0%, 
    var(--v-color-background) 100%);
  padding: var(--v-unit-6) 0;
  margin-bottom: var(--v-unit-6);
  overflow: hidden;
}

/* Desktop: Piedras del camino */
.story-stones {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--v-unit-2);
  padding: var(--v-unit-4);
}

.stone {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  background: var(--v-color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 
              0 2px 4px rgba(0, 0, 0, 0.1);
}

.stone--home {
  background: radial-gradient(circle at 30% 30%, 
    var(--v-color-accent-primary) 0%, 
    var(--v-color-primary) 100%);
}

.stone--saga {
  background: radial-gradient(circle at 30% 30%, 
    var(--v-color-accent-primary-hover) 0%, 
    var(--v-color-accent-primary) 100%);
}

.stone--current {
  background: radial-gradient(circle at 30% 30%, 
    #ffd700 0%, 
    var(--v-color-primary) 70%);
  transform: scale(1.1);
  position: relative;
}

.current-glow {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(255, 215, 0, 0.3) 50%, 
    transparent 70%);
  animation: rotate-glow 3s linear infinite;
}

@keyframes rotate-glow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.stone-text {
  font-size: var(--v-font-size-xs);
  font-weight: 700;
  color: white;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  padding: var(--v-unit-1);
  line-height: 1.1;
}

.stone:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.path-line {
  width: 40px;
  height: 4px;
  background: linear-gradient(90deg, 
    var(--v-color-primary) 0%, 
    var(--v-color-accent-primary) 50%, 
    var(--v-color-primary) 100%);
  border-radius: 2px;
  position: relative;
}

.path-line::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -6px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid var(--v-color-primary);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

/* Mobile: Mapa del tesoro */
.treasure-map {
  display: none;
  background: linear-gradient(145deg, 
    #f4e4bc 0%, 
    #e8d5a3 100%);
  border: 3px solid #8b7355;
  border-radius: var(--v-radius-lg);
  padding: var(--v-unit-4);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.treasure-map::before {
  content: '';
  position: absolute;
  top: var(--v-unit-2);
  left: var(--v-unit-2);
  right: var(--v-unit-2);
  bottom: var(--v-unit-2);
  border: 2px dashed #8b7355;
  border-radius: var(--v-radius-md);
  opacity: 0.3;
}

.map-title {
  font-size: var(--v-font-size-lg);
  font-weight: 700;
  color: #5d4e37;
  text-align: center;
  display: block;
  margin-bottom: var(--v-unit-4);
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

.map-path {
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-3);
  align-items: flex-start;
}

.map-location {
  background: #8b7355;
  color: white;
  padding: var(--v-unit-3) var(--v-unit-4);
  border-radius: var(--v-radius-xl);
  font-size: var(--v-font-size-md);
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  position: relative;
}

.map-home {
  background: var(--v-color-primary);
  align-self: flex-start;
}

.map-saga {
  background: var(--v-color-accent-primary);
  align-self: center;
}

.map-treasure {
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  color: #5d4e37;
  align-self: flex-end;
  font-weight: 700;
}

.treasure-mark {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: var(--v-font-size-lg);
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

.map-trail {
  width: 3px;
  height: 20px;
  background: repeating-linear-gradient(
    to bottom,
    #8b7355 0px,
    #8b7355 4px,
    transparent 4px,
    transparent 8px
  );
  align-self: center;
  margin: 0 var(--v-unit-2);
}

@media (max-width: 768px) {
  .story-stones {
    display: none;
  }
  
  .treasure-map {
    display: block;
  }
}

@media (min-width: 769px) {
  .story-stones {
    display: flex;
  }
  
  .treasure-map {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .current-glow {
    animation: none;
  }
  
  .treasure-mark {
    animation: none;
  }
  
  .stone {
    transition: none;
  }
}
</style>