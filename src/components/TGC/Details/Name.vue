<template>
  <div
    class="tgc-card-header"
    :class="[`tgc-card-header--${size}`]"
  >
      {{ hasCard ? name : `?` }} 
  </div>
</template>

<script setup>
  const props = defineProps({
    order: {
      type: [Number, String],
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    },
    hasCard: {
      type: Boolean,
      default: false
    }
  })
</script>

<style>
  .tgc-card-header {
    position: absolute;
    background-color: var(--v-color-primary);
    font-weight: 500;
    color: white;
    border-radius: 0 0 5px 0;
    padding: 0 var(--v-unit-2);
  }

  .tgc-card-header--xxs {
    left: 1px;
    top: 1px;
    font-size: 7px;
    line-height: 12px;
  }

  .tgc-card-header--xs {
    left: 2px;
    top: 2px;
    font-size: 8px;
    line-height: 16px;
  }

  .tgc-card-header--md {
    left: 3px;
    top: 3px;
    font-size: 12px;
    line-height: 18px;
  }

  .tgc-card-header--xl {
    top: 6px;
    left: 6px;
    border: 2px solid var(--v-color-primary);
    line-height: 18px;
    font-size: 14px;
  }
</style>
