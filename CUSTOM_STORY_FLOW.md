# Mejora del Flujo de Cuentos Personalizados

## 📋 Descripción General

Este documento detalla las mejoras implementadas en el proceso de creación de cuentos personalizados (custom stories). El nuevo flujo introduce validación de compartir, guardado automático, y una experiencia visual mejorada con ilustraciones.

## 🎯 Cambios Principales

### 1. Nuevo Flujo de Pasos

El proceso ahora tiene **6 pasos principales**:

```
0. Bienvenida (Welcome)
   ↓
1. Nombre del Protagonista (StepName)
   ↓
2. Detalles del Cuento (StepStory)
   ↓
3. Email (StepEmail)
   ↓
4. Newsletter (StepNewsletter)
   ↓
5. Validación de Compartir (ShareGate) ← NUEVO
   ↓
6. Confirmación (Success)
```

### 2. Sistema de Compartir como Requisito

**Concepto**: El usuario debe compartir contenido antes de crear un cuento personalizado.

**Implementación**:
- LocalStorage key: `customStory:hasShared` (boolean)
- El estado se resetea después de cada envío exitoso
- Opciones de compartir:
  1. Compartir la página principal directamente
  2. Navegar a un cuento/canción y compartir desde allí

**Archivos relacionados**:
- `src/utils/shareTracking.js` - Funciones de tracking
- `src/composables/useShareTracking.js` - Composable Vue
- `src/components/Custom/CustomShareGate.vue` - Componente de barrera

### 3. Sistema de Guardado Automático (Draft)

**Concepto**: El formulario se guarda automáticamente cada vez que el usuario escribe.

**Características**:
- Auto-save debounced cada 1 segundo
- Recuperación automática al cargar la página
- Indicador visual "Guardando..."
- Banner de bienvenida si hay draft guardado
- Expiración de draft después de 30 días
- Limpieza al enviar con éxito

**LocalStorage keys**:
```javascript
{
  'customStory:draft': {
    name: string,
    story: string,
    email: string,
    receiveAll: boolean,
    currentStep: number,
    lastModified: ISO timestamp
  }
}
```

**Archivos relacionados**:
- `src/utils/draftManager.js` - Gestión de borradores
- `src/composables/useCustomDraft.js` - Composable Vue
- `src/components/Custom/CustomDraftBanner.vue` - Banner de bienvenida
- `src/components/Custom/CustomSavingIndicator.vue` - Indicador

### 4. Mejoras Visuales y de UX

#### Componentes Nuevos:
- **CustomProgressBar.vue** - Barra de progreso visual
- **CustomWelcome.vue** - Pantalla de bienvenida con 3 pasos
- **CustomStepName.vue** - Selector de nombre mejorado
- **CustomStepStory.vue** - Editor de cuento con temas sugeridos
- **CustomStepEmail.vue** - Input de email mejorado
- **CustomStepNewsletter.vue** - Selector de newsletter
- **CustomShareGate.vue** - Barrera de compartir
- **CustomSavingIndicator.vue** - Indicador de guardado
- **CustomDraftBanner.vue** - Banner de draft guardado

#### Animaciones:
- Transiciones suaves entre pasos (300-400ms)
- Character comes alive al escribir nombre
- Confetti al completar con éxito
- Sparkles en inputs activos
- Bounce animations en iconos

#### Responsive:
- Diseño mobile-first
- Grid responsivas
- Imágenes lazy loading
- Botones optimizados para touch

### 5. Optimización de Imágenes

**Estrategia**:
- WebP como formato principal
- Fallback a JPG para navegadores antiguos
- Lazy loading en todas las ilustraciones
- Responsive srcset (600px, 900px, 1200px)
- Preload solo de imagen hero

**Archivos relacionados**:
- `src/utils/imageOptimization.js` - Helpers para imágenes

## 📁 Estructura de Archivos

```
src/
├── components/Custom/
│   ├── CustomProgressBar.vue
│   ├── CustomWelcome.vue
│   ├── CustomStepName.vue
│   ├── CustomStepStory.vue
│   ├── CustomStepEmail.vue
│   ├── CustomStepNewsletter.vue
│   ├── CustomShareGate.vue
│   ├── CustomSavingIndicator.vue
│   ├── CustomDraftBanner.vue
│   └── CustomThemeSuggestions.vue
├── composables/
│   ├── useCustomDraft.js
│   ├── useShareTracking.js
│   └── useCustomValidation.js
├── utils/
│   ├── draftManager.js
│   ├── shareTracking.js
│   └── imageOptimization.js
└── pages/
    └── [custom]/[story].astro (sin cambios)

public/assets/custom/
├── welcome-hero-600.webp
├── welcome-hero-900.webp
├── welcome-hero-1200.webp
├── character-waiting-600.webp
├── character-waiting-900.webp
├── character-waiting-1200.webp
├── character-alive-600.webp
├── character-alive-900.webp
├── character-alive-1200.webp
├── magic-book-writing-600.webp
├── magic-book-writing-900.webp
├── magic-book-writing-1200.webp
└── ... (10 ilustraciones en total, 3 tamaños cada una)
```

## 🔧 Cambios Técnicos

### CustomPage.vue (Principal)

