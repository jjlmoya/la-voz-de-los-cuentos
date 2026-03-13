<template>
  <div class="blog-steps">
    <div v-for="(step, index) in block.items" :key="index" class="blog-steps__item">
      <div class="blog-steps__step-number" :style="{ backgroundColor: getStepColor(index) }">
        {{ index + 1 }}
      </div>
      <div class="blog-steps__step-content">
        <h4 class="blog-steps__title" :style="{ color: getStepColor(index) }">{{ step.title }}</h4>
        <p class="blog-steps__body">{{ step.body }}</p>
      </div>
      <div v-if="index < block.items.length - 1" class="blog-steps__connector"></div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })

  const getStepColor = (index) => {
    const colors = ['#FF8FBC', '#7BB8D4', '#B4E7B8', '#FFD662', '#9C8CB9']
    return colors[index % colors.length]
  }
</script>

<style scoped>
  .blog-steps {
    margin: var(--v-unit-6) 0;
    padding-left: var(--v-unit-2);
  }

  .blog-steps__item {
    display: flex;
    gap: var(--v-unit-5);
    margin-bottom: var(--v-unit-6);
    position: relative;
  }

  .blog-steps__step-number {
    min-width: 54px;
    width: 54px;
    height: 54px;
    border-radius: 18px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 24px;
    flex-shrink: 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transform: rotate(-3deg);
  }

  .blog-steps__step-content {
    flex: 1;
    padding-top: var(--v-unit-1);
  }

  .blog-steps__title {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: 20px;
    font-weight: 800;
  }

  .blog-steps__body {
    margin: 0;
    font-size: 17px;
    color: #4A5568;
    line-height: 1.6;
    font-weight: 500;
  }

  .blog-steps__connector {
    position: absolute;
    left: 27px;
    top: 54px;
    width: 4px;
    height: calc(100% + var(--v-unit-2));
    background-color: #F0F0F0;
    border-radius: 2px;
  }

  .blog-steps__item:last-child {
    margin-bottom: 0;
  }

  .blog-steps__item:last-child .blog-steps__connector {
    display: none;
  }
</style>
