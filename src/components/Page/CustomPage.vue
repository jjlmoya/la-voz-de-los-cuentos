<template>
  <VContainer size="xs" class="custom-page">
    <div class="custom-page-step" v-if="currentStep === 1">
      <h2>Nombre del protagonista</h2>
      <VInput type="text" v-model="form.name" />
      <div class="custom-page-step__buttons">
        <VButton @click="nextStep" :disabled="!form.name">Siguiente</VButton>
      </div>
    </div>

    <div class="custom-page-step" v-if="currentStep === 2">
      <h2>
        ¿De qué va el cuento? <span class="custom-page-mandatory">*</span>
      </h2>
      <textarea v-model="form.story" required></textarea>
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep">Anterior</VButton>
        <VButton @click="nextStep" :disabled="!form.story">Siguiente</VButton>
      </div>
    </div>

    <div class="custom-page-step" v-if="currentStep === 3">
      <h2>¿Dónde enviarlo?</h2>
      <VInput
        type="email"
        v-model="form.email"
        placeholder="ejemplo@email.com"
      />
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep">Anterior</VButton>
        <VButton
          @click="nextStep"
          :disabled="
            !form.email ||
            form.email.indexOf('@') === -1 ||
            form.email.indexOf('.') === -1
          "
          >Siguiente</VButton
        >
      </div>
    </div>

    <div
      class="custom-page-step"
      v-if="currentStep === 4 && !loading && !successMessage && errorMessage"
    >
      <VText
        >Te enviaremos el cuento al correo electrónico, ¿Quieres suscribirte
        también a la Newsletter Mensual?</VText
      >
      <div class="custom-page-step__buttons">
        <VButton @click="submitForm">Sí</VButton>
        <VButton @click="submitFormWithoutSubscription">No</VButton>
      </div>
    </div>

    <div class="custom-page-loader" v-if="loading">
      <p>Enviando tu petición de cuento mágico...</p>
    </div>

    <div v-if="successMessage" class="custom-page-success-message">
      <p>¡Tu petición se ha enviado con éxito y nos pondremos a ello pronto!</p>
    </div>

    <div v-if="errorMessage" class="custom-page-error-message">
      <p>
        Lo sentimos, hubo un error al crear tu cuento. Por favor, intenta de
        nuevo.
      </p>
    </div>
  </VContainer>
</template>

<script setup>
  import { ref } from 'vue'
  import { VButton, VInput, VContainer } from '@overgaming/vicius'

  const currentStep = ref(1)
  const form = ref({
    name: '',
    story: '',
    email: '',
    receiveAll: true
  })
  const loading = ref(false)
  const successMessage = ref(false)
  const errorMessage = ref(false)

  const nextStep = () => {
    if (currentStep.value < 4) currentStep.value++
  }

  const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--
  }

  const submitFormWithoutSubscription = () => {
    form.value.receiveAll = false
  }
  const submitForm = async () => {
    nextStep()
    loading.value = true
    successMessage.value = false
    errorMessage.value = false

    try {
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

      if (response.ok) {
        successMessage.value = true
      } else {
        errorMessage.value = true
      }
    } catch (error) {
      errorMessage.value = true
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>
  .custom-page {
    text-align: center;
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;
    textarea {
      width: 100%;
      min-height: var(--v-input-height);
      border-radius: var(--v-input-border-radius);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: var(--v-input-background-color);
      color: var(--v-input-color);
      font-family: inherit;
      font-size: var(--v-input-font-size);
      outline: none;
      transition: border-color var(--v-duration-fast);
      padding-inline-start: var(--v-unit-4);
      padding-inline-end: var(--v-unit-4);
      height: 250px;
    }
  }

  .custom-page-step {
    text-align: center;
    width: 50vw;
    display: grid;
    grid-gap: var(--v-unit-2);
  }

  .custom-page-step__buttons {
    display: grid;
    grid-auto-flow: column;
    grid-gap: var(--v-unit-2);
  }

  .custom-page-loader {
    text-align: center;
  }

  .custom-page-mandatory {
    color: var(--v-color-error);
  }

  .custom-page-success-message,
  .custom-page-error-message {
    text-align: center;
  }
</style>
