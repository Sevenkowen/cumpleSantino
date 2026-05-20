<template>
  <div class="floating-leaves" aria-hidden="true">
    <span
      v-for="leaf in leaves"
      :key="leaf.id"
      class="leaf"
      :style="leaf.style"
    >🍃</span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  active: { type: Boolean, default: true }
})

const leaves = ref([])

onMounted(() => {
  leaves.value = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 12 + 14}px`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${Math.random() * 8 + 10}s`,
      opacity: Math.random() * 0.5 + 0.3
    }
  }))
})
</script>

<style scoped>
.floating-leaves {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.leaf {
  position: absolute;
  top: -40px;
  animation: leaf-fall linear infinite;
  filter: hue-rotate(20deg);
}

@keyframes leaf-fall {
  0% {
    transform: translateY(0) rotate(0deg) translateX(0);
    opacity: 0;
  }
  10% { opacity: 0.7; }
  90% { opacity: 0.5; }
  100% {
    transform: translateY(110vh) rotate(720deg) translateX(80px);
    opacity: 0;
  }
}
</style>
