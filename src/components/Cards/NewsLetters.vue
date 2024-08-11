<template>
    <a class="newsletter-card" :href="`/newsletter/${newsletter.id}/`">
        <VText ellipsis class="plan-card__element">{{ newsletter.title }}</VText>
    </a>
</template>

<script setup>
import { VText } from '@overgaming/vicius';
defineProps({
    newsletter: {
        type: Object,
        default: {}
    }
})
</script>

<style scoped>
    .newsletter-card {
        display: grid;
        grid-template-columns: 4fr 2fr 50px;
        padding: var(--v-unit-2);
        border-radius: var(--v-unit-2);
        grid-gap: var(--v-unit-8);
    }

    .newsletter-card:nth-child(even) {
        background-color: var(--v-color-surface-mod);
     }
</style>