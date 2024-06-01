<template>
  <footer class="main-footer">
    <img :src="require('@/assets/clouds.png')" alt="Clouds background" class="background-image">
    <div class="footer-spacing"></div>
    <ul>
      <li><router-link to="/cuento-request">Pedirnos un cuento</router-link></li>
      <li><router-link to="/unsubscribe">Eliminar de la newsletter</router-link></li>
    </ul>
    <div class="column">
      <h2>¿Quieres que te enviemos cuentos nuevos?</h2>
      <form @submit.prevent="subscribe" class="newsletter-form">
        <input 
          type="email" 
          placeholder="Tu correo electrónico" 
          v-model="email" 
          class="input-email" 
          :class="{ 'is-invalid': submitAttempted && emailError }" 
        />
        <span v-if="submitAttempted && emailError" class="error-message">Por favor, introduce un correo electrónico válido.</span>
        <button type="submit" class="btn-submit" :disabled="emailError">Suscribirse</button>
      </form>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      emailError: false,
      submitAttempted: false
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbyQQWpj1xASWGshNc0lKq4mfNAEH0HYeK5RTT3O-4xE2_wDZEMiho7mIVwjHbJD2Rmz/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.result === 'success') {
          console.log('Subscription successful');
          alert('¡Suscripción exitosa!');
        } else {
          console.error('Subscription failed');
          alert('Hubo un problema con la suscripción.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la suscripción.');
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
