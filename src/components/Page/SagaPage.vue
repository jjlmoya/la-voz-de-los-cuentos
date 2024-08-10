<template>
  <VContainer size="xl" class="saga-page">
    <div class="saga-page__image">
         <iframe 
          v-if="saga.youtube"
          width="560" 
          height="315" 
          :src="`https://www.youtube.com/embed/videoseries?list=${saga.youtube}`" 
          :title="`Playlist de la saga: ${saga.name}`" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
    </div>
    <div class="saga-page__title">
        <VText as="h1" variant="header">
            {{ saga.name }}
        </VText>
    </div>
    <div class="saga-page__content">
        <VText>{{ saga.description }}</VText>
    </div>
    <SectionsDefault class="saga-page__related" client:load title="Cuentos Relacionados">
      <SagaStories client:load :saga="saga" />
    </SectionsDefault>
  </VContainer>
</template>

<script setup>
  const props = defineProps({
    saga: {
      type: Object,
      default: {}
    }
  })

  import { VText, VContainer } from '@overgaming/vicius'
  import SagaStories from '../Sections/SagaStories.vue'
  import SectionsDefault from '../Sections/Default.vue'

</script>

<style>
 
  .saga-page {
    padding: 0 var(--v-unit-2)
  }
  .saga-page_font-selector {
    font-weight: bold;
    padding: var(--v-unit-4);
    display: grid;
    justify-content: center;
    grid-gap: var(--v-unit-1);
    text-align: center;
    .v-input {
        min-height: 0;
    }
  }

  .saga-page__image {
    position: relative;
    border-radius: var(--v-unit-3);
    overflow: hidden;
  }
 .saga-page__pdf {
    top: 0;
    right: 0;
    position: absolute;
    z-index: 100;
    svg {
        height: 60px;
        width: auto;
        padding: 4px;
        fill: white;
    }
    &:hover {
        svg {
            fill: black;
        }
    }
  }

  .saga-page__content, .saga-page__title {
    padding: var(--v-unit-2) 0;
  }

  .saga-page__audio {
    border-radius: var(--v-unit-2);
    overflow: hidden;
    position: relative;
    height: 150px;
    iframe {
      width: 100%;
    }
  }

  .saga-page__audio-hide {
    position: absolute;
    top: 0;
    right: 0;
    height: 150px;
    width: 100%; 
    bottom: 0;
    background-color: white;
    z-index: 10;
    animation: fold 0.9s ease-in forwards;
  }

  .saga-page__audio-loading {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    content: " ";
    z-index: 10;
  }

  @keyframes fold {
    0% {
      width: 100%;
    }
    99% {
      width: 150px;
    }
    100% {
      width: 150px;
    }
  }

  @media print {
     body {
        background: white !important;
        color: black !important;
    }

    .main-layout-menu {
        width: 0px !important;
        opacity: 0;
    }
    img {
        display: none;
    }
    .main-layout {
        grid-template-columns: 0px 1fr !important;
    }
    .saga-page__image, .saga-page__related, .saga-page__audio, .saga-page_font-selector {
        display: none !important;
    }
  }
</style>

