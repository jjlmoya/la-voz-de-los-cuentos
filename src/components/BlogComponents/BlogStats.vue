<template>
  <div class="blog-stats">
    <div v-for="(stat, index) in block.items" :key="index" class="blog-stats__card">
      <div class="blog-stats__value">{{ stat.value }}</div>
      <div class="blog-stats__label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--v-unit-3);
    margin: var(--v-unit-3) 0;
  }

  .blog-stats__card {
    background: linear-gradient(135deg, #FFB3D9 0%, #FFD4E5 100%);
    color: #2D3E50;
    padding: var(--v-unit-4);
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 6px 16px rgba(255, 107, 157, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 3px solid #FF8FC7;
  }

  .blog-stats__card:nth-child(2) {
    background: linear-gradient(135deg, #A8D8EA 0%, #D0E8F2 100%);
    border-color: #6DBBDB;
    box-shadow: 0 6px 16px rgba(106, 187, 219, 0.25);
  }

  .blog-stats__card:nth-child(3) {
    background: linear-gradient(135deg, #FFEAA7 0%, #FFF5D0 100%);
    border-color: #FFD662;
    box-shadow: 0 6px 16px rgba(255, 198, 0, 0.25);
  }

  .blog-stats__card:nth-child(4) {
    background: linear-gradient(135deg, #B4E7B8 0%, #D9F0DC 100%);
    border-color: #7DD47D;
    box-shadow: 0 6px 16px rgba(125, 212, 125, 0.25);
  }

  .blog-stats__card:hover {
    transform: translateY(-6px) scale(1.05);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  }

  .blog-stats__value {
    font-size: 56px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: var(--v-unit-1);
  }

  .blog-stats__label {
    font-size: 14px;
    line-height: 1.3;
    font-weight: 600;
    color: #2D3E50;
  }
</style>
