<template>
  <section class="parchment-section" ref="sectionRef">
    <!-- Animación de despliegue del pergamino -->
    <div class="parchment-scroll" ref="scrollRef">
      <div class="scroll-roll scroll-roll-top" />
      <div class="scroll-roll scroll-roll-bottom" />

      <div class="parchment-body" ref="bodyRef">
        <div class="parchment-texture" aria-hidden="true" />
        <div class="parchment-stain stain-1" aria-hidden="true" />
        <div class="parchment-stain stain-2" aria-hidden="true" />

        <div class="parchment-content" ref="contentRef">
          <p class="parchment-date">{{ letter.date }}</p>

          <h2 class="parchment-salutation" ref="salutationRef" />

          <div class="parchment-divider">
            <span class="divider-ornament">✦</span>
          </div>

          <div class="parchment-paragraphs">
            <p
              v-for="(para, i) in letter.paragraphs"
              :key="i"
              class="parchment-paragraph"
              :class="{ 'is-signature': i === letter.paragraphs.length - 1 && letter.signatureLast }"
              :data-type-text="para"
            />
          </div>

          <p v-if="letter.signature && !letter.signatureLast" class="parchment-signature">
            {{ letter.signature }}
          </p>
        </div>
      </div>
    </div>

    <p class="scroll-hint" ref="hintRef">
      Deslizá hacia abajo para leer la carta...
    </p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from 'src/stores/app'
import { useScrollTyping } from 'src/composables/useScrollAnimations'

gsap.registerPlugin(ScrollTrigger)

const store = useAppStore()
const letter = computed(() => store.data.parchmentLetter)

const sectionRef = ref(null)
const scrollRef = ref(null)
const bodyRef = ref(null)
const contentRef = ref(null)
const salutationRef = ref(null)
const hintRef = ref(null)

useScrollTyping(contentRef, { speed: 14, startAt: 'top 88%' })

onMounted(() => {
  if (salutationRef.value && letter.value.salutation) {
    salutationRef.value.textContent = ''
  }

  const tl = gsap.timeline()

  // Despliegue del pergamino
  tl.from(scrollRef.value, {
    scaleY: 0,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.out',
    transformOrigin: 'top center'
  })
  .from('.scroll-roll-top', {
    scaleX: 0,
    duration: 0.8,
    ease: 'back.out(1.5)'
  }, '-=1')
  .from('.scroll-roll-bottom', {
    scaleX: 0,
    duration: 0.8,
    ease: 'back.out(1.5)'
  }, '-=0.6')
  .from(bodyRef.value, {
    opacity: 0,
    duration: 0.6
  }, '-=0.4')

  // Escribir saludo al terminar despliegue
  .call(() => {
    typeSalutation()
  }, null, '-=0.2')

  // Hint desaparece al scrollear
  gsap.to(hintRef.value, {
    opacity: 0,
    y: -10,
    duration: 0.6,
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 60%',
      toggleActions: 'play none none none'
    }
  })
})

function typeSalutation() {
  const el = salutationRef.value
  const text = letter.value.salutation
  if (!el || !text) return

  el.textContent = ''
  el.classList.add('is-typing')
  let i = 0

  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i]
      i++
      setTimeout(tick, 40)
    } else {
      el.classList.remove('is-typing')
    }
  }
  tick()
}
</script>

<style scoped>
.parchment-section {
  margin: 0 0 48px;
  padding: 0 4px;
}

.parchment-scroll {
  position: relative;
  transform-origin: top center;
}

.scroll-roll {
  height: 18px;
  background: linear-gradient(180deg, #c4a574 0%, #a08050 40%, #8b6914 100%);
  border-radius: 9px;
  box-shadow:
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -3px 6px rgba(0, 0, 0, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.4);
  margin: 0 8px;
  position: relative;
  z-index: 2;
}

.scroll-roll-top {
  margin-bottom: -4px;
}

.scroll-roll-bottom {
  margin-top: -4px;
}

.parchment-body {
  position: relative;
  background: linear-gradient(
    175deg,
    #f7edd5 0%,
    #f0e0b8 25%,
    #e8d5a0 50%,
    #f2e6c8 75%,
    #ebe0c0 100%
  );
  border-left: 3px solid #c9a96e;
  border-right: 3px solid #c9a96e;
  box-shadow:
    inset 0 0 40px rgba(139, 105, 20, 0.12),
    inset 0 0 80px rgba(101, 67, 33, 0.06),
    0 8px 32px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.parchment-texture {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(139, 105, 20, 0.03) 3px,
      rgba(139, 105, 20, 0.03) 4px
    ),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  pointer-events: none;
}

.parchment-stain {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.stain-1 {
  width: 120px;
  height: 80px;
  top: 10%;
  right: -20px;
  background: radial-gradient(ellipse, rgba(139, 105, 20, 0.08) 0%, transparent 70%);
}

.stain-2 {
  width: 90px;
  height: 60px;
  bottom: 15%;
  left: -10px;
  background: radial-gradient(ellipse, rgba(101, 67, 33, 0.1) 0%, transparent 70%);
}

.parchment-content {
  position: relative;
  z-index: 1;
  padding: 28px 24px 32px;
}

.parchment-date {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 0.75rem;
  color: #8b6914;
  text-align: right;
  margin: 0 0 16px;
  font-style: italic;
  opacity: 0.8;
}

.parchment-salutation {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #3d2914;
  margin: 0 0 12px;
  line-height: 1.4;
}

.parchment-salutation.is-typing::after,
.parchment-paragraph.is-typing::after {
  content: '|';
  animation: cursor-blink 0.7s step-end infinite;
  color: #8b4513;
  margin-left: 1px;
}

@keyframes cursor-blink {
  50% { opacity: 0; }
}

.parchment-divider {
  text-align: center;
  margin: 16px 0 20px;
}

.divider-ornament {
  color: #a08050;
  font-size: 0.9rem;
  opacity: 0.6;
}

.parchment-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.parchment-paragraph {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1rem;
  line-height: 1.85;
  color: #3d2914;
  margin: 0;
  min-height: 1.85em;
  text-align: justify;
  hyphens: auto;
}

.parchment-paragraph.is-signature {
  text-align: right;
  font-style: italic;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 8px;
  color: #5c3d1e;
}

.parchment-signature {
  font-family: 'Georgia', 'Times New Roman', serif;
  text-align: right;
  font-style: italic;
  font-size: 1.05rem;
  color: #5c3d1e;
  margin: 24px 0 0;
}

.scroll-hint {
  text-align: center;
  font-size: 0.8rem;
  color: rgba(240, 230, 239, 0.45);
  margin: 16px 0 0;
  animation: hint-pulse 2s ease-in-out infinite;
}

@keyframes hint-pulse {
  0%, 100% { opacity: 0.45; transform: translateY(0); }
  50% { opacity: 0.7; transform: translateY(3px); }
}
</style>