```vue
<template>
  <VContainer size="xs" class="custom-page">
    <!-- Banner de Draft -->
    <CustomDraftBanner
      v-if="currentStep === 0"
      :has-draft="hasDraft"
      :draft-info="draftInfo"
      @load="loadDraft"
      @discard="discardDraft"
    />

    <!-- Indicador de Guardando -->
    <CustomSavingIndicator :is-saving="isSaving" />

    <!-- Barra de Progreso -->
    <CustomProgressBar :current-step="currentStep" />

    <!-- Paso 0: Bienvenida -->
    <CustomWelcome v-if="currentStep === 0" @start="nextStep" />

    <!-- Paso 1: Nombre -->
    <CustomStepName
      v-if="currentStep === 1"
      v-model="form.name"
    />

    <!-- Paso 2: Cuento -->
    <CustomStepStory
      v-if="currentStep === 2"
      v-model="form.story"
    />

    <!-- ... otros pasos ...-->

    <!-- Paso 5: Validación de Compartir -->
    <CustomShareGate
      v-if="currentStep === 5"
      :has-shared="canProceedWithShare"
      @share-success="onShareSuccess"
      @proceed="nextStep"
    />

    <!-- Paso final: Éxito -->
    <CustomSuccess
      v-if="currentStep === 6"
    />
  </VContainer>
</template>
```

### Flujo de Compartir

```javascript
// useShareTracking.js
const shareTracking = useShareTracking()

// En CustomShareGate:
const onShareSuccess = () => {
  shareTracking.onShareSuccess() // Marca hasShared = true
  showSuccess.value = true
}

// Al enviar el formulario:
const submitForm = async () => {
  try {
    // ... envío ...
    clearDraft() // Limpia borrador
    shareTracking.resetShare() // Resetea hasShared = false
    showSuccess.value = true
  }
}
```

### Flujo de Auto-Save

```javascript
// useCustomDraft.js
const draft = useCustomDraft(form)

// Auto-save automático en cambios
watch(
  () => form.value,
  () => draft.autoSave(),
  { deep: true }
)

// Al cargar
onMounted(() => {
  draft.checkForDraft()
  if (draft.hasSavedDraft.value) {
    draft.loadDraft()
  }
})
```

## 📝 Traducciones Nuevas

Se deben añadir las siguientes claves de traducción:

```javascript
// page.custom.* keys
'page.custom.welcome.start': 'Comenzar',
'page.custom.welcome.step1.title': 'Dale un nombre',
'page.custom.welcome.step1.description': 'Elige el nombre del protagonista',
'page.custom.step.name.subtitle': 'Este será el nombre del protagonista',
'page.custom.step.name.placeholder': 'ej: Lucas, Elena, Milo...',
'page.custom.step.name.suggestions': 'Nombres populares:',
'page.custom.step.name.preview': 'Así aparecerá el nombre:',
'page.custom.step.story.subtitle': 'Describe qué tipo de cuento quieres',
'page.custom.step.story.placeholder': 'ej: Un cuento de aventura...',
'page.custom.step.story.themes': 'Temas populares:',
'page.custom.step.story.info': 'Tu descripción será utilizada para crear una historia única',
'page.custom.theme.adventure': 'Aventura',
'page.custom.theme.fantasy': 'Fantasía',
// ... más temas ...
'page.custom.draft.saved': 'Tienes un borrador guardado',
'page.custom.draft.continue': 'Continuar',
'page.custom.draft.discard': 'Descartar',
'page.custom.saving': 'Guardando...',
'page.custom.sharegate.title': 'Uno más para desbloquear',
'page.custom.sharegate.description': 'Ayúdanos a compartir la magia...',
// ... más keys ...
```

## 🎨 Ilustraciones Necesarias

Ver [CUSTOM_STORY_ILLUSTRATIONS.md](./CUSTOM_STORY_ILLUSTRATIONS.md)

10 ilustraciones principales, cada una en 3 tamaños (600px, 900px, 1200px):

1. `welcome-hero` - Hero principal
2. `character-waiting` - Personaje esperando
3. `character-alive` - Personaje cobrand vida
4. `magic-book-writing` - Libro mágico
5. `owl-messenger` - Búho mensajero
6. `treasure-newsletter` - Cofre del tesoro
7. `share-magic` - Magia de compartir
8. `share-success` - Éxito al compartir
9. `magic-in-progress` - Procesando
10. `success-celebration` - Celebración

## 🧪 Testing

### LocalStorage Testing
```javascript
// Ver estado actual
console.log(localStorage.getItem('customStory:hasShared'))
console.log(localStorage.getItem('customStory:draft'))

// Limpiar para testing
localStorage.removeItem('customStory:hasShared')
localStorage.removeItem('customStory:draft')
```

### Share Tracking Testing
```javascript
import { markAsShared, hasUserShared, resetShareState } from '@/utils/shareTracking'

markAsShared() // Simular share
console.log(hasUserShared()) // true

resetShareState() // Resetear
console.log(hasUserShared()) // false
```

## 📊 Analytics

Se recomienda añadir eventos de Google Analytics para:
- Inicio del formulario
- Cada paso completado
- Abandonos por paso
- Shares realizados
- Envío exitoso
- Uso de draft guardado

## 🐛 Conocidos Issues

- Las ilustraciones están como placeholders (WebP vacías)
- Algunos textos en traducción están como fallbacks en inglés
- CSS Grid puede no ser compatible con IE11 (no soportado)

## 🚀 Mejoras Futuras

- [ ] Modo preview de cuentos personalizados anteriores
- [ ] Sistema de prioridad por shares
- [ ] Integración con API para envío a Google Sheets
- [ ] Email de confirmación mejorado
- [ ] Estimación de tiempo basada en colas
- [ ] FAQ colapsable
- [ ] Testimonios de usuarios
- [ ] Contador de cuentos creados

## 📞 Soporte

Para preguntas sobre la implementación, ver los archivos de utilidades y composables.
