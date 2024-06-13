<template>
  <div class="hero-banner">
    <div class="parallax">
      <div class="parallax-layer sky" id="layer-back">
        <img src="@/assets/hero/owl-bg.png" alt="Background">
      </div>
      <div class="parallax-layer forest" id="layer-middle">
        <img src="@/assets/hero/owl-layer.png">
      </div>
       <div class="parallax-layer title" id="layer-middle">
        <img src="@/assets/hero/title.png" alt="Top Layer">
      </div>
      <div class="parallax-layer owl" id="layer-front">
        <img src="@/assets/hero/owl.png" alt="Front Layer">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroBanner',
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.pageYOffset;
      document.getElementById('layer-back').style.transform = `translateY(${scrollPosition * 0.2}px)`;
      document.getElementById('layer-middle').style.transform = `translateY(${scrollPosition * 0.5}px)`;
      document.getElementById('layer-front').style.transform = `translateY(${scrollPosition * 0.8}px)`;
    }
  }
};
</script>

<style scoped>
.hero-banner {
  position: relative;
  height: 70vh;
  overflow: hidden;
}
.parallax {
  position: relative;
  height: 100%;
  width: 100%;
}
.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.parallax-layer img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Estilos comunes para la imagen */
.hero-banner .parallax-layer.owl img {
    position: absolute;
    bottom: 0;
}

/* Media query para pantallas móviles (hasta 300px) */
@media (max-width: 900px) {
    .hero-banner .parallax-layer.owl img {
      object-fit: contain;
      width: 460px;
      right: calc(50% - 220px);
      height: auto;
    }
}



/* Media query para pantallas de escritorio (a partir de 600px) */
@media (min-width: 900px) {
    .hero-banner .parallax-layer.owl img {
        object-fit: contain;
        right: calc(50% - 300px);
        width: 600px;
        height: auto;

    }
}

.hero-banner .parallax-layer.title img {
    position: absolute;
    top: 0;
}

/* Media query para pantallas móviles (hasta 300px) */
@media (max-width: 900px) {
    .hero-banner .parallax-layer.title img {
        object-fit: contain;
        width: 400px;
        right: calc(50% - 200px);
        height: auto;
    }
}



/* Media query para pantallas de escritorio (a partir de 600px) */
@media (min-width: 900px) {
    .hero-banner .parallax-layer.title img {
        object-fit: contain;
        right: calc(50% - 200px);
        width: 400px;
        height: auto;

    }
}
</style>
