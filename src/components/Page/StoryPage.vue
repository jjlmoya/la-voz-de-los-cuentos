<template>
  <VContainer size="xl" class="story-page">
    <div class="story-page__image">
      <VImage
        v-if="!story.youtube"
        :src="`/assets/stories/${lang}/${story.key}.webp`"
        :alt="`Image ${story.name}`"
      />
      <lite-youtube
        v-if="story.youtube"
        :videoid="story.youtube"
        :playlabel="story.name"
      />
    </div>
    <Spotify v-if="story.spotify" :spotify="story.spotify" />

    <div class="story-page__title">
      <VText as="h1" variant="header" color="high">
        {{ story.name }}
      </VText>
      <div class="story-page__progress">
        <div
          :style="{ width: `${progress || 0}%` }"
          class="story-page__progress-complete"
        ></div>
      </div>
    </div>
    <div class="story-page__content">
      <article class="story-page__body">
        <div
          :style="{
            fontSize: `${fontSize}px`,
            'line-height': `${fontSize >= 20 ? '1.5' : '1.2'}`
          }"
          v-html="storyHTML"
        />
      </article>
    </div>
    <div class="story-page__tool">
      <div class="story-page__tool-font" v-if="isFontSelector">
        <div
          class="story-page__tool-font-entry"
          v-for="size in [14, 16, 18, 20, 22, 24, 26, 28]"
        >
          <div
            @click="setFontSize(size)"
            :style="{ 'font-size': `${size}px` }"
            :class="{
              'story-page__tool-font-entry--active': fontSize === size
            }"
          >
            a
          </div>
        </div>
      </div>
      <SocialShare v-if="isSocialShare" :url="url" :title="title" />
      <div class="story-page__tool-wrapper">
        <VButton class="story-page__button" @click="printPdf" aria-label="PDF">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 58 58"
            xml:space="preserve"
          >
            <g>
              <path
                d="M50.95,12.187l-0.771-0.771L40.084,1.321L39.313,0.55C38.964,0.201,38.48,0,37.985,0H8.963C7.777,0,6.5,0.916,6.5,2.926V39   v16.537V56c0,0.837,0.842,1.653,1.838,1.91c0.05,0.013,0.098,0.032,0.15,0.042C8.644,57.983,8.803,58,8.963,58h40.074   c0.16,0,0.319-0.017,0.475-0.048c0.052-0.01,0.1-0.029,0.15-0.042C50.658,57.653,51.5,56.837,51.5,56v-0.463V39V13.978   C51.5,13.211,51.408,12.645,50.95,12.187z M47.935,12H39.5V3.565L47.935,12z M8.963,56c-0.071,0-0.135-0.026-0.198-0.049   C8.609,55.877,8.5,55.721,8.5,55.537V41h41v14.537c0,0.184-0.109,0.339-0.265,0.414C49.172,55.974,49.108,56,49.037,56H8.963z    M8.5,39V2.926C8.5,2.709,8.533,2,8.963,2h28.595C37.525,2.126,37.5,2.256,37.5,2.391V14h11.609c0.135,0,0.264-0.025,0.39-0.058   c0,0.015,0.001,0.021,0.001,0.036V39H8.5z"
              />
              <path
                d="M22.042,44.744c-0.333-0.273-0.709-0.479-1.128-0.615c-0.419-0.137-0.843-0.205-1.271-0.205h-2.898V54h1.641v-3.637h1.217   c0.528,0,1.012-0.077,1.449-0.232s0.811-0.374,1.121-0.656c0.31-0.282,0.551-0.631,0.725-1.046c0.173-0.415,0.26-0.877,0.26-1.388   c0-0.483-0.103-0.918-0.308-1.306S22.375,45.018,22.042,44.744z M21.42,48.073c-0.101,0.278-0.232,0.494-0.396,0.649   c-0.164,0.155-0.344,0.267-0.54,0.335c-0.196,0.068-0.395,0.103-0.595,0.103h-1.504v-3.992h1.23c0.419,0,0.756,0.066,1.012,0.198   c0.255,0.132,0.453,0.296,0.595,0.492c0.141,0.196,0.234,0.401,0.28,0.615c0.045,0.214,0.068,0.403,0.068,0.567   C21.57,47.451,21.52,47.795,21.42,48.073z"
              />
              <path
                d="M31.954,45.4c-0.424-0.446-0.957-0.805-1.6-1.073s-1.388-0.403-2.235-0.403h-3.035V54h3.814   c0.127,0,0.323-0.016,0.588-0.048c0.264-0.032,0.556-0.104,0.875-0.219c0.319-0.114,0.649-0.285,0.991-0.513   s0.649-0.54,0.923-0.937s0.499-0.889,0.677-1.477s0.267-1.297,0.267-2.126c0-0.602-0.105-1.188-0.314-1.757   C32.694,46.355,32.378,45.847,31.954,45.4z M30.758,51.73c-0.492,0.711-1.294,1.066-2.406,1.066h-1.627v-7.629h0.957   c0.784,0,1.422,0.103,1.914,0.308s0.882,0.474,1.169,0.807s0.48,0.704,0.581,1.114c0.1,0.41,0.15,0.825,0.15,1.244   C31.496,49.989,31.25,51.02,30.758,51.73z"
              />
              <polygon
                points="35.598,54 37.266,54 37.266,49.461 41.477,49.461 41.477,48.34 37.266,48.34 37.266,45.168 41.9,45.168    41.9,43.924 35.598,43.924  "
              />
              <path
                d="M38.428,22.961c-0.919,0-2.047,0.12-3.358,0.358c-1.83-1.942-3.74-4.778-5.088-7.562c1.337-5.629,0.668-6.426,0.373-6.802   c-0.314-0.4-0.757-1.049-1.261-1.049c-0.211,0-0.787,0.096-1.016,0.172c-0.576,0.192-0.886,0.636-1.134,1.215   c-0.707,1.653,0.263,4.471,1.261,6.643c-0.853,3.393-2.284,7.454-3.788,10.75c-3.79,1.736-5.803,3.441-5.985,5.068   c-0.066,0.592,0.074,1.461,1.115,2.242c0.285,0.213,0.619,0.326,0.967,0.326h0c0.875,0,1.759-0.67,2.782-2.107   c0.746-1.048,1.547-2.477,2.383-4.251c2.678-1.171,5.991-2.229,8.828-2.822c1.58,1.517,2.995,2.285,4.211,2.285   c0.896,0,1.664-0.412,2.22-1.191c0.579-0.811,0.711-1.537,0.39-2.16C40.943,23.327,39.994,22.961,38.428,22.961z M20.536,32.634   c-0.468-0.359-0.441-0.601-0.431-0.692c0.062-0.556,0.933-1.543,3.07-2.744C21.555,32.19,20.685,32.587,20.536,32.634z    M28.736,9.712c0.043-0.014,1.045,1.101,0.096,3.216C27.406,11.469,28.638,9.745,28.736,9.712z M26.669,25.738   c1.015-2.419,1.959-5.09,2.674-7.564c1.123,2.018,2.472,3.976,3.822,5.544C31.031,24.219,28.759,24.926,26.669,25.738z    M39.57,25.259C39.262,25.69,38.594,25.7,38.36,25.7c-0.533,0-0.732-0.317-1.547-0.944c0.672-0.086,1.306-0.108,1.811-0.108   c0.889,0,1.052,0.131,1.175,0.197C39.777,24.916,39.719,25.05,39.57,25.259z"
              />
            </g>
          </svg>
        </VButton>
        <VButton
          @click="toggleLike"
          class="story-page__button"
          aria-label="Like"
        >
          <img v-if="!like" :src="`/assets/utils/heart-empty.webp`" />
          <img v-if="like" :src="`/assets/utils/heart-full.webp`" />
        </VButton>
        <VButton
          @click="toggleFontSelector"
          class="story-page__button"
          :class="{ 'story-page__button--active': isFontSelector }"
        >
          <span style="fontsize: 24px">A</span>
          <span style="fontsize: 16px">a</span>
        </VButton>
        <VButton
          @click="toggleSocialShare"
          class="story-page__button"
          :class="{ 'story-page__button--active': isSocialShare }"
        >
          <svg viewBox="0 0 700 700">
            <g
              transform="matrix(1.3377542,0,0,1.3377542,-127.23318,-22.517556)"
            >
              <path
                d="m 349.3,39.199 c -1.2539,0.13672 -2.4258,0.69141 -3.3242,1.5742 l -89.602,89.602 c -1.0664,1.0664 -1.668,2.5156 -1.668,4.0234 0,1.5117 0.60156,2.9609 1.668,4.0273 1.0664,1.0664 2.5156,1.668 4.0234,1.668 1.5117,0 2.9609,-0.60156 4.0273,-1.668 l 85.574,-85.574 85.574,85.574 c 1.0664,1.0664 2.5156,1.668 4.0273,1.668 1.5078,0 2.957,-0.60156 4.0234,-1.668 1.0664,-1.0664 1.668,-2.5156 1.668,-4.0273 0,-1.5078 -0.60156,-2.957 -1.668,-4.0234 l -89.602,-89.602 c -1.2422,-1.2344 -2.9883,-1.8164 -4.7227,-1.5742 z"
              />
              <path
                d="m 348.77,47.074 c -2.6055,0.58594 -4.4375,2.9297 -4.375,5.6016 v 232.93 c -0.0195,1.4961 0.5625,2.9414 1.6133,4.0078 1.0508,1.0703 2.4883,1.6719 3.9883,1.6719 1.5,0 2.9375,-0.60156 3.9883,-1.6719 1.0508,-1.0664 1.6328,-2.5117 1.6133,-4.0078 v -232.93 c 0.0391,-1.7266 -0.71484,-3.3711 -2.0469,-4.4648 -1.3359,-1.0938 -3.0977,-1.5117 -4.7812,-1.1367 z"
              />
              <path
                d="m 226.8,218.4 c -15.414,0 -28,12.586 -28,28 v 246.4 c 0,15.414 12.586,28 28,28 h 212.8 v 0.004 c 1.4961,0.0195 2.9414,-0.55859 4.0078,-1.6133 1.0703,-1.0508 1.6719,-2.4883 1.6719,-3.9883 0,-1.5 -0.60156,-2.9336 -1.6719,-3.9883 -1.0664,-1.0508 -2.5117,-1.6328 -4.0078,-1.6094 H 226.8 c -9.4023,0 -16.801,-7.3945 -16.801,-16.801 v -246.4 c 0,-9.4023 7.3945,-16.801 16.801,-16.801 h 61.602 -0.004 c 1.5,0.0195 2.9453,-0.5625 4.0117,-1.6133 1.0703,-1.0508 1.668,-2.4883 1.668,-3.9883 0,-1.5 -0.59766,-2.9375 -1.668,-3.9883 -1.0664,-1.0508 -2.5117,-1.6328 -4.0117,-1.6133 h -61.602 z m 184.27,0 c -3.0938,0.14844 -5.4805,2.7695 -5.3359,5.8633 0.1446,3.0938 2.7695,5.4844 5.8633,5.3398 h 61.602 c 9.4023,0 16.801,7.3945 16.801,16.801 v 246.4 c 0,9.4023 -7.3945,16.801 -16.801,16.801 h -0.004 c -1.5,-0.0234 -2.9414,0.55859 -4.0117,1.6094 -1.0664,1.0547 -1.668,2.4883 -1.668,3.9883 0,1.5 0.60156,2.9375 1.668,3.9883 1.0703,1.0547 2.5117,1.6328 4.0117,1.6133 15.414,0 28,-12.586 28,-28 v -246.4 c 0,-15.414 -12.586,-28 -28,-28 h -61.602 l 0.004,-0.004 c -0.17578,-0.008 -0.35156,-0.008 -0.52734,0 "
              />
            </g>
          </svg>
        </VButton>
      </div>
    </div>
    <SectionsDefault
      class="story-page__related"
      :title="t('page.story.related')"
    >
      <RelatedStoriesSection :story="story" />
    </SectionsDefault>
  </VContainer>
