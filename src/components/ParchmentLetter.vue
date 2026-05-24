<template>
  <section class="parchment-section" ref="sectionRef">
    <div class="parchment-scroll" ref="scrollRef">
      <div class="scroll-roll scroll-roll-top" ref="rollTopRef" />

      <div class="parchment-body" ref="bodyRef">
        <div class="parchment-texture" aria-hidden="true" />
        <div class="parchment-stain stain-1" aria-hidden="true" />
        <div class="parchment-stain stain-2" aria-hidden="true" />

        <!-- Líneas de cuaderno sutiles -->
        <div class="parchment-lines" aria-hidden="true" />

        <div class="parchment-content" ref="contentRef">
          <p class="parchment-date">{{ letter.date }}</p>

          <h2 class="parchment-salutation handwriting" ref="salutationRef" />

          <div class="parchment-divider">
            <span class="divider-ornament">✦</span>
          </div>

          <div class="parchment-paragraphs">
            <p
              v-for="(para, i) in letter.paragraphs"
              :key="i"
              class="parchment-paragraph handwriting"
              :class="{ 'is-signature': i === letter.paragraphs.length - 1 && letter.signatureLast }"
              :data-type-text="para"
            />
          </div>
        </div>
      </div>

      <div class="scroll-roll scroll-roll-bottom" />
    </div>

    <PhotoFrame />

    <QuizContinueArrow />

    <SantinoQuiz />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from 'src/stores/app'
import { useSequentialPenTyping } from 'src/composables/useScrollAnimations'
import { typeWithPen } from 'src/composables/usePenWriting'
import PhotoFrame from './PhotoFrame.vue'
import QuizContinueArrow from './QuizContinueArrow.vue'
import SantinoQuiz from './SantinoQuiz.vue'

gsap.registerPlugin(ScrollTrigger)

const store = useAppStore()
const letter = computed(() => store.data.parchmentLetter || { paragraphs: [], salutation: '', date: '', typingSpeed: 55 })

const sectionRef = ref(null)
const scrollRef = ref(null)
const bodyRef = ref(null)
const contentRef = ref(null)
const salutationRef = ref(null)
const rollTopRef = ref(null)

const typingSpeed = computed(() => letter.value.typingSpeed || 55)

const { startSequence } = useSequentialPenTyping(contentRef, {
  baseSpeed: typingSpeed.value,
  pauseBetween: 280
})

onMounted(async () => {
  await nextTick()
  if (!scrollRef.value) return

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

  setTimeout(async () => {
    if (salutationRef.value && letter.value.salutation) {
      await typeWithPen(salutationRef.value, letter.value.salutation, {
        baseSpeed: typingSpeed.value * 0.9
      })
      // Pausa breve y luego párrafos uno por uno
      await new Promise((r) => setTimeout(r, 500))
      await startSequence()
    }
  }, 500)

  ScrollTrigger.refresh()
})
</script>

<style scoped>
.parchment-section {
  margin: 0 0 48px;
  padding: 0 2px;
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

.scroll-roll-bottom {
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
  overflow: hidden;
}

.parchment-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    transparent,
    transparent 27px,
    rgba(26, 39, 68, 0.06) 27px,
    rgba(26, 39, 68, 0.06) 28px
  );
  pointer-events: none;
  margin-top: 60px;
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

/* Tipografía manuscrita */
.handwriting {
  font-family: 'Caveat', 'Segoe Script', cursive;
  color: #1a2744;
  letter-spacing: 0.02em;
}

.parchment-date {
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  color: #4a3728;
  text-align: right;
  margin: 0 0 14px;
  opacity: 0.85;
}

.parchment-salutation {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 10px;
  line-height: 1.35;
  min-height: 1.4em;
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
  gap: 20px;
}

.parchment-paragraph {
  font-size: 1.35rem;
  line-height: 1.75;
  margin: 0;
  min-height: 2em;
  text-align: left;
  word-break: normal;
  overflow-wrap: break-word;
}

/* Palabras enteras — nunca se parten */
.parchment-section :deep(.ink-word) {
  display: inline;
  white-space: nowrap;
}

/* Letras de tinta */
.parchment-section :deep(.ink-letter) {
  display: inline;
  opacity: 0;
  animation: ink-appear 0.18s ease forwards;
  transform: rotate(var(--ink-rot, 0deg)) translateY(var(--ink-y, 0));
  text-shadow: 0 0 1px rgba(26, 39, 68, 0.15);
}

.parchment-section :deep(.ink-space) {
  min-width: 0.28em;
  white-space: pre;
}

.parchment-paragraph.is-signature {
  text-align: right;
  font-size: 1.55rem;
  font-weight: 600;
  margin-top: 8px;
  color: #1a2744;
}

@keyframes ink-appear {
  0% {
    opacity: 0;
    filter: blur(1px);
  }
  60% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

/* Lapicera que escribe */
.parchment-section :deep(.writing-pen) {
  display: inline-flex;
  vertical-align: middle;
  margin-left: -2px;
  margin-bottom: 2px;
  animation: pen-scribble 0.35s ease-in-out infinite alternate;
  transform-origin: bottom left;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
}

.parchment-section :deep(.writing-pen.pen-finish) {
  animation: pen-lift 0.6s ease forwards;
}

@keyframes pen-scribble {
  0% { transform: rotate(-8deg) translateY(0); }
  100% { transform: rotate(-4deg) translateY(-1px); }
}

@keyframes pen-lift {
  0% { opacity: 1; transform: rotate(-6deg); }
  100% { opacity: 0; transform: rotate(-20deg) translate(8px, -12px); }
}

.parchment-section :deep(.pen-nib) {
  animation: nib-ink 0.4s ease infinite alternate;
}

@keyframes nib-ink {
  0% { fill: #1a2744; }
  100% { fill: #2a3a5c; }
}

</style>
