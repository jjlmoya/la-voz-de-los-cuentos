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
    <VContainer class="saga-page__content">
        <div class="saga-page__title">
            <VText as="h1" variant="header">
                {{ saga.name }}
            </VText>
        </div>
        <VText>
          <div v-html="descriptionHtml"></div>
        </VText>
    </VContainer>
    <SectionsDefault client:load :title="`Cuentos De La Saga (${totalTime})`">
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

  import useSaga from '../../composables/useSaga'
  import { VText, VContainer } from '@overgaming/vicius'
  import SagaStories from '../Sections/SagaStories.vue'
  import SectionsDefault from '../Sections/Default.vue'
  const { getTime, html } = useSaga(props.saga)
  const totalTime = getTime()
  const descriptionHtml = html()

</script>

<style>
 
  .saga-page {
    padding: 0 var(--v-unit-2);
    iframe{
      width: 100%;
      min-height: 40dvh;
    }
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

  .saga-page__content {
    display: grid;
    grid-gap: var(--v-unit-2);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface-mod);
    border-radius: var(--v-unit-2);
  }
  

</style>

