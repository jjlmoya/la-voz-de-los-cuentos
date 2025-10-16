<template>
  <div class="achievement-example">
    <h2>Ejemplos de Logros</h2>

    <div class="achievement-example__grid">
      <!-- Ejemplo 1: Lector Veloz -->
      <button class="achievement-example__button" @click="showFastReaderAchievement">
        <span>Lector Veloz</span>
        <p>Mostrar logro</p>
      </button>

      <!-- Ejemplo 2: Explorador -->
      <button class="achievement-example__button" @click="showExplorerAchievement">
        <span>Explorador</span>
        <p>Mostrar logro</p>
      </button>

      <!-- Ejemplo 3: Favoritos -->
      <button class="achievement-example__button" @click="showFavoritesAchievement">
        <span>Tu Primer Favorito</span>
        <p>Mostrar logro</p>
      </button>

      <!-- Ejemplo 4: Múltiples logros -->
      <button class="achievement-example__button" @click="showMultipleAchievements">
        <span>Múltiples Logros</span>
        <p>Mostrar 3 logros</p>
      </button>
    </div>

    <div class="achievement-example__info">
      <p>Logros en cola: {{ pendingCount?.length || 0 }}</p>
      <p v-if="currentNotification">Mostrando: {{ currentNotification.name }}</p>
    </div>
  </div>
</template>

<script setup>
  import { useAchievementNotification } from '../../composables/useAchievementNotification'

  const { showAchievement, currentNotification, pendingCount } = useAchievementNotification()

  function showFastReaderAchievement() {
    showAchievement({
      id: 'fast-reader',
      name: 'Lector Veloz',
      description: '¡Leíste 10 historias en un día!'
    })
  }

  function showExplorerAchievement() {
    showAchievement({
      id: 'explorer',
      name: 'Explorador de Historias',
      description: '¡Completaste una saga entera!'
    })
  }

  function showFavoritesAchievement() {
    showAchievement({
      id: 'favorite',
      name: 'Tu Primer Favorito',
      description: '¡Agregaste tu primer cuento a favoritos!'
    })
  }

  function showMultipleAchievements() {
    showAchievement({
      id: 'multi-1',
      name: 'Primer Logro',
      description: 'Este es el primer logro'
    })

    setTimeout(
      () =>
        showAchievement({
          id: 'multi-2',
          name: 'Segundo Logro',
          description: 'Este es el segundo logro'
        }),
      500
    )

    setTimeout(
      () =>
        showAchievement({
          id: 'multi-3',
          name: 'Tercer Logro',
          description: 'Este es el tercer logro'
        }),
      1000
    )
  }
</script>

<style scoped>
  .achievement-example {
    padding: var(--v-unit-6);
    background: rgba(255, 193, 7, 0.1);
    border-radius: var(--v-radius-lg);
    border: 2px dashed var(--v-color-primary);
  }

  .achievement-example h2 {
    margin: 0 0 var(--v-unit-4) 0;
    color: var(--v-color-text-high);
  }

  .achievement-example__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--v-unit-4);
    margin-bottom: var(--v-unit-4);
  }

  .achievement-example__button {
    padding: var(--v-unit-4);
    background: linear-gradient(135deg, var(--v-color-accent-primary), var(--v-color-accent-primary-hover));
    border: 2px solid var(--v-color-primary);
    border-radius: var(--v-radius-lg);
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--v-unit-2);
  }

  .achievement-example__button:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .achievement-example__button span {
    font-size: var(--v-font-size-md);
  }

  .achievement-example__button p {
    margin: 0;
    font-size: var(--v-font-size-sm);
    opacity: 0.9;
  }

  .achievement-example__info {
    padding: var(--v-unit-3);
    background: rgba(0, 0, 0, 0.05);
    border-radius: var(--v-radius-md);
    font-size: var(--v-font-size-sm);
    color: var(--v-color-text-medium);
  }

  .achievement-example__info p {
    margin: 0;
    padding: var(--v-unit-1) 0;
  }
</style>
