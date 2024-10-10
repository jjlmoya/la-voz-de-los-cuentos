<template>
  <div
    v-if="name"
    class="tgc-card__header"
    :class="[`tgc-card__header--${size}`]"
  >
    {{ name }}
  </div>
</template>

<script setup>
  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    }
  })
</script>

<style>
  .tgc-card__header {
    position: absolute;
    background-color: var(--v-color-primary);
    font-weight: 500;
    color: white;
    border-radius: 0 0 5px 0;
  }

  .tgc-card__header--xxs {
    left: 1px;
    top: 1px;
    border: 1px solid var(--v-color-primary);
    padding: 0 var(--v-unit-1);
    font-size: 8px;
    line-height: 12px;
  }

  .tgc-card--xs {
    left: 2px;
    top: 2px;
    border: 1px solid var(--v-color-primary);
    padding: 0 var(--v-unit-1);
    font-size: 10px;
    line-height: 16px;
  }

  .tgc-card__header--md {
    left: 2px;
    top: 2px;
    border: 2px solid var(--v-color-primary);
    padding: 0 var(--v-unit-1);
    font-size: 12px;
    line-height: 18px;
  }

  .tgc-card__header--xl {
    top: 5px;
    left: 5px;
    padding: var(--v-unit-1) var(--v-unit-2);
    border: 2px solid var(--v-color-primary);
    line-height: 18px;
    font-size: 14px;
  }
</style>
