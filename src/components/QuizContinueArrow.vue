<template>
  <div class="quiz-arrow-section reveal-item" ref="arrowRef">
    <div class="arrow-line" />
    <div class="arrow-bounce">↓</div>
    <p class="arrow-text">¡Esto sigue!</p>
    <p class="arrow-sub">Hay algo más esperándote...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const arrowRef = ref(null)

onMounted(() => {
  if (!arrowRef.value) return
  gsap.from(arrowRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: arrowRef.value, start: 'top 90%', once: true }
  })
  gsap.to('.arrow-bounce', {
    y: 8,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})
</script>

<style scoped>
.quiz-arrow-section {
  text-align: center;
  margin: 28px auto 8px;
  padding: 16px 0;
}

.arrow-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(180deg, transparent, #e8a0bf, transparent);
  margin: 0 auto 8px;
}

.arrow-bounce {
  font-size: 2rem;
  color: #e8a0bf;
  line-height: 1;
  margin-bottom: 8px;
}

.arrow-text {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 4px;
  background: linear-gradient(135deg, #ff6b2b, #e8a0bf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.arrow-sub {
  font-size: 0.85rem;
  opacity: 0.5;
  margin: 0;
}
</style>
