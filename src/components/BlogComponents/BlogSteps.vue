<template>
  <div class="blog-steps">
    <div v-for="(step, index) in block.items" :key="index" class="blog-steps__item">
      <div class="blog-steps__step-number">{{ index + 1 }}</div>
      <div class="blog-steps__step-content">
        <h4 class="blog-steps__title">{{ step.title }}</h4>
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
</script>

<style scoped>
  .blog-steps {
    margin: var(--v-unit-3) 0;
  }

  .blog-steps__item {
    display: flex;
    gap: var(--v-unit-3);
    margin-bottom: var(--v-unit-3);
    position: relative;
  }

  .blog-steps__step-number {
    min-width: 48px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FFB3D9 0%, #FF8FC7 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
  }

  .blog-steps__step-content {
    flex: 1;
    padding-top: var(--v-unit-1);
  }

  .blog-steps__title {
    margin: 0 0 var(--v-unit-1) 0;
    font-size: 17px;
    font-weight: 700;
    color: #FF6B9D;
  }

  .blog-steps__body {
    margin: 0;
    font-size: 15px;
    color: #2D3E50;
    line-height: 1.6;
    font-weight: 500;
  }

  .blog-steps__connector {
    position: absolute;
    left: 24px;
    top: 48px;
    width: 3px;
    height: calc(100% + var(--v-unit-3));
    background: linear-gradient(180deg, #FFB3D9 0%, rgba(255, 179, 217, 0.3) 100%);
  }

  .blog-steps__item:last-child .blog-steps__connector {
    display: none;
  }
</style>
