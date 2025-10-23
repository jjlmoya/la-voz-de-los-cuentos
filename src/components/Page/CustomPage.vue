<template>
  <VContainer size="xs" class="custom-page">
    <!-- Draft Banner (Paso 0) -->
    <CustomDraftBanner
      v-if="currentStep === 0 && draft.hasSavedDraft.value"
      :has-draft="draft.hasSavedDraft.value"
      :draft-info="draft.getInfo()"
      @load="handleLoadDraft"
      @discard="handleDiscardDraft"
      @close="() => {}"
    />

    <!-- Indicador de Guardando -->
    <CustomSavingIndicator :is-saving="draft.isSaving.value" />

    <!-- Barra de Progreso -->
    <CustomProgressBar :current-step="currentStep" :steps="progressSteps" />

    <!-- PASO 0: Bienvenida -->
    <CustomWelcome v-if="currentStep === 0" @start="nextStep" />

    <!-- PASO 1: Nombre -->
    <div v-if="currentStep === 1" class="custom-page-step">
      <CustomStepName v-model="form.name" />
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep" variant="secondary">{{ t('page.custom.button.prev') }}</VButton>
        <VButton @click="nextStep" :disabled="!form.name">{{
          t('page.custom.button.next')
        }}</VButton>
      </div>
    </div>

    <!-- PASO 2: Cuento -->
    <div v-if="currentStep === 2" class="custom-page-step">
      <CustomStepStory v-model="form.story" />
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep" variant="secondary">{{ t('page.custom.button.prev') }}</VButton>
        <VButton @click="nextStep" :disabled="!form.story">{{
          t('page.custom.button.next')
        }}</VButton>
      </div>
    </div>

    <!-- PASO 3: Email -->
    <div v-if="currentStep === 3" class="custom-page-step">
      <CustomStepEmail v-model="form.email" />
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep" variant="secondary">{{ t('page.custom.button.prev') }}</VButton>
        <VButton
          @click="nextStep"
          :disabled="!isValidEmail(form.email)"
        >
          {{ t('page.custom.button.next') }}
        </VButton>
      </div>
    </div>

    <!-- PASO 4: Newsletter -->
    <div v-if="currentStep === 4" class="custom-page-step">
      <CustomStepNewsletter v-model="form.receiveAll" />
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep" variant="secondary">{{ t('page.custom.button.prev') }}</VButton>
        <VButton @click="nextStep">{{ t('page.custom.button.next') }}</VButton>
      </div>
    </div>

    <!-- PASO 5: Validación de Compartir -->
    <div v-if="currentStep === 5" class="custom-page-step">
      <CustomShareGate
        :has-shared="shareTracking.canProceed.value"
        :share-count="shareTracking.shareInfo.value.sharesCount"
        :main-page-url="mainPageUrl"
        @share-success="handleShareSuccess"
        @proceed="submitForm"
      />
    </div>

    <!-- PASO 6: Éxito / Cargando -->
    <div v-if="currentStep === 6" class="custom-page-step">
      <CustomSuccess v-if="!loading && successMessage" />

      <div v-if="loading" class="custom-page-loader">
        <div class="magic-spinner">
          <div class="magic-spinner__wand"></div>
        </div>
        <VText>{{ t('page.custom.button.loading') }}</VText>
      </div>

      <div v-if="errorMessage && !loading" class="custom-page-error-message">
        <VText>{{ t('page.custom.button.error') }}</VText>
        <VButton @click="prevStep" style="margin-top: var(--v-unit-4)">
          {{ t('page.custom.button.prev') }}
        </VButton>
      </div>
    </div>
  </VContainer>
</template>

