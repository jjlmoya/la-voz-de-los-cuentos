<template>
  <section class="landing-hero">
    <div class="landing-hero__backdrop">
      <div class="backdrop-glow backdrop-glow--1"></div>
      <div class="backdrop-glow backdrop-glow--2"></div>
      <div class="backdrop-glow backdrop-glow--3"></div>
    </div>
    <div class="landing-hero__content">
      <div class="landing-hero__keyword" v-if="keyword">
        <span class="keyword-badge">{{ keyword }}</span>
      </div>
      <h1 class="landing-hero__title">
        {{ title }}
      </h1>
      <div class="shine-effect"></div>
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
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.landing-hero {
  position: relative;
  min-height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--v-unit-8) var(--v-unit-4);
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.05) 0%,
    rgba(168, 85, 247, 0.03) 50%,
    rgba(59, 130, 246, 0.05) 100%
  );
}

.landing-hero__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.backdrop-glow {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: glow-pulse 4s ease-in-out infinite;
  filter: blur(60px);
}

.backdrop-glow--1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #7C3AED, #8B5CF6);
  top: -200px;
  left: -100px;
  animation-delay: 0s;
}

.backdrop-glow--2 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #3B82F6, #60A5FA);
  bottom: -150px;
  right: -50px;
  animation-delay: 1.2s;
}

.backdrop-glow--3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #8B5CF6, #FBBF24);
  top: 50%;
  right: -100px;
  animation-delay: 2.4s;
}

.landing-hero__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--v-unit-5);
  animation: float 3s ease-in-out infinite;
}

.landing-hero__keyword {
  display: flex;
  justify-content: center;
}

.keyword-badge {
  display: inline-block;
  padding: 8px 20px;
  background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
  color: white;
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.keyword-badge:hover {
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.4);
  transform: translateY(-2px);
}

.landing-hero__title {
  font-size: clamp(1.875rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1px;
  margin: 0;
  background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 30%, #3B82F6 60%, #7C3AED 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 8s ease-in-out infinite;
}

.shine-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 3s ease-in-out infinite;
  pointer-events: none;
}

@media (max-width: 768px) {
  .landing-hero {
    min-height: 35vh;
    padding: var(--v-unit-6) var(--v-unit-4);
  }

  .landing-hero__title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  .landing-hero__content {
    gap: var(--v-unit-4);
  }

  .backdrop-glow--1 {
    width: 250px;
    height: 250px;
  }

  .backdrop-glow--2 {
    width: 200px;
    height: 200px;
  }

  .backdrop-glow--3 {
    width: 180px;
    height: 180px;
  }
}
</style>
