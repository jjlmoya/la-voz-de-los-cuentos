<template>
  <a ref="cardRef" class="smash-card" :href="toCharacter(slug)">
    <div
      class="smash-card__wrapper"
      :style="{
        backgroundImage: `linear-gradient(270deg, ${color || 'white'} 0%, rgb(255 255 255 / 0%) 45%)`
      }"
    >
      <div class="smash-card__content">
        <div class="smash-card__foe" v-if="faction === 'enemy'">
          <img
            :alt="`Imagen de ${name}`"
            class="smash-card__img"
            :aspectRatio="2 / 1"
            :src="getImageFoe()"
            loading="lazy"
          />
        </div>

        <VText
          class="smash-card__name"
          variant="header"
          color="primary"
          maxLines="2"
          :as="as"
        >
          {{ name }}
        </VText>
      </div>
    </div>
    <div class="smash-card__saga">
      <img
        :alt="`Icon ${saga}`"
        class="smash-card__img"
        :aspectRatio="1 / 1"
        :src="getSagaImage()"
        loading="lazy"
      />
    </div>
    <div class="smash-card__image">
      <img
        :alt="`Imagen de ${name}`"
        class="smash-card__img"
        :aspectRatio="2 / 1"
        :src="getImage()"
        loading="lazy"
      />
    </div>
  </a>
</template>

<script setup>
  import useCharacter from '../../composables/useCharacter'
  import { toCharacter } from '../../router'
  import { VText } from '@overgaming/vicius'

  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    order: {
      type: [String, Number],
      default: 0
    },
    slug: {
      type: String,
      default: ''
    },
    saga: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    as: {
      type: String,
      default: 'div'
    },
    faction: {
      type: String,
      default: ''
    }
  })

  const { getSagaImageKey } = useCharacter(props)
  const getImage = () => `/assets/characters/${props.image}.webp`
  const getImageFoe = () => `/assets/icons/foe.webp`
  const getSagaImage = () => `/assets/sagas/${getSagaImageKey()}.webp`
</script>

<style scoped>
  .smash-card {
    position: relative;
    height: 125px;
    display: grid;
    align-items: end;
    overflow: hidden;
  }
  .smash-card__wrapper {
    display: grid;
    align-items: center;
    background: white;
    border-radius: var(--v-unit-2);
    height: 100px;
  }
  .smash-card__image {
    border-radius: 8px;
    height: 100%;
    position: absolute;
    height: 125px;
    width: 50%;
    right: 0;
    top: 0;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
  .smash-card__foe {
    opacity: 0.5;
    width: 27px;
    height: 28px;
    position: absolute;
    left: 7px;
    top: 0;
    border-bottom: 3px dotted #6b0a0a;
  }

  .smash-card__saga {
    z-index: 1;
    opacity: 0.15;
    position: absolute;
    width: 100px;
    height: 100px;
    left: 10px;
    bottom: 0;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .smash-card__content {
    padding: var(--v-unit-3);
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: var(--v-unit-6);
  }
  .smash-card__name {
    z-index: 10;
    padding-left: var(--v-unit-4);
    font-size: 22px;
  }
</style>
