# Sistema de Logros - Guía de Uso

## Descripción General

Sistema genérico y reutilizable para mostrar notificaciones de logros conseguidos desde cualquier parte de la aplicación.

Características:
- ✅ Composable genérico (`useAchievementNotification`)
- ✅ Cola de notificaciones (mostrar una a la vez)
- ✅ Auto-dismiss después de 4 segundos
- ✅ Botón para navegar a página de logros
- ✅ Animaciones hermosas con confeti
- ✅ Soporte i18n (ES/EN)
- ✅ Mobile responsive

---

## Instalación

El sistema está completamente integrado. Solo necesitas:

1. **Agregar el componente** a tu layout principal o App.vue:

```vue
<template>
  <div>
    <!-- Tu contenido -->

    <!-- Componente de notificaciones de logros -->
    <AchievementUnlock />
  </div>
</template>

<script setup>
  import AchievementUnlock from '@/components/Achievement/AchievementUnlock.vue'
</script>
```

---

## Uso Básico

### Desde cualquier componente

```vue
<script setup>
  import { useAchievementNotification } from '@/composables/useAchievementNotification'

  const { showAchievement } = useAchievementNotification()

  function unlockAchievement() {
    showAchievement({
      id: 'fast-reader',
      name: 'Lector Veloz',
      description: '¡Leíste 10 historias en un día!'
    })
  }
</script>

<template>
  <button @click="unlockAchievement">Conseguir Logro</button>
</template>
```

### Desde un composable

```typescript
// src/composables/useStories.ts
import { useAchievementNotification } from './useAchievementNotification'

export function useStories() {
  const { showAchievement } = useAchievementNotification()

  function completeStory(storyId) {
    // ... lógica de completar historia

    // Mostrar logro si se cumple condición
    if (completedCount === 10) {
      showAchievement({
        id: 'ten-stories',
        name: 'Explorador de Historias',
        description: '¡Completaste 10 historias mágicas!'
      })
    }
  }

  return { completeStory }
}
```

### Desde una acción de usuario (por ejemplo, al terminar una historia)

```vue
<script setup>
  import { useAchievementNotification } from '@/composables/useAchievementNotification'
  import { useStories } from '@/composables/useStories'

  const { showAchievement } = useAchievementNotification()
  const { completeStory } = useStories()

  async function finishReading() {
    await completeStory()

    // Mostrar notificación de logro
    showAchievement({
      id: 'story-completed',
      name: 'Historia Completada',
      description: '¡Felicidades! Terminaste una historia mágica'
    })
  }
</script>
```

---

## API Completa

### `useAchievementNotification()`

Returns un objeto con:

#### **State (readonly)**

```typescript
// Notificación actualmente mostrada
currentNotification: Readonly<Ref<AchievementNotification | null>>

// Número de notificaciones en la cola
pendingCount: Readonly<Ref<AchievementNotification[]>>
```

#### **Methods**

```typescript
/**
 * Mostrar una notificación de logro
 * @param achievement - Objeto con id, name, description
 */
showAchievement(achievement: Achievement): void

/**
 * Cerrar la notificación actual
 */
closeNotification(): void

/**
 * Limpiar todas las notificaciones pendientes
 */
clearAll(): void
```

---

## Interfaz `Achievement`

```typescript
interface Achievement {
  id: string              // Identificador único del logro
  name: string            // Nombre del logro (ej: "Lector Veloz")
  description: string     // Descripción (ej: "¡Leíste 10 historias!")
  icon?: string          // [Opcional] URL de icono personalizado
}
```

---

## Ejemplos Prácticos

### 1. Logro al completar X historias

```typescript
// src/composables/useStories.ts
export function useStories() {
  const { showAchievement } = useAchievementNotification()

  const milestones = [1, 5, 10, 25, 50]

  function markAsComplete(storyId) {
    // ... completar historia
    const completedCount = getCompletedStoriesCount()

    if (milestones.includes(completedCount)) {
      const names = {
        1: 'Primer Paso',
        5: 'Novato de Historias',
        10: 'Explorador',
        25: 'Lector Ávido',
        50: 'Maestro de Cuentos'
      }

      showAchievement({
        id: `milestone-${completedCount}`,
        name: names[completedCount],
        description: `¡Leíste ${completedCount} historias!`
      })
    }
  }
}
```

### 2. Logro al guardar favoritos

