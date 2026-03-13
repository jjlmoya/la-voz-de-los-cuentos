<template>
  <div class="blog-quote">
    <div class="blog-quote__icon">“</div>
    <p class="blog-quote__text">{{ block.text }}</p>
    <footer v-if="block.author" class="blog-quote__author">— {{ block.author }}</footer>
  </div>
</template>

<script setup>
  defineProps({
    block: { type: Object, required: true }
  })
</script>

<style scoped>
  .blog-quote {
    margin: var(--v-unit-6) 0;
    padding: var(--v-unit-6);
    background: #F7FAFC;
    border-radius: 30px;
    position: relative;
    text-align: center;
    border: 2px dashed #E2E8F0;
  }

  .blog-quote__icon {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: #A8D8EA;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-family: serif;
    line-height: 1;
    padding-top: 10px;
    box-shadow: 0 4px 10px rgba(168, 216, 234, 0.4);
  }

  .blog-quote__text {
    margin: 0 0 var(--v-unit-3) 0;
    font-size: 22px;
    line-height: 1.5;
    font-weight: 700;
    color: #4A5568;
    font-style: italic;
  }

  .blog-quote__author {
    margin: 0;
    font-size: 15px;
    color: #718096;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
</style>
