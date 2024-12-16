<template>
  <VContainer size="xl" class="character-page">
    <div class="character-page__header">
      <VButton
        variant="primary"
        class="character-page__back"
        as="a"
        :href="toCharacters()"
      >
        <svg viewBox="0 0 477.175 477.175">
          <g>
            <path
              d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"
            />
          </g>
        </svg>
      </VButton>
      <h1 class="character-page__name">
        <div>
          {{ character.order < 10 ? `0${character.order}` : character.order }}
        </div>
        <div>{{ character.name }}</div>
        <div class="character-page__saga">
          <VImage :src="getSagaImage()" :alt="`Saga ${character.saga}`" />
        </div>
      </h1>
    </div>
    <div class="character-page__content">
      <div class="character-page__image">
        <VImage
          :src="`/assets/characters/${character.image}-v.webp`"
          :alt="`Image ${character.name}`"
        />
        <div class="character-page__quick">
          <div class="character-page__quick-row">
            <h2>{{ t('page.character.birthday') }}</h2>
            <div>{{ character.birthday }}</div>
          </div>
          <div class="character-page__quick-row">
            <h2>{{ t('page.character.age') }}</h2>
            <div>{{ character.age }}</div>
          </div>
          <div class="character-page__quick-row">
            <h2>{{ t('page.character.food') }}</h2>
            <div>{{ character.food }}</div>
          </div>
          <div class="character-page__quick-row">
            <h2>{{ t('page.character.color') }}</h2>
            <div
              class="character-page__color"
              :style="{ backgroundColor: character.color }"
            ></div>
          </div>
          <div class="character-page__quick-row">
            <h2>{{ t('page.character.hobbies') }}</h2>
            <div>{{ character.hobbies }}</div>
          </div>
          <div class="character-page__quick-row">
            <h2>{{ t('page.character.phobias') }}</h2>
            <div>{{ character.phobias }}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="character-page__info">
          <div class="character-page__paragraph">
            <h2>{{ t('page.character.personality') }}</h2>
            <div>{{ character.personality }}</div>
          </div>
          <div class="character-page__paragraph">
            <h2>{{ t('page.character.appearance') }}</h2>
            <div>{{ character.appearance }}</div>
          </div>
          <div class="character-page__paragraph">
            <h2>{{ t('page.character.motivations') }}</h2>
            <div>{{ character.motivations }}</div>
          </div>
          <div
            class="character-page__paragraph"
            v-if="relatedCharacters.length"
          >
            <h2>{{ t('page.character.same.saga') }}</h2>
            <Smash
              v-for="_character in relatedCharacters"
              :key="_character.order"
              as="h3"
              :slug="_character.key"
              :image="_character.image"
              :name="_character.name"
              :order="_character.order"
              :saga="_character.saga"
              :color="_character.color"
              :faction="_character.faction"
            />
          </div>
          <div class="character-page__paragraph" v-if="relatedStories.length">
            <h2>{{ t('page.character.stories') }}</h2>
            <div class="character-page__stories">
              <Basic
                as="h3"
                v-for="story in relatedStories"
                :slug="story.key"
                :key="story.key"
                :title="story.name"
                :time="parseInt(story.time)"
                isStory
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </VContainer>
</template>

<script setup>
  const props = defineProps({
    character: {
      type: Object,
      default: {}
    }
  })

  import t from '../../translations'
  import { VImage, VContainer, VButton } from '@overgaming/vicius'
  import useCharacter from '../../composables/useCharacter'
  import { toCharacters } from '../../router'
  import Smash from '../Cards/Smash.vue'
  import { onMounted, ref } from 'vue'
  import Basic from '../Cards/Basic.vue'
  const { getSagaImageKey, getCharactersSameSaga, getRelatedStories } =
    useCharacter(props.character)
  const getSagaImage = () => `/assets/sagas/${getSagaImageKey()}.webp`
  const relatedCharacters = ref([])
  const relatedStories = ref([])
  onMounted(() => {
    relatedCharacters.value = getCharactersSameSaga()
    relatedStories.value = getRelatedStories()
  })
</script>

<style>
  .character-page {
    padding: var(--v-unit-4) 0;
    display: grid;
    grid-gap: var(--v-unit-2);
  }
  .character-page__header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: var(--v-unit-1);
  }

  .character-page__stories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-gap: 12px;
  }
  .character-page__color {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid white;
    margin: 0 auto;
  }
  .character-page__quick {
    position: absolute;
    bottom: 0;
    padding: var(--v-unit-8) 0;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background-image: linear-gradient(
      0deg,
      rgb(255 255 255 / 70%) 0%,
      rgb(255 255 255 / 80%) 70%,
      rgb(255 255 255 / 90%) 100%
    );
    grid-gap: var(--v-unit-1);
    font-size: 14px;
    line-height: 1.3;
    width: 100%;

    h2 {
      font-weight: bold;
    }
  }
  .character-page__quick-row {
    display: grid;
  }

  .character-page__back {
    &:before {
      content: ' ';
      height: 100%;
      border-left: 3px solid white;
      border-right: 1px solid white;
      margin-left: 4px;
    }
    svg {
      fill: white;
      height: 25px;
    }
  }
  .character-page__info {
    display: grid;
    grid-gap: var(--v-unit-4);
    align-items: start;
    justify-content: start;
    h2 {
      font-size: 24px;
      font-weight: bold;
      padding-top: var(--v-unit-6);
      padding-bottom: var(--v-unit-2);
    }
    @media (width <= 1360px) {
      font-size: 14px;
      line-height: 1.2;
    }
  }
  .character-page__content {
    position: relative;
    padding: var(--v-unit-4);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    @media (width <= 1360px) {
      grid-template-columns: 1fr;
    }
    grid-gap: var(--v-unit-4);
  }

  .character-page__name {
    background-color: white;
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: var(--v-unit-4);
    font-size: 24px;
    padding: var(--v-unit-4);
    color: var(--v-color-primary);
    font-weight: bold;

    @media (width >= 1360px) {
      top: 0;
    }
  }

  .character-page__image {
    position: relative;
    border-radius: var(--v-unit-3);
    overflow: hidden;
  }

  .character-page__saga {
    opacity: 0.2;
    position: absolute;
    left: 25px;
    bottom: 0;
    height: 60px;
    width: 60px;
    img {
      height: 60px;
    }
  }
</style>
