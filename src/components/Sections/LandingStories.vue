<template>
  <div class="sections-landing">
    <BasicCard
      v-for="_story in stories"
      :slug="_story.key"
      :key="_story.key"
      :title="_story.name"
      :time="parseInt(_story.time)"
      isStory
    />
  </div>
</template>

<script setup>
  import BasicCard from '../Cards/Basic.vue'
  import useLanding from '../../composables/useLanding'
  const props = defineProps({
    landing: {
      default: {},
      type: Object
    }
  })
  const { getStories } = useLanding(props.landing)
  const stories = getStories()
</script>

<style scoped>
  .sections-landing {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--v-unit-8);
    padding: 0;
  }

  @media (max-width: 480px) {
    .sections-landing {
      grid-template-columns: 1fr;
      gap: var(--v-unit-6);
    }
  }

  @media (min-width: 768px) {
    .sections-landing {
      grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
      gap: var(--v-unit-12);
    }
  }

  @media (min-width: 1024px) {
    .sections-landing {
      grid-template-columns: repeat(auto-fit, minmax(520px, 1fr));
      gap: var(--v-unit-12);
    }
  }

  @media (min-width: 1200px) {
    .sections-landing {
      grid-template-columns: repeat(auto-fit, minmax(580px, 1fr));
      gap: var(--v-unit-12);
    }
  }
</style>
