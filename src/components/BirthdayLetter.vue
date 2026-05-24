<template>
  <div class="birthday-letter" ref="letterRef">
    <ChakraBurst v-if="showChakra" />

    <div class="letter-content" ref="contentRef" :class="{ visible: contentVisible }">
      <div class="letter-scroll safe-top safe-bottom">
        <header class="letter-header reveal-item" ref="headerRef">
          <div class="letter-icon">🎂</div>
          <h1 class="letter-title text-gradient glow-text">{{ data.title }}</h1>
          <h2 class="letter-recipient">{{ data.recipientName }}</h2>
          <div class="letter-divider" />
        </header>

        <ParchmentLetter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useAppStore } from 'src/stores/app'
import { useScrollAnimations } from 'src/composables/useScrollAnimations'
import ChakraBurst from './ChakraBurst.vue'
import ParchmentLetter from './ParchmentLetter.vue'

const store = useAppStore()
const data = computed(() => store.data)

const letterRef = ref(null)
const contentRef = ref(null)
const headerRef = ref(null)

const showChakra = ref(true)
const contentVisible = ref(true)

useScrollAnimations(contentRef)

onMounted(async () => {
  await nextTick()

  const tl = gsap.timeline({
    onStart: () => { contentVisible.value = true }
  })

  tl.from(contentRef.value, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.2
  })
  .from(headerRef.value?.children || [], {
    opacity: 0,
    y: 30,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.5')

  setTimeout(() => { showChakra.value = false }, 2000)
})
</script>

<style scoped>
.birthday-letter {
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 100dvh;
}

.letter-content {
  opacity: 1;
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
  margin-bottom: 40px;
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

.letter-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff6b2b, #4a90d9, transparent);
  margin: 24px auto 0;
}
</style>
