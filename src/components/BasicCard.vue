<template>
  <a :href="link" target="_blank">
    <div class="basic-card">
      <div class="basic-image">
        <img :src="require(`@/assets/sagas/${saga.image}`)" :alt="saga.name" />
        <div class="basic-info">
          <h3>{{ saga.name }}</h3>
         
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import { ref } from 'vue';
import useYoutubeLink from '../hooks/useYoutubeLink';

export default {
  name: 'BasicCard',
  props: {
    saga: {
      type: Object,
      required: true
    },
    linkType: {
      type: String,
      required: true,
      default: 'VIDEO'
    }
  },
  setup(props) {
    const youtube = ref(props.saga.youtube);
    const linkType = ref(props.linkType);
    console.log({youtube})
    const { link } = useYoutubeLink(youtube, linkType);

    return { link };
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
