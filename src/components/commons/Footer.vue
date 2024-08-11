<template>
    <div class="footer">
        <div class="footer-header">
            <VText class="footer-title" variant="header" as="h3">La Voz De Los Cuentos</VText>
        </div>
        <VDivider class="footer-divider">NewsLetter Mensual</VDivider>
        <VContainer size="xs" class="footer-newsletter">
            <div class="footer-newsletter__content">
                  <VField>
                    <VInput 
                        v-if="!successMessage"
                        type="email" 
                        v-model="email"
                        :invalid="emailError"
                        @input="validateEmail" 
                    />
                    <template #label v-if="!successMessage">
                        <VFieldLabel>Email:</VFieldLabel>
                    </template>
                    <template #message>
                        <VText v-if="successMessage">¡Gracias por la suscripción!</VText>
                        <VText v-if="emailError">Correo no válido</VText>
                    </template>
                    <VButton 
                        v-if="!successMessage"
                        color="primary" 
                        :disabled="!isEmailValid || isSubmitting" 
                        @click="submitForm"
                    >
                        Suscribirse
                    </VButton>
                </VField>
            </div>
        </VContainer>
         <VDivider class="footer-divider">Enlaces de Interés</VDivider>
        <div class="footer-wrapper">
            <div class="footer-links">
                  <VDivider>Sagas</VDivider>
            </div>
            <div class="footer-links">
                 <VDivider>Nuestra Comunidades</VDivider>
            </div>
            <div class="footer-links">
               <VDivider>Interés</VDivider>
            </div>
        </div>
        <div class="footer-wrapper">
            <div class="footer-links">
                <VLink href="/saga/la-vida-de-eloy/">La Vida de Eloy</VLink>
                <VLink href="/saga/sdg/">Sistema de Distribución de Gatos</VLink>
                <VLink href="/saga/luna-y-la-fisica/">Luna y la ciencia</VLink>
                <VLink href="/saga/llamarada/">Llamarada en Imaginaria</VLink>
            </div>
            <div class="footer-links">
                <div class="footer-links__element">
                    <VLink href="https://www.youtube.com/@LaVozDeLosCuentos">Youtube</VLink>
                </div>
                <div class="footer-links__element">
                    <VLink href="https://open.spotify.com/show/2fmWlaQNGSEcE7IX5Ir06z">Spotify</VLink>
                </div>
                <div class="footer-links__element">
                    <VLink href="https://www.tiktok.com/@lavozdetuscuentos">TikTok</VLink>
                </div>
                <div class="footer-links__element">
                    <VLink href="https://www.instagram.com/lavozdetuscuentos/">Instagram</VLink>
                </div>  
                <div class="footer-links__element">
                    <VLink href="https://www.facebook.com/AudioCuentosParaTodos">Facebook</VLink>
                </div> 
            </div>
            <div class="footer-links">
               <VLink href="/personalizado/cuento/">Cuento Personalizado</VLink>
               <!--<VLink href="/contacto/">Contactar</VLink>-->
               <VLink href="/newsletters/">Pasadas NewsLetters</VLink>
               <!--<VLink href="/legal/cookies/">Política de Cookies</VLink>-->
               <!--<VLink href="/legal/privacidad/">Política de Privacidad</VLink>-->
            </div>
        </div>
                      
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { VText, VLink, VDivider, VInput, VContainer, VFieldLabel, VFieldHelp, VField, VButton } from '@overgaming/vicius'

const email = ref('');
const emailError = ref(false);
const successMessage = ref(false);
const isEmailValid = ref(false);
const isSubmitting = ref(false);

function validateEmail() {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = re.test(String(email.value).toLowerCase());
  emailError.value = !isEmailValid.value;
}

async function submitForm() {
  if (!isEmailValid.value) return;
  
  isSubmitting.value = true;
  emailError.value = false;
  successMessage.value = false;
  
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxzhVGv1wPrLwYU9Inq0Pbx9Bm76LBl8RX9oyWSdaEcaCWyschEyNgJbMNS8XUYj7Pi/exec', {
      method: 'POST',
      body: JSON.stringify({ email: email.value }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    const result = await response.json();
    if (result.result === 'success') {
      successMessage.value = true;
      email.value = '';
    } else {
      emailError.value = true;
    }
  } catch (error) {
    console.error('Error:', error);
    emailError.value = true;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.footer {
    margin-top: var(--v-unit-12);
    padding: var(--v-unit-8);
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-4) var(--v-unit-4) 0 0;
    align-items: center;
    display: grid;
    grid-gap: var(--v-unit-3);
    .v-button {
        color: white;
    }
}
.footer-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: var(--v-unit-4);
    text-align: center;
    align-items: start;
}
.footer-newsletter {
    width: 100%;
    display: grid;
    justify-content: center;
}

.footer-title {
    text-align: center;
}

.footer-links {
    font-size: 12px;
    display: grid;
    align-items: center;
}

.footer-input-error {

}
.footer-input-success {
    
}
.footer-divider {
    color: var(--v-color-primary);
}
</style>