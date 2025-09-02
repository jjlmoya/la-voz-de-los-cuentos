<template>
  <VContainer size="xs" class="custom-page">
    <div class="custom-page-step" v-if="currentStep === 1">
      <h2>{{ t('page.custom.input.name') }}</h2>
      <VInput
        :aria-label="`Input ${t('page.custom.input.name')}`"
        type="text"
        v-model="form.name"
      />
      <div class="custom-page-step__buttons">
        <VButton @click="nextStep" :disabled="!form.name">{{
          t('page.custom.button.next')
        }}</VButton>
      </div>
    </div>

    <div class="custom-page-step" v-if="currentStep === 2">
      <h2>
        {{ t('page.custom.input.story') }}
        <span class="custom-page-mandatory">*</span>
      </h2>
      <textarea
        aria-label="Area de texto para describir el cuento"
        v-model="form.story"
        required
      ></textarea>
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep">{{ t('page.custom.button.prev') }}</VButton>
        <VButton @click="nextStep" :disabled="!form.story">{{
          t('page.custom.button.next')
        }}</VButton>
      </div>
    </div>

    <div class="custom-page-step" v-if="currentStep === 3">
      <h2>{{ t('page.custom.input.email') }}</h2>
      <VInput
        aria-label="Email"
        type="email"
        v-model="form.email"
        placeholder="abc@email.com"
      />
      <div class="custom-page-step__buttons">
        <VButton @click="prevStep">{{ t('page.custom.button.prev') }}</VButton>
        <VButton
          @click="nextStep"
          :disabled="
            !form.email ||
            form.email.indexOf('@') === -1 ||
            form.email.indexOf('.') === -1
          "
          >{{ t('page.custom.button.next') }}</VButton
        >
      </div>
    </div>

    <div
      class="custom-page-step"
      v-if="currentStep === 4 && !loading && !successMessage"
    >
      <VText>{{ t('page.custom.input.newsletter') }}</VText>
      <div class="custom-page-step__buttons">
        <VButton @click="submitForm">{{
          t('page.custom.button.accept')
        }}</VButton>
        <VButton @click="submitFormWithoutSubscription">{{
          t('page.custom.button.decline')
        }}</VButton>
      </div>
    </div>

    <div class="custom-page-loader" v-if="loading">
      <div class="magic-spinner">
        <div class="magic-spinner__wand"></div>
      </div>
      <VText>{{ t('page.custom.button.loading') }}</VText>
    </div>

    <div v-if="successMessage" class="custom-page-success-message">
      <VText>{{ t('page.custom.button.success') }}</VText>
    </div>

    <div v-if="errorMessage" class="custom-page-error-message">
      <VText>{{ t('page.custom.button.error') }}</VText>
    </div>
  </VContainer>
</template>

<script setup>
  import t from '../../translations'
  import { ref } from 'vue'
  import { VButton, VInput, VContainer, VText } from '@overgaming/vicius'
  const newsletterEndpoint = import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT
  const lang = import.meta.env.PUBLIC_LANG

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
    submitForm()
  }

  async function addNewsletter() {
    if (!form.value.receiveAll) return
    await fetch(newsletterEndpoint, {
      method: 'POST',
      body: JSON.stringify({ email: form.value.email, lang, story: true }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })
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
      addNewsletter()
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
    padding: var(--v-unit-8);
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
    padding: var(--v-unit-8);
  }

  .magic-spinner {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-bottom: var(--v-unit-4);
  }

  .magic-spinner__star {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    animation: star-pulse 1.5s infinite ease-in-out;
  }

  .magic-spinner__wand {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 40px;
    background: linear-gradient(45deg, 
      var(--v-color-primary) 0%, 
      var(--v-color-accent-primary) 50%, 
      hsl(45, 100%, 70%) 100%);
    border-radius: 2px;
    transform-origin: center bottom;
    transform: translate(-50%, -50%) rotate(0deg);
    animation: wand-spin 2s infinite linear;
    box-shadow: 0 0 10px hsla(var(--v-color-primary-hsl), 0.5);
  }

  .magic-spinner__sparkles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .sparkle {
    position: absolute;
    font-size: 1.2rem;
    animation: sparkle-float 2s infinite ease-in-out;
  }

  .sparkle-1 {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .sparkle-2 {
    top: 20%;
    right: 15%;
    animation-delay: 0.7s;
  }

  .sparkle-3 {
    bottom: 15%;
    left: 15%;
    animation-delay: 1.4s;
  }

  @keyframes star-pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      filter: brightness(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      filter: brightness(1.3);
    }
  }

  @keyframes wand-spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes sparkle-float {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.8);
    }
    50% {
      opacity: 1;
      transform: translateY(-10px) scale(1.1);
    }
    100% {
      opacity: 0;
      transform: translateY(-30px) scale(0.6);
    }
  }

  .custom-page-mandatory {
    color: var(--v-color-error);
  }

  .custom-page-success-message,
  .custom-page-error-message {
    text-align: center;
  }
</style>