```typescript
// src/components/StoryCard.vue
<script setup>
  import { useAchievementNotification } from '@/composables/useAchievementNotification'

  const { showAchievement } = useAchievementNotification()

  function toggleFavorite(story) {
    story.isFavorite = !story.isFavorite

    if (story.isFavorite) {
      showAchievement({
        id: `favorite-${story.id}`,
        name: 'Tu Primer Favorito',
        description: `¡Agregaste "${story.name}" a tus favoritos!`
      })
    }
  }
</script>
```

### 3. Logro al completar una saga

```typescript
// Desde cualquier ubicación cuando se completa una saga
function completeSaga(sagaId) {
  const { showAchievement } = useAchievementNotification()

  // ... lógica de completar saga

  showAchievement({
    id: `saga-complete-${sagaId}`,
    name: 'Saga Completada',
    description: '¡Terminaste la saga "El Viaje de Eloy"!'
  })
}
```

---

## Comportamiento de la Cola

El sistema maneja automáticamente múltiples logros:

1. Si hay una notificación activa, las nuevas se agregan a la cola
2. Se muestra una notificación a la vez
3. Cada notificación se cierra automáticamente después de 4 segundos
4. Hay un pequeño delay (300ms) entre notificaciones para mejor UX

```typescript
// Ejemplo: Mostrar 3 logros seguidos
showAchievement({ id: '1', name: 'Logro 1', description: 'Primero' })
showAchievement({ id: '2', name: 'Logro 2', description: 'Segundo' })
showAchievement({ id: '3', name: 'Logro 3', description: 'Tercero' })

// Se mostrarán uno después del otro automáticamente
```

---

## Interfaz Visual

```
┌─────────────────────────────────────┐
│  Logro Desbloqueado                 │
│  ═════════════════════════════════  │
│           [Imagen 120x120]          │
│                                     │
│     Lector Veloz                    │
│  ¡Leíste 10 historias!              │
│                                     │
│      [Ver Logro]                    │
│                                     │
│  💛💜💙💚💛💜💙💚 (confeti)           │
└─────────────────────────────────────┘
```

**Características:**
- Aparece en el centro de la pantalla
- Fondo oscuro con desenfoque (backdrop blur)
- Imagen rotando continuamente
- Confeti cayendo colorido
- Botón para navegar a logros
- Click en fondo oscuro para cerrar
- Se cierra automáticamente después de 4 segundos

---

## Troubleshooting

### La notificación no aparece

1. ✅ Verifica que `AchievementUnlock` está importado en tu layout
2. ✅ Verifica que usas `showAchievement()` correctamente
3. ✅ Abre la consola del navegador y busca errores

### Las notificaciones aparecen en orden incorrecto

El sistema automáticamente mantiene el orden de la cola. Si ves orden incorrecto:
- Verifica que estés usando el mismo composable `useAchievementNotification()`
- Asegúrate de que no estés llamando `clearAll()` accidentalmente

### Quiero cambiar el tiempo antes de cerrar

```typescript
// En el composable useAchievementNotification.ts, línea ~37
setTimeout(() => {
  closeNotification()
}, 4000) // <- Cambiar este valor (en milisegundos)
```

---

## Integración con Backend

Si tienes un backend que maneja logros:

```typescript
async function checkAndShowAchievements() {
  const { showAchievement } = useAchievementNotification()

  // Obtener logros desbloqueados del servidor
  const newAchievements = await fetchNewAchievements()

  // Mostrar cada uno
  newAchievements.forEach(achievement => {
    showAchievement({
      id: achievement.id,
      name: achievement.name,
      description: achievement.description
    })
  })
}
```

---

## Notas Técnicas

- El estado de notificaciones es **global** (compartido entre todos los componentes)
- Usa `Teleport` para renderizar fuera del flujo normal (z-index correcto)
- Usa `Transition` con nombre personalizado para animaciones
- Las notificaciones se procesan en la cola de forma síncrona
- El composable es **reutilizable** desde cualquier parte de la app

---

## Próximas Mejoras Opcionales

- [ ] Sonido al desbloquear logro
- [ ] Diferentes tipos de animaciones por categoría
- [ ] Persistencia de logros desbloqueados
- [ ] Sistema de badges/insignias
- [ ] Compartir logro en redes sociales
- [ ] Estadísticas de logros en el perfil

---

**Última actualización:** 2025-10-16
**Versión:** 1.0.0
