<template>
  <div class="floating-stars" aria-hidden="true">
    <span
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="star.style"
    >✦</span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const stars = ref([])

onMounted(() => {
  stars.value = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 8 + 6}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      color: ['#ffd700', '#ff6b2b', '#4a90d9', '#e8a0bf'][Math.floor(Math.random() * 4)]
    }
  }))
})
</script>

<style scoped>
.floating-stars {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.star {
  position: absolute;
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
</style>
