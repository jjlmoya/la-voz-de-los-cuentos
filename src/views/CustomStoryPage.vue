<template>
  <div>
    <MainLayout>
      <div class="content">
        <img v-if="!loading && !success && !error" class="image-success" src="@/assets/emotes/salute.png" alt="Imagen de despedida" />
        <img v-if="loading" class="image-success" src="@/assets/emotes/thinking.png" alt="Imagen de despedida" />
        <img v-if="success" class="image-success" src="@/assets/emotes/happy.png" alt="Imagen de despedida" />
        <img v-if="error" class="image-success" src="@/assets/emotes/sad.png" alt="Imagen de despedida" />

        <p v-if="!loading && !success" class="description">
          Bienvenido a nuestra página mágica de creación de cuentos infantiles. Aquí puedes pedir un cuento personalizado 
          de forma gratuita. ¡Deja volar tu imaginación y permítenos crear una historia especial solo para ti!
        </p>
        <form v-if="!loading && !success" @submit.prevent="submitForm" class="custom-form">
          <div class="form-group">
            <label for="name">¿Tienes pensado nombre para el protagonista?</label>
            <input type="text" id="name" v-model="form.name" />
          </div>
          <div class="form-group">
            <label for="story">¿De qué va el cuento? <span class="mandatory">*</span></label>
            <textarea id="story" v-model="form.story" required></textarea>
          </div>
          <div class="form-group">
            <label for="email">¿Dónde enviarlo?</label>
            <input type="email" id="email" v-model="form.email" placeholder="ejemplo@email.com"/>
          </div>
          <div class="form-group-checkbox">
            <input type="checkbox" id="receiveAll" v-model="form.receiveAll" />
            <label for="receiveAll">Recibir todos los cuentos en mi correo</label>
          </div>
          <button type="submit" class="submit-button">Enviar</button>
        </form>
        <div v-if="loading" class="loader">
          <p>Creando tu cuento mágico...</p>
        </div>
        <div v-if="success" class="success-message">
          <p>¡Tu cuento ha sido creado con éxito y será enviado pronto!</p>
        </div>
        <div v-if="error" class="error-message">
          <p>Lo sentimos, hubo un error al crear tu cuento. Por favor, intenta nuevamente.</p>
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout.vue';

export default {
  name: 'CustomStoryPage',
  components: {
    MainLayout
  },
  data() {
    return {
      form: {
        name: '',
        story: '',
        email: '',
        receiveAll: false
      },
      loading: false,
      success: false,
      error: false
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.success = false;
      this.error = false;
      try {
        console.log({
          a: this.form
        })
        const response = await fetch('https://script.google.com/macros/s/AKfycbwul-TEGP_OmdIn5GUz398pZQC13mYx_98GSbLQz0ruboKi43Sr3NaG16-6OwZ14jDP/exec', {
          redirect: "follow",
          method: "POST",
          body: JSON.stringify(this.form),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        });
        if (response.ok) {
          this.success = true;
        } else {
          this.error = true;
          console.error('Error submitting the form:', response.statusText);
        }
      } catch (error) {
        this.error = true;
        console.error('Error submitting the form:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
img {
  max-height: 250px;
  border-radius: 15px;
  margin: 16px;
}
.content {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin-top: 80px;
}

.description {
  font-size: 1.5em;
  margin-bottom: 20px;
  max-width: 600px;
}

.custom-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group-checkbox input{
  width: 16px;
}

label {
  margin-bottom: 5px;
  font-size: 1.2em;
}

.mandatory {
  color: var(--secondary-color);
}

input, textarea {
  padding: 10px;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  font-size: 1em;
}

textarea {
  height: 120px;
  resize: vertical;
}

.submit-button {
  padding: 10px 20px;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  align-self: center;
  font-size: 1.2em;
}

.loader, .success-message, .error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.loader img, .success-message img {
  width: 50px;
  height: 50px;
}

.loader p, .success-message p, .error-message p {
  margin-top: 10px;
  font-size: 1.3em;
  color: var(--primary-color);
}

.error-message {
  color: red;
}
</style>
