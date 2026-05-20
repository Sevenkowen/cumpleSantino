<template>
  <div class="welcome-screen screen-container" ref="screenRef">
    <div class="welcome-content safe-top safe-bottom">
      <div class="welcome-text-wrapper" ref="textWrapperRef">
        <p class="welcome-emoji" ref="emojiRef">✨</p>
        <h1 class="welcome-text glow-text" ref="welcomeTextRef">
          <span ref="typingRef" />
          <span class="cursor" :class="{ hidden: typingDone }">|</span>
        </h1>
      </div>

      <div class="welcome-spacer" />

      <div class="welcome-action" ref="buttonRef">
        <button class="btn-premium" @click="handleOpen">
          {{ data.openButtonText }}
        </button>
        <p class="welcome-hint">Tocá para descubrir tu sorpresa</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'
import { useAppStore } from 'src/stores/app'
import { useSound } from 'src/composables/useAudio'
import { fireConfetti } from 'src/utils/effects'

const emit = defineEmits(['open'])

const store = useAppStore()
const { play } = useSound()

const data = computed(() => store.data)

const screenRef = ref(null)
const textWrapperRef = ref(null)
const emojiRef = ref(null)
const welcomeTextRef = ref(null)
const typingRef = ref(null)
const buttonRef = ref(null)
const typingDone = ref(false)

function handleOpen() {
  if (store.data.sounds?.enabled) {
    play(store.data.sounds.buttonTap, 0.4)
  }

  gsap.to(buttonRef.value, {
    scale: 0.9,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  })

  gsap.to(screenRef.value, {
    scale: 1.1,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.inOut',
    onComplete: () => {
      if (store.data.sounds?.enabled) {
        play(store.data.sounds.letterOpen, 0.5)
      }
      fireConfetti()
      store.openLetter()
      emit('open')
    }
  })
}

function typeText(text, element, speed = 60) {
  return new Promise((resolve) => {
    let i = 0
    element.textContent = ''
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i]
        i++
      } else {
        clearInterval(interval)
        typingDone.value = true
        resolve()
      }
    }, speed)
  })
}

onMounted(async () => {
  const tl = gsap.timeline()

  tl.from(screenRef.value, {
    opacity: 0,
    scale: 1.05,
    duration: 1.2,
    ease: 'power3.out'
  })
  .from(emojiRef.value, {
    scale: 0,
    rotation: -180,
    duration: 0.8,
    ease: 'back.out(2)'
  }, '-=0.6')
  .from(textWrapperRef.value, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    onComplete: () => {
      typeText(data.value.welcomeText, typingRef.value, 45)
    }
  }, '-=0.4')
  .from(buttonRef.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.2')
})
</script>

<style scoped>
.welcome-screen {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 32px 24px;
  text-align: center;
}

.welcome-text-wrapper {
  flex-shrink: 0;
}

.welcome-emoji {
  font-size: 3rem;
  margin: 0 0 16px;
}

.welcome-text {
  font-size: clamp(1.5rem, 5vw, 2.2rem);
  font-weight: 300;
  line-height: 1.4;
  margin: 0;
  min-height: 3em;
  letter-spacing: 0.5px;
}

.cursor {
  animation: blink 0.8s step-end infinite;
  color: #e8a0bf;
}

.cursor.hidden {
  opacity: 0;
}

@keyframes blink {
  50% { opacity: 0; }
}

.welcome-spacer {
  flex: 1;
  min-height: 40px;
}

.welcome-action {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.welcome-hint {
  font-size: 0.8rem;
  opacity: 0.4;
  margin: 0;
}
</style>
