<template>
  <div v-if="visible" class="chakra-burst" ref="burstRef" aria-hidden="true">
    <div class="chakra-ring ring-1" />
    <div class="chakra-ring ring-2" />
    <div class="chakra-ring ring-3" />
    <div class="chakra-core" />
    <div
      v-for="i in 12"
      :key="i"
      class="chakra-spark"
      :style="{ '--angle': `${i * 30}deg` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const visible = ref(true)
const burstRef = ref(null)

onMounted(() => {
  const el = burstRef.value
  if (!el) return

  gsap.fromTo(el, { scale: 0, opacity: 1 }, {
    scale: 3,
    opacity: 0,
    duration: 1.8,
    ease: 'power2.out',
    onComplete: () => { visible.value = false }
  })

  gsap.from('.chakra-ring', {
    scale: 0,
    opacity: 0.8,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power2.out'
  })

  gsap.from('.chakra-spark', {
    scale: 0,
    opacity: 1,
    stagger: 0.05,
    duration: 0.6,
    ease: 'back.out(2)'
  })
})
</script>

<style scoped>
.chakra-burst {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.chakra-core {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffd700 0%, #ff6b2b 50%, transparent 70%);
  box-shadow: 0 0 60px #ff6b2b, 0 0 120px #4a90d9;
}

.chakra-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid;
}

.ring-1 {
  width: 120px;
  height: 120px;
  border-color: rgba(255, 107, 43, 0.6);
  box-shadow: 0 0 30px rgba(255, 107, 43, 0.4);
}

.ring-2 {
  width: 180px;
  height: 180px;
  border-color: rgba(74, 144, 217, 0.5);
  box-shadow: 0 0 40px rgba(74, 144, 217, 0.3);
}

.ring-3 {
  width: 240px;
  height: 240px;
  border-color: rgba(255, 215, 0, 0.3);
}

.chakra-spark {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ffd700;
  border-radius: 50%;
  transform: rotate(var(--angle)) translateY(-100px);
  box-shadow: 0 0 10px #ff6b2b;
}
</style>
