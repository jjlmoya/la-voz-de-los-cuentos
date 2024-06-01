<template>
  <a :href="link" target="_blank">
    <div class="basic-card">
      <div class="basic-image">
        <img 
          :src="imageSrc" 
          :alt="entry.name" 
        />
        <div class="basic-info">
          <h3>{{ entry.name }}</h3>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import { ref, computed } from 'vue';
import useYoutubeLink from '../hooks/useYoutubeLink';

// Crear un contexto que cargue todas las imágenes dentro de @/assets
const requireContext = require.context('@/assets', true, /\.png$/);

// Crear un mapeo de las rutas de las imágenes
const images = {};
requireContext.keys().forEach((key) => {
  images[key.replace('./', '')] = requireContext(key);
});

export default {
  name: 'BasicCard',
  props: {
    entry: {
      type: Object,
      required: true
    },
    linkType: {
      type: String,
      required: true,
      default: 'VIDEO'
    },
    isSaga: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const getImage = (key, isSaga) => {
        const imageSrc = `${isSaga ? "sagas": "stories"}/${key}.png`;
        return images[imageSrc] || images['sagas/default.png'];
    }
    const youtube = ref(props.entry.youtube);
    const linkType = ref(props.linkType);
    const { link } = useYoutubeLink(youtube, linkType);

    console.log({entry: props.entry});
    const imageSrc = computed(() => getImage(props.entry.key, props.isSaga));

    return { link, imageSrc };
  },
};
</script>

<style scoped>
.basic-card {
  border: 3px solid var(--primary-color);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 200px;
  height: 200px;
  flex: 0 0 auto;
  margin: 0.5rem;
  transition: transform 0.3s;
  position: relative;
}
.basic-card:hover {
  transform: translateY(-8px);
}
.basic-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.basic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.basic-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  color: var(--primary-color);
  text-align: center;
  padding: 0.5rem 0;
}
.basic-info h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}
</style>
