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
  }

  .custom-page-mandatory {
    color: var(--v-color-error);
  }

  .custom-page-success-message,
  .custom-page-error-message {
    text-align: center;
  }
</style>
