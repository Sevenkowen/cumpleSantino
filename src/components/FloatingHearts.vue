<template>
  <div class="floating-hearts" aria-hidden="true">
    <span
      v-for="heart in hearts"
      :key="heart.id"
      class="heart"
      :style="heart.style"
    >❤️</span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    default: 12
  },
  active: {
    type: Boolean,
    default: true
  }
})

const hearts = ref([])

onMounted(() => {
  if (!props.active) return

  hearts.value = Array.from({ length: props.count }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 14 + 10}px`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${Math.random() * 6 + 8}s`,
      opacity: Math.random() * 0.4 + 0.2
    }
  }))
})
</script>

<style scoped>
.floating-hearts {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.heart {
  position: absolute;
  bottom: -40px;
  animation: float-up linear infinite;
  filter: blur(0.3px);
}

@keyframes float-up {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0;
  }
  10% {
    opacity: var(--opacity, 0.5);
  }
  90% {
    opacity: var(--opacity, 0.5);
  }
  100% {
    transform: translateY(-110vh) rotate(360deg) scale(0.6);
    opacity: 0;
  }
}
</style>
