<template>
  <div class="birthday-letter" ref="letterRef">
    <!-- Envelope opening animation -->
    <div class="envelope-stage" ref="envelopeRef" v-if="showEnvelope">
      <div class="envelope">
        <div class="envelope-flap" ref="flapRef" />
        <div class="envelope-body glass">
          <span class="envelope-heart">💌</span>
        </div>
      </div>
    </div>

    <!-- Letter content -->
    <div class="letter-content" ref="contentRef" :class="{ visible: contentVisible }">
      <div class="letter-scroll safe-top safe-bottom">
        <!-- Header -->
        <header class="letter-header reveal-item" ref="headerRef">
          <div class="letter-icon">🎂</div>
          <h1 class="letter-title text-gradient glow-text">
            {{ data.title }}
          </h1>
          <h2 class="letter-recipient">{{ data.recipientName }}</h2>
          <p class="letter-subtitle">{{ data.subtitle }}</p>
          <div class="letter-divider" />
        </header>

        <!-- Main message with typing -->
        <section class="letter-message reveal-item">
          <p
            v-for="(paragraph, i) in messageParagraphs"
            :key="i"
            class="message-paragraph"
          >{{ paragraph }}</p>
        </section>

        <!-- Quotes -->
        <section class="letter-quotes" v-if="data.quotes?.length">
          <div
            v-for="(quote, i) in data.quotes"
            :key="i"
            class="quote-card glass reveal-item"
          >
            <q-icon name="format_quote" size="24px" color="primary" class="quote-icon" />
            <p class="quote-text">{{ quote.text }}</p>
            <p class="quote-author">{{ quote.author }}</p>
          </div>
        </section>

        <!-- Important dates -->
        <section class="letter-dates" v-if="data.importantDates?.length">
          <h3 class="section-title text-gradient reveal-item">Fechas que guardo en el corazón</h3>
          <div class="dates-grid">
            <div
              v-for="(item, i) in data.importantDates"
              :key="i"
              class="date-card glass reveal-item"
            >
              <span class="date-emoji">{{ item.emoji }}</span>
              <p class="date-label">{{ item.label }}</p>
              <p class="date-value">{{ item.date }}</p>
            </div>
          </div>
        </section>

        <!-- Photo carousel -->
        <PhotoCarousel v-if="data.photos?.length" />

        <!-- Signature -->
        <footer class="letter-signature reveal-item">
          <div class="signature-line" />
          <p class="signature-text">{{ data.signature }}</p>
          <p class="signature-heart">❤️</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useAppStore } from 'src/stores/app'
import { useScrollAnimations } from 'src/composables/useScrollAnimations'
import PhotoCarousel from './PhotoCarousel.vue'

const store = useAppStore()
const data = computed(() => store.data)

const letterRef = ref(null)
const envelopeRef = ref(null)
const flapRef = ref(null)
const contentRef = ref(null)
const headerRef = ref(null)

const showEnvelope = ref(true)
const contentVisible = ref(false)

const messageParagraphs = computed(() =>
  data.value.message.split('\n').filter((p) => p.trim())
)

useScrollAnimations(contentRef)

onMounted(async () => {
  await nextTick()

  const tl = gsap.timeline()

  // Envelope entrance
  tl.from(envelopeRef.value, {
    scale: 0.5,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.5)'
  })
  // Flap opens
  .to(flapRef.value, {
    rotateX: 180,
    duration: 0.8,
    ease: 'power2.inOut',
    transformOrigin: 'top center'
  }, '+=0.5')
  // Envelope fades out
  .to(envelopeRef.value, {
    scale: 1.2,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      showEnvelope.value = false
      contentVisible.value = true
    }
  })
  // Letter content appears
  .from(contentRef.value, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.2')
  .from(headerRef.value?.children || [], {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.5')
})
</script>

<style scoped>
.birthday-letter {
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 100dvh;
}

/* ── Envelope ─────────────────────────────────── */
.envelope-stage {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.envelope {
  position: relative;
  width: 200px;
  height: 140px;
  perspective: 600px;
}

.envelope-body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(232, 160, 191, 0.2);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px 8px 0 0;
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  transform-origin: top center;
  z-index: 2;
}

.envelope-heart {
  font-size: 3rem;
}

/* ── Letter content ───────────────────────────── */
.letter-content {
  opacity: 0;
  transition: opacity 0.3s;
}

.letter-content.visible {
  opacity: 1;
}

.letter-scroll {
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px 100px;
}

.letter-header {
  text-align: center;
  margin-bottom: 32px;
}

.letter-icon {
  font-size: 3rem;
  margin-bottom: 8px;
}

.letter-title {
  font-size: clamp(2rem, 7vw, 2.8rem);
  font-weight: 700;
  margin: 0 0 4px;
  line-height: 1.2;
}

.letter-recipient {
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  font-weight: 300;
  margin: 0 0 12px;
  opacity: 0.9;
}

.letter-subtitle {
  font-size: 0.95rem;
  opacity: 0.6;
  margin: 0;
  line-height: 1.5;
}

.letter-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e8a0bf, transparent);
  margin: 24px auto 0;
}

.letter-message {
  margin-bottom: 32px;
}

.message-paragraph {
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.85;
  margin: 0 0 16px;
  text-align: center;
}

/* ── Quotes ───────────────────────────────────── */
.letter-quotes {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.quote-card {
  padding: 20px;
  text-align: center;
}

.quote-icon {
  opacity: 0.5;
  margin-bottom: 8px;
}

.quote-text {
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.6;
  margin: 0 0 8px;
  opacity: 0.9;
}

.quote-author {
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 0;
}

/* ── Dates ────────────────────────────────────── */
.letter-dates {
  margin-bottom: 16px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 20px;
}

.dates-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.date-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
}

.date-emoji {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.date-label {
  font-size: 0.85rem;
  opacity: 0.6;
  margin: 0;
}

.date-value {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

/* ── Signature ────────────────────────────────── */
.letter-signature {
  text-align: center;
  margin-top: 40px;
  padding-top: 24px;
}

.signature-line {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232,160,191,0.5), transparent);
  margin: 0 auto 16px;
}

.signature-text {
  font-size: 1.1rem;
  font-style: italic;
  opacity: 0.8;
  margin: 0 0 8px;
}

.signature-heart {
  font-size: 1.5rem;
  margin: 0;
  animation: pulse-heart 1.5s ease-in-out infinite;
}
</style>
