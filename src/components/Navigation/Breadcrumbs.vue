<template>
  <div class="adventure-map">
    <VContainer size="xl">
      <div class="map-container">
        <svg viewBox="0 0 800 200" class="path-svg">
          <!-- Líneas de conexión -->
          <path 
            d="M 100 100 L 200 100" 
            class="connection-line"
            :class="{ 'active': isPathActive(['sagas', 'personajes']) }"
          />
          
          <!-- Línea hacia sagas -->
          <path 
            v-if="sagaName || currentSection === 'sagas'"
            d="M 200 100 L 300 100" 
            class="connection-line"
            :class="{ 'active': isPathActive(['sagas']) }"
          />
          
          <!-- Línea hacia historia específica -->
          <path 
            v-if="sagaName && currentPage !== sagaName"
            d="M 300 100 L 400 100" 
            class="connection-line"
            :class="{ 'active': isPathActive(['story']) }"
          />
          
          <!-- Ramas hacia personajes -->
          <path 
            d="M 200 100 L 250 60" 
            class="connection-line branch"
            :class="{ 'active': currentSection === 'personajes' }"
          />
        </svg>
        
        <div class="nodes-container">
          <!-- Nodo Inicio -->
          <div class="map-node home-node" :class="{ 'current': currentSection === 'home', 'visited': true }">
            <a href="/" class="node-link">
              <div class="node-icon">🏠</div>
              <span class="node-label">{{ t('story.breadcrumb.home') }}</span>
            </a>
          </div>
          
          <!-- Nodo Hub (Sagas/Personajes) -->
          <div class="map-node hub-node">
            <div class="hub-branches">
              <!-- Rama Sagas -->
              <div class="map-node saga-hub" :class="{ 
                'current': currentSection === 'sagas' && !sagaName, 
                'visited': sagaName || currentSection === 'sagas' 
              }">
                <a href="/sagas" class="node-link">
                  <div class="node-icon">📚</div>
                  <span class="node-label">Sagas</span>
                </a>
              </div>
              
              <!-- Rama Personajes -->
              <div class="map-node character-hub" :class="{ 
                'current': currentSection === 'personajes', 
                'visited': currentSection === 'personajes' 
              }">
                <a href="/personajes" class="node-link">
                  <div class="node-icon">🎭</div>
                  <span class="node-label">Personajes</span>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Nodo Saga específica -->
          <div v-if="sagaName" class="map-node saga-node" :class="{ 
            'current': currentPage === sagaName, 
            'visited': true 
          }">
            <a :href="sagaUrl" class="node-link">
              <div class="node-icon">📖</div>
              <span class="node-label">{{ sagaName }}</span>
            </a>
          </div>
          
          <!-- Nodo Historia actual -->
          <div v-if="sagaName && currentPage !== sagaName" class="map-node story-node current pulsing">
            <div class="node-link">
              <div class="node-icon">✨</div>
              <span class="node-label">{{ currentPage }}</span>
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

// Detectar sección actual basada en la URL
const currentSection = computed(() => {
  // SSR-safe: usar props para determinar la sección actual
  if (props.sagaName && props.currentPage !== props.sagaName) return 'story'
  if (props.sagaName) return 'sagas'
  
  // En cliente, usar window.location como fallback
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path === '/') return 'home'
    if (path.includes('/sagas')) return 'sagas'  
    if (path.includes('/personajes')) return 'personajes'
    return 'other'
  }
  
  // Default para SSR
  return 'other'
})

// Función para determinar si un camino está activo
const isPathActive = (sections) => {
  return sections.includes(currentSection.value) || 
         (sections.includes('story') && props.sagaName && props.currentPage !== props.sagaName)
}
</script>

<style scoped>
.adventure-map {
  background: linear-gradient(135deg, 
    var(--v-color-background-soft) 0%, 
    var(--v-color-background) 100%);
  padding: var(--v-unit-6) 0;
  margin-bottom: var(--v-unit-6);
  overflow-x: auto;
  min-height: 120px;
}

.map-container {
  position: relative;
  min-width: 600px;
  height: 200px;
}

/* SVG Lines */
.path-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.connection-line {
  stroke: var(--v-color-text-low);
  stroke-width: 3;
  fill: none;
  opacity: 0.3;
  transition: all 0.6s ease;
  stroke-dasharray: 8 4;
}

.connection-line.active {
  stroke: #ffd700;
  opacity: 1;
  stroke-dasharray: none;
  animation: path-flow 2s ease-in-out;
  filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.5));
}

.connection-line.branch {
  stroke-dasharray: 4 4;
}

@keyframes path-flow {
  0% { stroke-dasharray: 20 10; stroke-dashoffset: 30; }
  100% { stroke-dasharray: none; stroke-dashoffset: 0; }
}

/* Nodes Container */
.nodes-container {
  position: relative;
  z-index: 2;
  height: 100%;
}

.map-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease;
}

/* Node Positions */
.home-node {
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
}

.hub-node {
  left: 180px;
  top: 50%;
  transform: translateY(-50%);
}

.saga-hub {
  position: relative;
}

.character-hub {
  position: absolute;
  top: -60px;
  left: 30px;
}

.saga-node {
  left: 280px;
  top: 50%;
  transform: translateY(-50%);
}

.story-node {
  left: 380px;
  top: 50%;
  transform: translateY(-50%);
}

/* Node Styling */
.node-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.node-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--v-font-size-xl);
  background: var(--v-color-background);
  border: 3px solid var(--v-color-text-low);
  margin-bottom: var(--v-unit-2);
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.node-label {
  font-size: var(--v-font-size-sm);
  font-weight: 600;
  color: var(--v-color-text-medium);
  text-align: center;
  max-width: 80px;
  line-height: 1.2;
  transition: all 0.3s ease;
}

/* Node States */
.map-node.visited .node-icon {
  border-color: var(--v-color-primary);
  background: linear-gradient(135deg, 
    var(--v-color-primary) 0%, 
    var(--v-color-accent-primary) 100%);
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.map-node.visited .node-label {
  color: var(--v-color-text-high);
  font-weight: 700;
}

.map-node.current .node-icon {
  border-color: #ffd700;
  background: radial-gradient(circle at 30% 30%, 
    #ffeb3b 0%, 
    #ffd700 100%);
  color: #5d4e37;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6),
              0 6px 12px rgba(0, 0, 0, 0.2);
}

.map-node.current .node-label {
  color: var(--v-color-text-high);
  font-weight: 800;
}

.map-node.pulsing .node-icon {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6),
                0 6px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.9),
                0 8px 16px rgba(0, 0, 0, 0.3);
    transform: scale(1.15);
  }
}

/* Hover Effects */
.map-node .node-link:hover .node-icon {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
}

.map-node.current .node-link:hover .node-icon {
  transform: translateY(-2px) scale(1.2);
}

/* Hub Branches */
.hub-branches {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .map-container {
    min-width: 480px;
    transform: scale(0.8);
    transform-origin: left center;
  }
  
  .node-icon {
    width: 50px;
    height: 50px;
    font-size: var(--v-font-size-lg);
  }
  
  .node-label {
    font-size: var(--v-font-size-xs);
    max-width: 60px;
  }
  
  .character-hub {
    top: -50px;
    left: 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .connection-line.active {
    animation: none;
  }
  
  .map-node.pulsing .node-icon {
    animation: none;
  }
  
  .map-node, .node-link, .node-icon {
    transition: none;
  }
}
</style>