</template>

<script setup>
  import t from '../../translations'
  import Spotify from '../Media/Spotify.vue'
  const lang = import.meta.env.PUBLIC_LANG

  const props = defineProps({
    story: {
      type: Object,
      default: {}
    },
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  })

  import { VImage, VText, VButton, VContainer } from '@overgaming/vicius'
  import RelatedStoriesSection from '../Sections/RelatedStories.vue'
  import SectionsDefault from '../Sections/Default.vue'
  import SocialShare from '../Social/Share.vue'

  SectionsDefault
  import { ref, toValue, onMounted } from 'vue'
  import useStory from '../../composables/useStory'

  const isFontSelector = ref(false)
  const isSocialShare = ref(false)

  const setFontSize = _size => {
    fontSize.value = _size
    localStorage.setItem('fontSize', fontSize.value)
    isFontSelector.value = false
  }
  const isFinished = ref(false)
  const storyHTML = ref('')
  const fontSize = ref(18)
  const { html, getCurrentStatus, setLikeStatus, reading } = useStory(
    props.story
  )
  storyHTML.value = html()
  const printPdf = () => {
    window.print()
  }
  const status = ref(getCurrentStatus())
  const like = ref(toValue(status.like))
  const progress = ref(toValue(status.current))

  const toggleFontSelector = () => {
    isFontSelector.value = !isFontSelector.value
  }

  const toggleSocialShare = () => {
    isSocialShare.value = !isSocialShare.value
  }
  const toggleLike = () => {
    like.value = !like.value
    setLikeStatus(like.value)
  }

  onMounted(() => {
    const savedFontSize = localStorage.getItem('fontSize')
    if (savedFontSize) {
      fontSize.value = parseInt(savedFontSize, 10)
    }
    reading()
    setInterval(() => {
      const _current = getCurrentStatus()
      progress.value = _current.current
      isFinished.value = _current.finished
    }, 2500)
  })
