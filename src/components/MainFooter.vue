<template>
  <footer class="main-footer">
    <img :src="require('@/assets/clouds.png')" alt="Clouds background" class="background-image">
    <div class="footer-spacing"></div>
    <ul>
      <li><router-link to="/cuento-personalizado">Pedirnos un cuento único</router-link></li>
      <li><router-link to="/quitarse">Eliminar envíos de cuentos mágicos</router-link></li>
    </ul>
    <div class="column">
      <div v-if="!successMessage">
        <h2>¿Quieres que te enviemos cuentos nuevos por correo?</h2>
        <form @submit.prevent="subscribe" class="newsletter-form">
            <input 
            type="email" 
            placeholder="Tu correo electrónico" 
            v-model="email" 
            class="input-email" 
            :class="{ 'is-invalid': submitAttempted && emailError }" 
            />
            <span v-if="submitAttempted && emailError" class="error-message">Por favor, introduce un correo electrónico válido.</span>
            <button type="submit" class="btn-submit">¡Sí!</button>
        </form>
      </div>
      <div v-if="successMessage" class="success-message">
        <div class="image-container">
          <p class="success-message">{{ successMessage }}</p>
          <img class="image-success" src="@/assets/emotes/happy.png" alt="Imagen de despedida" />
        </div>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      emailError: false,
      submitAttempted: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    validateEmail() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.emailError = !re.test(this.email)
    },
    async subscribe() {
      this.submitAttempted = true
      this.validateEmail()
      if (this.emailError) {
        console.log('Formulario no válido')
        return
      }

      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxzhVGv1wPrLwYU9Inq0Pbx9Bm76LBl8RX9oyWSdaEcaCWyschEyNgJbMNS8XUYj7Pi/exec', {
          redirect: "follow",
          method: "POST",
          body: JSON.stringify({ email: this.email }),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.result === 'success') {
          this.successMessage = '¡Te enviaremos los cuentos!';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Hubo un problema con la suscripción.';
          this.successMessage = '';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Hubo un problema con la suscripción.';
        this.successMessage = '';
      }
    }
  }
}
</script>

<style scoped>
.main-footer {
  min-height: 300px;
  position: relative;
  width: 100vw;
  height: auto;
  text-align: center;
  color: var(--secondary-color);
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: contain;
  z-index: -1;
}
.image-success {
    border-radius: 25px;
    width: 50%;
}
.footer-spacing {
  height: 450px;
}

@media (max-width: 700px) {
  .footer-spacing {
    height: 150px;
  }
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin: 10px 0;
  text-decoration: underline;
}

ul li a {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 400;
}

.column {
  flex: 1 1 300px;
  padding: 16px;
}

@media (max-width: 700px) {
  .column {
    background-color: white;
  }
}

h2 {
  margin-top: 32px;
  font-weight: bold;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-email {
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.is-invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  padding-bottom: 16px;
}

.success-message {
  color: var(--primary-color);
  font-size: 1.3rem;
  padding: 12px;
}

.btn-submit {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-submit:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.btn-submit:hover {
  background-color: var(--primary-color);
}
</style>
