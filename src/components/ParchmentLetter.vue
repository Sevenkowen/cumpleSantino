<template>
  <section class="parchment-section" ref="sectionRef">
    <div class="parchment-scroll" ref="scrollRef">
      <div class="scroll-roll scroll-roll-top" ref="rollTopRef" />

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
        </div>
      </div>

      <div class="scroll-roll scroll-roll-bottom" />
    </div>

    <p class="scroll-hint" ref="hintRef">
      ↓ Deslizá para seguir leyendo
    </p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from 'src/stores/app'
import { useScrollTyping } from 'src/composables/useScrollAnimations'

gsap.registerPlugin(ScrollTrigger)

const store = useAppStore()
const letter = computed(() => store.data.parchmentLetter || { paragraphs: [], salutation: '', date: '' })

const sectionRef = ref(null)
const scrollRef = ref(null)
const bodyRef = ref(null)
const contentRef = ref(null)
const salutationRef = ref(null)
const hintRef = ref(null)
const rollTopRef = ref(null)

useScrollTyping(contentRef, { speed: 12, startAt: 'top 92%', autoStartFirst: true })

onMounted(async () => {
  await nextTick()

  if (!scrollRef.value) return

  // Entrada suave — sin scaleY:0 que ocultaba el pergamino
  gsap.fromTo(scrollRef.value,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  )

  if (rollTopRef.value) {
    gsap.fromTo(rollTopRef.value,
      { scaleX: 0.3, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.5)', delay: 0.2 }
    )
  }

  gsap.fromTo(bodyRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.8, delay: 0.3 }
  )

  // Escribir saludo tras desplegar
  setTimeout(() => typeSalutation(), 600)

  if (hintRef.value) {
    gsap.to(hintRef.value, {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 50%',
        once: true
      }
    })
  }

  ScrollTrigger.refresh()
})

function typeSalutation() {
  const text = letter.value.salutation
  const el = salutationRef.value
  if (!el || !text) return

  el.textContent = ''
  el.classList.add('is-typing')
  let i = 0

  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i]
      i++
      setTimeout(tick, 35)
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
  padding: 0 2px;
  opacity: 1;
  visibility: visible;
}

.parchment-scroll {
  position: relative;
}

.scroll-roll {
  height: 16px;
  background: linear-gradient(180deg, #c4a574 0%, #a08050 40%, #8b6914 100%);
  border-radius: 8px;
  box-shadow:
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -3px 6px rgba(0, 0, 0, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.4);
  margin: 0 6px;
  position: relative;
  z-index: 2;
}

.scroll-roll-top {
  margin-bottom: -3px;
}

.scroll-roll-bottom,
.parchment-scroll > .scroll-roll-bottom:last-child {
  margin-top: -3px;
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
    0 8px 32px rgba(0, 0, 0, 0.35);
  min-height: 200px;
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
    );
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
  padding: 24px 20px 28px;
}

.parchment-date {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.75rem;
  color: #8b6914;
  text-align: right;
  margin: 0 0 14px;
  font-style: italic;
}

.parchment-salutation {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #3d2914;
  margin: 0 0 10px;
  line-height: 1.4;
  min-height: 1.4em;
}

.parchment-salutation.is-typing::after,
.parchment-paragraph.is-typing::after {
  content: '|';
  animation: cursor-blink 0.7s step-end infinite;
  color: #8b4513;
}

@keyframes cursor-blink {
  50% { opacity: 0; }
}

.parchment-divider {
  text-align: center;
  margin: 12px 0 18px;
}

.divider-ornament {
  color: #a08050;
  font-size: 0.85rem;
  opacity: 0.6;
}

.parchment-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.parchment-paragraph {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.98rem;
  line-height: 1.85;
  color: #3d2914;
  margin: 0;
  min-height: 2.5em;
  text-align: justify;
}

.parchment-paragraph.is-signature {
  text-align: right;
  font-style: italic;
  font-weight: 600;
  font-size: 1.05rem;
  margin-top: 6px;
  color: #5c3d1e;
}

.scroll-hint {
  text-align: center;
  font-size: 0.78rem;
  color: rgba(240, 230, 239, 0.5);
  margin: 14px 0 0;
  animation: hint-pulse 2s ease-in-out infinite;
}

@keyframes hint-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.85; }
}
</style>
