<template>
  <div class="blog-table-wrapper">
    <table class="blog-table">
      <thead>
        <tr>
          <th v-for="(header, index) in block.headers" :key="index" class="blog-table__header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex" class="blog-table__row" :class="{ 'blog-table__row--alt': rowIndex % 2 === 1 }">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="blog-table__cell">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-table-wrapper {
    overflow-x: auto;
    margin: var(--v-unit-3) 0;
    border-radius: 12px;
  }

  .blog-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border: 2px solid #FFB3D9;
    box-shadow: 0 4px 12px rgba(255, 107, 157, 0.15);
    border-radius: 8px;
    overflow: hidden;
  }

  .blog-table__header {
    background: linear-gradient(135deg, #FFB3D9 0%, #FF8FC7 100%);
    color: #2D3E50;
    padding: var(--v-unit-3);
    text-align: left;
    font-weight: 700;
    font-size: 15px;
  }

  .blog-table__row {
    border-bottom: 1px solid #FFE4F0;
  }

  .blog-table__row--alt {
    background-color: #FFF5FB;
  }

  .blog-table__cell {
    padding: var(--v-unit-3);
    color: #2D3E50;
    font-size: 15px;
    font-weight: 500;
  }
</style>
