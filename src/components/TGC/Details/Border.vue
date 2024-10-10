<template>
  <div class="tgc-card__layer tgc-card__border-fill">
    <img src="/cards/structure/border-fill.webp" alt="Border" />
  </div>
  <div
    class="tgc-card__layer tgc-card__border"
    :class="[`tgc-card__border--${lang}`]"
  >
    <img src="/cards/structure/border.webp" alt="Border" />
  </div>
</template>

<script setup>
  const lang = import.meta.env.PUBLIC_LANG
</script>
<style>
  .tgc-card__border img {
    object-fit: cover;
  }

  .tgc-card__border--en img {
    filter: invert(36%) sepia(18%) saturate(1639%) hue-rotate(115deg)
      brightness(93%) contrast(84%);
  }

  .tgc-card__border--es img {
    filter: invert(42%) sepia(95%) saturate(679%) hue-rotate(187deg)
      brightness(91%) contrast(96%);
  }
</style>
