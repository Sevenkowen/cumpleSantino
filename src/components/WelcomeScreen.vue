<template>
  <div class="welcome-screen screen-container" ref="screenRef">
    <div class="welcome-content safe-top safe-bottom">
      <OrbitingFavorites ref="orbitRef">
        <div class="card-inner" ref="textWrapperRef">
          <p class="welcome-emoji" ref="emojiRef">{{ data.welcomeEmoji || '🍃' }}</p>
          <h1 class="welcome-text glow-text">
            <span ref="typingRef" />
            <span class="cursor" :class="{ hidden: typingDone }">|</span>
          </h1>
        </div>

        <div class="welcome-action" ref="buttonRef">
          <button class="btn-premium" @click="handleOpen">
            {{ data.openButtonText }}
          </button>
          <p class="welcome-hint">Tocá para descubrir tu sorpresa</p>
        </div>
      </OrbitingFavorites>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'
import { useAppStore } from 'src/stores/app'
import { useSound } from 'src/composables/useAudio'
import { fireConfetti, fireChakraBurst } from 'src/utils/effects'
import OrbitingFavorites from './OrbitingFavorites.vue'

const emit = defineEmits(['open'])

const store = useAppStore()
const { play } = useSound()

const data = computed(() => store.data)

const screenRef = ref(null)
const textWrapperRef = ref(null)
const emojiRef = ref(null)
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
      fireChakraBurst()
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
    duration: 1,
    ease: 'power3.out'
  })
  .from(emojiRef.value, {
    scale: 0,
    rotation: -180,
    duration: 0.8,
    ease: 'back.out(2)'
  }, '-=0.4')
  .from(textWrapperRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    onComplete: () => {
      typeText(data.value.welcomeText, typingRef.value, 45)
    }
  }, '-=0.3')
  .from(buttonRef.value, {
    opacity: 0,
    y: 30,
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
  overflow: hidden;
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
  padding: 16px 12px;
}

.card-inner {
  margin-bottom: 20px;
}

.welcome-emoji {
  font-size: 2.2rem;
  margin: 0 0 10px;
}

.welcome-text {
  font-size: clamp(1.2rem, 4.5vw, 1.6rem);
  font-weight: 400;
  line-height: 1.45;
  margin: 0;
  min-height: 2.8em;
  letter-spacing: 0.3px;
}

.cursor {
  animation: blink 0.8s step-end infinite;
  color: #ff6b2b;
}

.cursor.hidden {
  opacity: 0;
}

@keyframes blink {
  50% { opacity: 0; }
}

.welcome-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.welcome-hint {
  font-size: 0.75rem;
  opacity: 0.45;
  margin: 0;
}

.btn-premium {
  min-width: 180px;
  padding: 14px 32px;
  font-size: 1rem;
}
</style>
