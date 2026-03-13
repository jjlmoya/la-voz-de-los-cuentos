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
    gap: var(--v-unit-4);
    margin: var(--v-unit-6) 0;
  }

  .blog-stats__card {
    background: white;
    padding: var(--v-unit-6) var(--v-unit-4);
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 4px solid #FFD4E5;
    position: relative;
    overflow: hidden;
  }

  .blog-stats__card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: #FFB3D9;
  }

  .blog-stats__card:nth-child(2) { border-color: #D0E8F2; }
  .blog-stats__card:nth-child(2)::before { background: #A8D8EA; }

  .blog-stats__card:nth-child(3) { border-color: #FFF5D0; }
  .blog-stats__card:nth-child(3)::before { background: #FFEAA7; }

  .blog-stats__card:nth-child(4) { border-color: #D9F0DC; }
  .blog-stats__card:nth-child(4)::before { background: #B4E7B8; }

  .blog-stats__card:hover {
    transform: translateY(-8px) rotate(1deg);
  }

  .blog-stats__value {
    font-size: 52px;
    font-weight: 900;
    line-height: 1;
    margin-bottom: var(--v-unit-2);
    color: #4A5568;
  }

  .blog-stats__label {
    font-size: 15px;
    line-height: 1.4;
    font-weight: 700;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
</style>
