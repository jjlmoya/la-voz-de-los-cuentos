<template>
  <div>
    <MainLayout>
      <div class="content">
        <h1>¿Ya no quieres más cuentos?</h1>
        <p>Si ya no deseas recibir más cuentos mágicos, ¡no te preocupes! Puedes enviar un correo a <a href="mailto:tus.audio.cuentos@gmail.com">tus.audio.cuentos@gmail.com</a> o responder a cualquier correo con un cuento, pidiendo que te demos de baja del servicio.</p>
        <p>Nos encantaría saber por qué ya no quieres recibir más cuentos o si tienes alguna sugerencia para nosotros. ¡Nos encanta escuchar a nuestros amiguitos!</p>

        <h2>¡No nos gustan las despedidas!</h2>
        <p>En <span class="text-secondary">La Voz de los Cuentos</span> nos ponemos tristes cuando alguien se va, pero entendemos tus motivos. Agradecemos todo el tiempo mágico que has pasado con nosotros. ¡Siempre serás parte de nuestra familia de cuentos!</p>

        <div class="image-container">
          <img src="@/assets/sad.png" alt="Imagen de despedida" />
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout.vue';

export default {
  name: 'StoryPage',
  components: {
    MainLayout
  }
};
</script>

<style scoped>
.content {
  margin: 16px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
}

h1, h2 {
  color: var(--secondary-color);
  font-size: 2em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

a {
  color: var(--secondary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.image-container {
  margin-top: 20px;
}

img {
  max-width: 100%;
  border-radius: 10px;
}
</style>
