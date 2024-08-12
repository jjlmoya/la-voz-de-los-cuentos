<template>
  <div class="navigation-layout">
    <div class="navigation-layout__mobile">
      <button class="navigation-layout__btn" @click="toggle" aria-label="Boton para abrir menú">
        <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" fill="none">
          <path d="M20 7L4 7" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M20 12L4 12" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M20 17L4 17" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <div
      class="navigation-layout__nav"
      :class="{ 'navigation-layout__nav--open': isOpen }"
    >
      <div class="navigation-layout__inner">
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </div>
    </div>

    <div class="navigation-layout__content">
      <slot />
      <Footer />
    </div>

      <div
        class="navigation-layout__backdrop"
        :class="{
          'navigation-layout__backdrop--visible': isOpen
        }"
        @click="toggle"
      />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import MenuContainer from '../components/Menu/MenuContainer.vue'
  import Menu from '../components/Menu/Menu.vue'
  import Footer from '../components/commons/Footer.vue'
  const isOpen = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }
</script>

<style scoped>
  .navigation-layout {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;

    @media (width >= 1360px) {
      grid-template-rows: 1fr;
      grid-template-columns: auto 1fr;
    }
  }

  .navigation-layout__mobile {
    display: flex;
    align-items: center;
    position: sticky;
    inset-block-start: 0;
    inset-inline-start: 0;
    width: 100vw;
    height: var(--v-unit-16);
    z-index: calc(var(--v-z-index-knight) - 2);
    background-color: var(--v-color-surface-high);

    @media (width >= 1360px) {
      display: none;
    }
  }

  .navigation-layout__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--v-unit-16);
    min-height: var(--v-unit-16);
  }

  .navigation-layout__nav {
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    height: 100dvh;
    transform: translateX(-100%);
    transition: var(--v-duration-slow) var(--v-easing-standard);
    transition-property: transform;
    display: grid;
    grid-template-columns: 1fr;
    z-index: var(--v-z-index-knight);
    background-color: var(--v-color-surface-low);

    @media (width >= 1360px) {
      transform: translateX(0%);
      position: sticky;
      grid-row: 1/-1;
    }
  }

  .navigation-layout__nav--open {
    transform: translateX(0);
  }

  .navigation-layout__inner {
    display: grid;
    grid-template-columns: 1fr;
    width: 288px;

    @media (width < 1360px) {
      box-shadow: var(--v-elevation);
    }
  }

  .navigation-layout__close {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--v-unit-3);

    @media (width >= 1360px) {
      display: none;
    }
  }

  .navigation-layout__content {
    position: relative;
    z-index: calc(var(--v-z-index-knight) - 3);
    container-type: inline-size;
  }

  .navigation-layout__backdrop {
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    height: 100%;
    width: 0;
    background-color: var(--v-color-backdrop);
    z-index: calc(var(--v-z-index-knight) - 1);
    pointer-events: none;
    opacity: 0;
    transition: var(--v-duration-fast) var(--v-easing-standard);
    transition-property: background-color, opacity;
  }

  .navigation-layout__backdrop--visible {
    @media (width < 1360px) {
      pointer-events: auto;
      width: 100%;
      opacity: 1;
    }
  }
</style>

<style>
  body {
    &:has(.navigation-layout__nav--open) {
      overflow-y: hidden;
    }
  }
</style>
