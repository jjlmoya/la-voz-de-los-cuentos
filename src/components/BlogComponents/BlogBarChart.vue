<template>
  <div class="blog-barchart">
    <h4 v-if="block.title" class="blog-barchart__title">{{ block.title }}</h4>
    <div class="blog-barchart__container">
      <div v-for="(bar, index) in block.bars" :key="index" class="blog-barchart__bar-group">
        <div class="blog-barchart__label">{{ bar.label }}</div>
        <div class="blog-barchart__bar-wrapper">
          <div
            class="blog-barchart__bar"
            :style="{ width: bar.value + '%', backgroundColor: getColor(bar.color) }"
          >
            <span class="blog-barchart__value">{{ bar.value }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })

  const getColor = (colorName) => {
    const colors = {
      primary: '#FFB3D9',
      secondary: '#A8D8EA',
      success: '#B4E7B8',
      warning: '#FFEAA7',
      danger: '#FFB3D9'
    }
    return colors[colorName] || colors.primary
  }
</script>

<style scoped>
  .blog-barchart {
    margin: var(--v-unit-3) 0;
  }

  .blog-barchart__title {
    margin: 0 0 var(--v-unit-3) 0;
    font-size: 20px;
    font-weight: 700;
    color: #FF6B9D;
  }

  .blog-barchart__container {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-3);
  }

  .blog-barchart__bar-group {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-1);
  }

  .blog-barchart__label {
    font-size: 15px;
    font-weight: 600;
    color: #2D3E50;
  }

  .blog-barchart__bar-wrapper {
    background-color: #F0F0F0;
    border-radius: 8px;
    height: 36px;
    overflow: hidden;
    border: 2px solid #FFEAA7;
  }

  .blog-barchart__bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: var(--v-unit-2);
    animation: slideIn 0.6s ease-out;
  }

  .blog-barchart__value {
    font-size: 14px;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  @keyframes slideIn {
    from {
      width: 0 !important;
    }
  }
</style>