</script>

<style>
  .story-page {
    padding: var(--v-unit-4);
    display: grid;
    grid-gap: var(--v-unit-2);
  }
  .story-page__tool-font {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
    grid-gap: var(--v-unit-6);
    padding: var(--v-unit-4) 0;
  }
  .story-page__title {
    position: sticky;
    background-color: var(--v-color-surface-high);
    padding: var(--v-unit-4);
    top: 60px;
    border-radius: var(--v-unit-2) var(--v-unit-2) 0 0;
    text-align: center;
    font-size: 24px;

    @media (width >= 1360px) {
      top: 0;
    }
    z-index: 4;
    .v-text {
      line-height: 1.1;
    }
  }

  .story-page__progress {
    background-color: var(--v-color-surface-high);
    width: 100%;
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
  }

  .story-page__progress-complete {
    background-color: var(--v-color-error);
    height: 5px;
    transition: width 10s ease-in-out;
  }

  .story-page__content {
    background-color: var(--v-color-surface-high);
    padding: var(--v-unit-2) var(--v-unit-6) var(--v-unit-6) var(--v-unit-6);
    border-radius: 0 0 var(--v-unit-2) var(--v-unit-2);
    display: grid;
    grid-gap: var(--v-unit-4);
  }
  .story-page_font-selector {
    font-weight: bold;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .story-page_font-selector--active {
    color: var(--v-color-primary);
  }

  .story-page__tool-font-entry {
    cursor: pointer;
  }

  .story-page__tool-font-entry--active {
    color: var(--v-color-primary);
    font-weight: 200;
  }
  .story-page__tool-font-entry--active {
    color: var(--v-color-primary);
    font-weight: bold;
  }

  .story-page__like {
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .story-page__tool {
    display: grid;
    justify-content: center;
    position: sticky;
    bottom: 0;
    z-index: 10;
    background-color: var(--v-color-surface-high);
    border-top: 1px solid var(--v-color-primary);
  }

  .story-page__tool-wrapper {
    display: grid;
    grid-auto-flow: column;
    grid-gap: var(--v-unit-2);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .story-page__tool-left {
    justify-content: start;
    height: 30px;
    display: grid;
    grid-auto-flow: column;
    img {
      height: 20px;
    }
  }

  .story-page__button {
    img {
      max-height: 20px;
    }
    svg {
      height: 32px;
      fill: black;
    }
    .story-page__button--active,
    &:hover {
      color: white;
      background: var(--v-color-primary);
      svg {
        fill: white;
      }
    }
  }

  .story-page__button--active {
    background: var(--v-color-primary);
    color: white;
    svg {
      fill: white;
    }
  }

  .story-page__image {
    position: relative;
    border-radius: var(--v-unit-3);
    overflow: hidden;
  }
  astro-dev-toolbar {
    display: none !important;
  }

  @media print {
    * {
      display: none;
    }

    html,
    body,
    .story-page,
    .navigation-layout,
    .navigation-layout__content {
      display: block;
    }
    .story-page__content,
    .story-page__title {
      display: block;
      background-color: white;
      border: 0;
      * {
        display: block;
      }
    }
    .story-page__image,
    .story-page__related,
    .footer,
    .navigation-layout__mobile,
    .story-page_font-selector,
    .spotify,
    .social-share,
    .story-page__progress,
    astro-dev-toolbar {
      display: none !important;
    }
  }
</style>
