<template>
  <section class="landing-hero">
    <div class="landing-hero__backdrop"></div>
    <div class="landing-hero__content">
      <div class="landing-hero__keyword" v-if="keyword">
        <span class="keyword-badge">{{ keyword }}</span>
      </div>
      <h1 class="landing-hero__title">
        {{ title }}
      </h1>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.landing-hero {
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--v-unit-8) var(--v-unit-4);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.08) 0%,
    rgba(168, 85, 247, 0.08) 100%
  );
}

.landing-hero__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.landing-hero__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-4);
}

.landing-hero__keyword {
  display: flex;
  justify-content: center;
}

.keyword-badge {
  display: inline-block;
  padding: var(--v-unit-1) var(--v-unit-3);
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: capitalize;
}

.landing-hero__title {
  font-size: clamp(1.875rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--v-color-text);
  margin: 0;
}

@media (max-width: 768px) {
  .landing-hero {
    min-height: 35vh;
    padding: var(--v-unit-6) var(--v-unit-4);
  }

  .landing-hero__title {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
  }
}
</style>
