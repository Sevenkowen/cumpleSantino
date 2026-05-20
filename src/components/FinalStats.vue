<template>
  <section class="final-stats reveal-item" ref="statsRef">
    <div class="stats-glow" />

    <h2 class="stats-hero">🏆 {{ recipientName }}</h2>

    <div class="stats-grid">
      <div
        v-for="(item, i) in stats"
        :key="i"
        class="stat-card glass"
        :style="{ animationDelay: `${i * 0.15}s` }"
      >
        <span class="stat-emoji">{{ item.emoji }}</span>
        <p class="stat-name">{{ item.name }}</p>
        <p class="stat-value">{{ item.stat }}</p>
      </div>
    </div>

    <button class="btn-premium replay-btn" @click="handleReplay">
      {{ replayText }}
    </button>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from 'src/stores/app'
import { useSound } from 'src/composables/useAudio'
import { fireConfetti } from 'src/utils/effects'

gsap.registerPlugin(ScrollTrigger)

const store = useAppStore()
const { play } = useSound()

const statsRef = ref(null)
const stats = computed(() => store.data.finalStats || [])
const recipientName = computed(() => store.data.recipientName)
const replayText = computed(() => store.data.replayButtonText)

const emit = defineEmits(['replay'])

function handleReplay() {
  if (store.data.sounds?.enabled) {
    play(store.data.sounds.buttonTap, 0.4)
  }
  emit('replay')
}

onMounted(() => {
  if (!statsRef.value) return

  gsap.from('.stat-card', {
    scrollTrigger: {
      trigger: statsRef.value,
      start: 'top 75%'
    },
    opacity: 0,
    y: 40,
    scale: 0.9,
    stagger: 0.15,
    duration: 0.7,
    ease: 'back.out(1.5)',
    onComplete: () => fireConfetti()
  })
})
</script>

<style scoped>
.final-stats {
  position: relative;
  text-align: center;
  padding: 40px 0 60px;
  overflow: hidden;
}

.stats-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(232,160,191,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.stats-hero {
  font-size: clamp(1.8rem, 6vw, 2.4rem);
  font-weight: 700;
  margin: 0 0 32px;
  background: linear-gradient(135deg, #ffd700, #ff6b2b, #e8a0bf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.stat-card {
  padding: 20px;
  animation: stat-pop 0.6s ease backwards;
}

@keyframes stat-pop {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
}

.stat-emoji {
  font-size: 2rem;
  display: block;
  margin-bottom: 8px;
}

.stat-name {
  font-size: 0.85rem;
  opacity: 0.6;
  margin: 0 0 4px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(135deg, #e8a0bf, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.replay-btn {
  width: 100%;
  max-width: 320px;
}
</style>
