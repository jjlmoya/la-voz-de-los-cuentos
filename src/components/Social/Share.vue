<template>
  <div class="social-share">
    <VContainer size="xs" class="social-share__elements">
      <VButton
        class="social-share__button"
        :aria-label="`${t('page.story.share.aria')} Facebook`"
        color="primary"
        @click="shareOnFacebook"
        ><FacebookIcon
      /></VButton>
      <VButton
        class="social-share__button"
        :aria-label="`${t('page.story.share.aria')} X`"
        color="primary"
        @click="shareOnTwitter"
        ><XIcon
      /></VButton>
      <VButton
        class="social-share__button"
        :aria-label="`${t('page.story.share.aria')} LinkedIn`"
        color="primary"
        @click="shareOnLinkedIn"
        ><LinkedInIcon
      /></VButton>
      <VButton
        class="social-share__button"
        :aria-label="`${t('page.story.share.aria')} Whatsapp`"
        color="primary"
        @click="shareOnWhatsApp"
        ><WhatsappIcon
      /></VButton>
    </VContainer>
    <div class="social-share__share" v-if="label">
      <VText>{{ t('page.story.share') }}</VText>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  import t from '../../translations'
  import { VButton, VContainer, VText } from '@overgaming/vicius'
  import FacebookIcon from '../Icons/Social/Facebook.vue'
  import LinkedInIcon from '../Icons/Social/LinkedIn.vue'
  import XIcon from '../Icons/Social/X.vue'
  import WhatsappIcon from '../Icons/Social/Whatsapp.vue'

  const props = defineProps({
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: Boolean,
      default: false
    },
    onShare: {
      type: Function,
      default: () => {}
    }
  })

  const url = ref(props.url)
  const title = ref(props.title)

  function openShareWindow(shareUrl) {
    window.open(shareUrl, '_blank')
    props.onShare()
  }

  function shareOnFacebook() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url.value}`
    openShareWindow(shareUrl)
  }

  function shareOnTwitter() {
    const shareUrl = `https://twitter.com/intent/tweet?url=${url.value}&text=${title.value}`
    openShareWindow(shareUrl)
  }

  function shareOnLinkedIn() {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url.value}`
    openShareWindow(shareUrl)
  }

  function shareOnWhatsApp() {
    const shareUrl = `https://wa.me/?text=${title.value}%20${url.value}`
    openShareWindow(shareUrl)
  }

  onMounted(() => {
    url.value = window.location.href
  })
</script>

<style scoped>
  .social-share {
    display: grid;
    justify-content: end;
  }

  .social-share__share {
    text-align: right;
    font-size: 14px;
  }

  .social-share__elements {
    display: grid;
    grid-auto-flow: column;
  }

  .social-share__button {
    background-color: var(--v-color-surface-mod);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform-origin: center;
    
    svg {
      fill: black;
      transition: fill 0.3s ease;
    }
    
    &:hover {
      background-color: var(--v-color-primary);
      transform: scale(1.15);
      animation: button-bounce 0.6s ease;
      box-shadow: 
        0 8px 20px hsla(0, 0%, 0%, 0.15),
        0 0 20px hsla(var(--v-color-primary-hsl), 0.3);
      
      svg {
        fill: white;
      }
    }
    
    &:active {
      transform: scale(0.95);
      animation: button-press 0.2s ease;
    }
  }

  @keyframes button-bounce {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.25);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.15);
    }
  }

  @keyframes button-press {
    0% {
      transform: scale(1.15);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(0.95);
    }
  }
</style>
