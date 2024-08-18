<template>
  <div
    class="user-resume-entry"
    :class="{ 'user-resume-entry--active': active }"
  >
    <VText class="user-resume-entry__header">{{ title }}</VText>
    <VText
      variant="header"
      :color="{ primary: active }"
      class="user-resume-entry__value"
      >{{ value }}</VText
    >
  </div>
</template>

<script setup>
  import { VText } from '@overgaming/vicius'

  defineProps({
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    }
  })
</script>

<style>
  .user-resume-entry {
    background-color: var(--v-color-surface-high);
    display: grid;
    grid-gap: var(--v-unit-1);
    padding: var(--v-unit-2);
    border-radius: var(--v-unit-2);
    font-size: 16px;
    border: 1px solid var(--v-color-surface);
    cursor: pointer;
  }

  .user-resume-entry--active {
    background-color: var(--v-color-primary);
    color: var(--v-color-surface);
    cursor: inherit;
  }

  .user-resume-entry:hover {
    border: 1px solid var(--v-color-primary);
  }

  .user-resume-entry__value {
    font-size: 32px;
  }
</style>
