<template>
    <a class="plain-card" :href="`/cuento/${story.key}/`">
        <VText ellipsis class="plan-card__element">{{ story.name }}</VText>
        <VText ellipsis class="plan-card__element">{{ saga }}</VText>
        <VText ellipsis class="plan-card__element">{{ time }}</VText>
    </a>
</template>

<script setup>
import { VText } from '@overgaming/vicius'
import useStory from '../../composables/useStory'
const props = defineProps({
    story:{
        type: Object,
        default: {}
    }
})

const { getTime, getSaga } = useStory(props.story)
const time = getTime()
const saga = getSaga()
</script>

<style scoped>
    .plain-card {
        display: grid;
        grid-template-columns: 4fr 2fr 50px;
        padding: var(--v-unit-2);
        border-radius: var(--v-unit-2);
        grid-gap: var(--v-unit-8);
    }

    .plain-card:nth-child(even) {
        background-color: var(--v-color-surface-mod);
     }
</style>