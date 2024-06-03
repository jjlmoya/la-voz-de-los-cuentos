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

    const imageSrc = computed(() => getImage(props.entry.key, props.isSaga));

    return { link, imageSrc };
  },
};
</script>

<style scoped>
.basic-card {
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 250px;
  height: 250px;
  flex: 0 0 auto;
  margin: 0.5rem;
  transition: transform 0.3s;
  position: relative;
}

@media (max-width: 900px) {
    .basic-card {
        width: 150px;
        height: 150px;
    }
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
  backdrop-filter: blur(8px);
  color: #450505;
  text-align: center;
  padding: 8px;
}
.basic-info h3 {
  width: 100%;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
}
</style>