<script setup>
  import t from '../../translations'
  import { ref, onMounted } from 'vue'
  import { VButton, VContainer, VText } from '@overgaming/vicius'

  // Importar componentes nuevos
  import CustomWelcome from '../Custom/CustomWelcome.vue'
  import CustomProgressBar from '../Custom/CustomProgressBar.vue'
  import CustomStepName from '../Custom/CustomStepName.vue'
  import CustomStepStory from '../Custom/CustomStepStory.vue'
  import CustomStepEmail from '../Custom/CustomStepEmail.vue'
  import CustomStepNewsletter from '../Custom/CustomStepNewsletter.vue'
  import CustomShareGate from '../Custom/CustomShareGate.vue'
  import CustomSuccess from '../Custom/CustomSuccess.vue'
  import CustomDraftBanner from '../Custom/CustomDraftBanner.vue'
  import CustomSavingIndicator from '../Custom/CustomSavingIndicator.vue'

  // Importar composables
  import useCustomDraft from '../../composables/useCustomDraft.js'
  import useShareTracking from '../../composables/useShareTracking.js'

  const newsletterEndpoint = import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT
  const lang = import.meta.env.PUBLIC_LANG
  const mainPageUrl = '/'

  // State
  const currentStep = ref(0) // Comienza en 0 (bienvenida)
  const form = ref({
    name: '',
    story: '',
    email: '',
    receiveAll: true,
    currentStep: 0
  })
  const loading = ref(false)
  const successMessage = ref(false)
  const errorMessage = ref(false)

  // Composables
  const draft = useCustomDraft(form)
  const shareTracking = useShareTracking()

  // Progress steps
  const progressSteps = [
    { icon: '👋', label: 'Bienvenida' },
    { icon: '✏️', label: 'Nombre' },
    { icon: '📖', label: 'Cuento' },
    { icon: '✉️', label: 'Email' },
    { icon: '🎁', label: 'Newsletter' },
    { icon: '🔄', label: 'Compartir' },
    { icon: '🎉', label: 'Éxito' }
  ]

  /**
   * Validar email
   */
  const isValidEmail = (email) => {
    if (!email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Siguiente paso
   */
  const nextStep = () => {
    if (currentStep.value < 6) {
      currentStep.value++
      form.value.currentStep = currentStep.value
      draft.autoSave()
    }
  }

  /**
   * Paso anterior
   */
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
      form.value.currentStep = currentStep.value
      draft.autoSave()
    }
  }

  /**
   * Manejar éxito al compartir
   */
  const handleShareSuccess = () => {
    shareTracking.onShareSuccess()
  }

  /**
   * Cargar draft guardado
   */
  const handleLoadDraft = () => {
    draft.loadDraft()
    currentStep.value = form.value.currentStep || 1
  }

  /**
   * Descartar draft
   */
  const handleDiscardDraft = () => {
    draft.discardDraft()
    currentStep.value = 1
  }

  /**
   * Enviar formulario
   */
  const submitForm = async () => {
    nextStep() // Ir a paso 6
    loading.value = true
    successMessage.value = false
    errorMessage.value = false

    try {
      // Enviar a Google Sheets
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyXxWrBmQDXCDIg5v-bc4YnkDU5YHu43a8HeGVNdoknYDK50bBnLg9gcAbP4Myw14lr/exec',
        {
          method: 'POST',
          body: JSON.stringify(form.value),
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
        }
      )

      // Agregar a newsletter si lo desea
      if (form.value.receiveAll) {
        try {
          await fetch(newsletterEndpoint, {
            method: 'POST',
            body: JSON.stringify({ email: form.value.email, lang, story: true }),
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            }
          })
        } catch (e) {
          console.error('Newsletter error:', e)
        }
      }

      if (response.ok) {
        // Éxito
        successMessage.value = true
        draft.removeDraft() // Limpiar draft
        shareTracking.resetShare() // Resetear share para próximo cuento
      } else {
        errorMessage.value = true
      }
    } catch (error) {
      console.error('Form submission error:', error)
      errorMessage.value = true
    } finally {
      loading.value = false
    }
  }

  // Setup
  onMounted(() => {
    // Verificar si hay un draft guardado
    if (draft.hasSavedDraft.value) {
      // Mostrar banner (el componente ya lo muestra)
    }
  })
</script>

<style scoped>
  .custom-page {
    padding: var(--v-unit-6) var(--v-unit-4);
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-4);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .custom-page-step {
    display: grid;
    gap: var(--v-unit-6);
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .custom-page-step__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--v-unit-3);
    justify-content: center;
    margin-top: var(--v-unit-4);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .custom-page__submit-button {
    min-width: 200px;
  }

  .custom-page-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    padding: var(--v-unit-8);
    text-align: center;
  }

  .magic-spinner {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-bottom: var(--v-unit-4);
  }

  .magic-spinner__wand {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 40px;
    background: linear-gradient(
      45deg,
      var(--v-color-primary) 0%,
      var(--v-color-accent-primary) 50%,
      hsl(45, 100%, 70%) 100%
    );
    border-radius: 2px;
    transform-origin: center bottom;
    transform: translate(-50%, -50%) rotate(0deg);
    animation: wand-spin 2s infinite linear;
    box-shadow: 0 0 10px hsla(var(--v-color-primary-hsl), 0.5);
  }

  @keyframes wand-spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .custom-page-error-message {
    padding: var(--v-unit-4);
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--v-radius-lg);
    text-align: center;
    color: #ef4444;
  }

  @media (max-width: 768px) {
    .custom-page {
      padding: var(--v-unit-4) var(--v-unit-2);
      gap: var(--v-unit-3);
    }

    .custom-page-step {
      gap: var(--v-unit-4);
    }

    .custom-page-step__buttons {
      grid-auto-flow: row;
    }
  }
</style>
