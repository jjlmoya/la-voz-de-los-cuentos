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
        <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex" class="blog-table__row">
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
    margin: var(--v-unit-6) 0;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .blog-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border: 2px solid #E2E8F0;
  }

  .blog-table__header {
    background-color: #F7FAFC;
    color: #4A5568;
    padding: var(--v-unit-4);
    text-align: left;
    font-weight: 800;
    font-size: 16px;
    border-bottom: 3px solid #E2E8F0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .blog-table__row {
    border-bottom: 1px solid #EDF2F7;
    transition: background-color 0.2s ease;
  }

  .blog-table__row:hover {
    background-color: #FFF5FB;
  }

  .blog-table__cell {
    padding: var(--v-unit-4);
    color: #4A5568;
    font-size: 16px;
    font-weight: 500;
  }
</style>
