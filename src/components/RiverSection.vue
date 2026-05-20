<template>
  <section class="river-section reveal-item" ref="sectionRef">
    <div class="river-bg">
      <div class="stadium-lights" />
      <div class="river-shield">
        <span class="shield-text">CAP</span>
        <span class="shield-sub">RIVER</span>
      </div>
    </div>

    <div class="river-content glass-strong">
      <div class="river-badge">⚽ {{ river.emoji }}</div>
      <h3 class="river-title">{{ river.title }}</h3>
      <p class="river-tagline">{{ river.tagline }}</p>
      <div class="river-stripes">
        <span v-for="i in 5" :key="i" class="stripe" />
      </div>
      <p class="river-message">
        Rojo y blanco, pasión sin fin. Sos hincha de corazón, Santino.
        Como en el Monumental, en la vida das todo hasta el final.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from 'src/stores/app'
import { fireRiverConfetti } from 'src/utils/effects'

gsap.registerPlugin(ScrollTrigger)

const store = useAppStore()
const river = computed(() => store.data.river || {})
const sectionRef = ref(null)
let confettiFired = false

onMounted(() => {
  if (!sectionRef.value) return

  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 70%',
    onEnter: () => {
      if (!confettiFired) {
        confettiFired = true
        fireRiverConfetti()
      }
    },
    once: true
  })

  gsap.from('.stadium-lights', {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 80%'
    },
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.river-section {
  position: relative;
  margin: 40px 0;
  overflow: hidden;
  border-radius: 24px;
}

.river-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 24px;
}

.stadium-lights {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(237, 28, 36, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 0%, rgba(237, 28, 36, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
  animation: lights-pulse 3s ease-in-out infinite;
}

@keyframes lights-pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.river-shield {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.06;
  text-align: center;
  pointer-events: none;
}

.shield-text {
  display: block;
  font-size: 5rem;
  font-weight: 900;
  color: #ed1c24;
  letter-spacing: 8px;
  line-height: 1;
}

.shield-sub {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 12px;
}

.river-content {
  position: relative;
  z-index: 1;
  padding: 32px 24px;
  text-align: center;
  border: 1px solid rgba(237, 28, 36, 0.2);
}

.river-badge {
  font-size: 2rem;
  margin-bottom: 8px;
}

.river-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px;
  background: linear-gradient(135deg, #ed1c24, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.river-tagline {
  font-size: 0.85rem;
  opacity: 0.6;
  margin: 0 0 16px;
}

.river-stripes {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 16px;
}

.stripe {
  width: 24px;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, #ed1c24, #fff);
}

.river-message {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.85;
  margin: 0;
}
</style>
