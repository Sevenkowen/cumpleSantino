<template>
  <div v-show="visible" class="initial-loader">
    <BackgroundParticles />
    <div class="loader-content">
      <div class="loader-heart glow-text" ref="heartRef">❤️</div>
      <div class="loader-bar">
        <div class="loader-progress" ref="progressRef" />
      </div>
      <p class="loader-text" ref="textRef">Preparando algo especial...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import BackgroundParticles from './BackgroundParticles.vue'

const emit = defineEmits(['complete'])

const visible = ref(true)
const heartRef = ref(null)
const progressRef = ref(null)
const textRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to('.initial-loader', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          visible.value = false
          emit('complete')
        }
      })
    }
  })

  tl.from(heartRef.value, {
    scale: 0,
    opacity: 0,
    duration: 1,
    ease: 'back.out(2)'
  })
  .from(textRef.value, {
    opacity: 0,
    y: 10,
    duration: 0.6
  }, '-=0.3')
  .to(progressRef.value, {
    width: '100%',
    duration: 1.8,
    ease: 'power2.inOut'
  }, '-=0.2')
})
</script>

<style scoped>
.initial-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0f;
}

.loader-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loader-heart {
  font-size: 4rem;
}

.loader-bar {
  width: 200px;
  height: 3px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  overflow: hidden;
}

.loader-progress {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #e8a0bf, #c9a0dc);
  border-radius: 3px;
}

.loader-text {
  font-size: 0.9rem;
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
}
</style>
