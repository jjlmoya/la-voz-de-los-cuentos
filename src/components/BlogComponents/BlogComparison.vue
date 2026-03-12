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
    <div class="blog-comparison__divider"></div>
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
    grid-template-columns: 1fr auto 1fr;
    gap: var(--v-unit-3);
    margin: var(--v-unit-3) 0;
  }

  @media (max-width: 768px) {
    .blog-comparison {
      grid-template-columns: 1fr;
      gap: var(--v-unit-4);
    }
  }

  .blog-comparison__column {
    padding: var(--v-unit-3);
    border-radius: 12px;
    border: 3px solid;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .blog-comparison__column--left {
    background: linear-gradient(135deg, #FFE4F0 0%, #FFF5FB 100%);
    border-color: #FFB3D9;
  }

  .blog-comparison__column--right {
    background: linear-gradient(135deg, #EFF9F0 0%, #F5FDF9 100%);
    border-color: #B4E7B8;
  }

  .blog-comparison__title {
    margin: 0 0 var(--v-unit-2) 0;
    font-size: 17px;
    font-weight: 700;
    color: #2D3E50;
  }

  .blog-comparison__column--left .blog-comparison__title {
    color: #FF6B9D;
  }

  .blog-comparison__column--right .blog-comparison__title {
    color: #2D8B3E;
  }

  .blog-comparison__list {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }

  .blog-comparison__item {
    margin-bottom: var(--v-unit-1);
    padding-left: var(--v-unit-3);
    position: relative;
    font-size: 15px;
    color: #2D3E50;
    line-height: 1.6;
    font-weight: 500;
  }

  .blog-comparison__item:before {
    content: '★';
    position: absolute;
    left: 0;
    color: #FFB3D9;
    font-size: 14px;
  }

  .blog-comparison__column--right .blog-comparison__item:before {
    color: #B4E7B8;
  }

  .blog-comparison__item:last-child {
    margin-bottom: 0;
  }

  .blog-comparison__divider {
    width: 3px;
    background: linear-gradient(180deg, #FFB3D9 0%, #B4E7B8 50%, #A8D8EA 100%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    .blog-comparison__divider {
      display: none;
    }
  }
</style>
