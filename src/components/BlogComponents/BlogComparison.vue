<template>
  <div class="blog-comparison">
    <div class="blog-comparison__column blog-comparison__column--left">
      <h4 class="blog-comparison__title">{{ block.left.title }}</h4>
      <ul class="blog-comparison__list">
        <li v-for="(item, index) in block.left.items" :key="index" class="blog-comparison__item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="blog-comparison__column blog-comparison__column--right">
      <h4 class="blog-comparison__title">{{ block.right.title }}</h4>
      <ul class="blog-comparison__list">
        <li v-for="(item, index) in block.right.items" :key="index" class="blog-comparison__item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--v-unit-6);
    margin: var(--v-unit-6) 0;
  }

  @media (max-width: 768px) {
    .blog-comparison {
      grid-template-columns: 1fr;
    }
  }

  .blog-comparison__column {
    padding: var(--v-unit-5);
    border-radius: 24px;
    border: 3px solid;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
  }

  .blog-comparison__column--left {
    background-color: #FFF5FB;
    border-color: #FFD4E5;
  }

  .blog-comparison__column--right {
    background-color: #F0FFF4;
    border-color: #C6F6D5;
  }

  .blog-comparison__title {
    margin: 0 0 var(--v-unit-3) 0;
    font-size: 19px;
    font-weight: 800;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .blog-comparison__column--left .blog-comparison__title {
    color: #D53F8C;
  }

  .blog-comparison__column--right .blog-comparison__title {
    color: #2F855A;
  }

  .blog-comparison__list {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }

  .blog-comparison__item {
    margin-bottom: var(--v-unit-2);
    padding-left: var(--v-unit-6);
    position: relative;
    font-size: 16px;
    color: #4A5568;
    line-height: 1.5;
    font-weight: 600;
  }

  .blog-comparison__item::before {
    content: '✨';
    position: absolute;
    left: 0;
    font-size: 16px;
  }

  .blog-comparison__item:last-child {
    margin-bottom: 0;
  }
</style>
