<template>
  <div class="birthday-letter" ref="letterRef">
    <!-- Chakra burst on open -->
    <ChakraBurst v-if="showChakra" />

    <!-- Letter content -->
    <div class="letter-content" ref="contentRef" :class="{ visible: contentVisible }">
      <div class="letter-scroll safe-top safe-bottom">
        <!-- Header -->
        <header class="letter-header reveal-item" ref="headerRef">
          <div class="letter-icon">🎂</div>
          <h1 class="letter-title text-gradient glow-text">{{ data.title }}</h1>
          <h2 class="letter-recipient">{{ data.recipientName }}</h2>
          <p class="letter-subtitle">{{ data.subtitle }}</p>
          <div class="letter-divider" />
        </header>

        <!-- Story chapters -->
        <template v-for="chapter in storyChapters" :key="chapter.id">
          <StorySection :chapter="chapter" />

          <!-- Naruto quotes after ninja chapter -->
          <section v-if="chapter.id === 'ninja'" class="naruto-quotes">
            <div
              v-for="(q, i) in narutoQuotes"
              :key="i"
              class="quote-card glass reveal-item quote-naruto-card"
            >
              <p class="quote-text">"{{ q.text }}"</p>
              <p class="quote-author">{{ q.author }}</p>
            </div>
          </section>

          <!-- Artists after music chapter -->
          <ArtistCards v-if="chapter.id === 'music'" />

          <!-- River section after river chapter -->
          <RiverSection v-if="chapter.id === 'river'" />
        </template>

        <!-- Photo carousel -->
        <PhotoCarousel v-if="data.photos?.length" />

        <!-- Final stats screen -->
        <FinalStats @replay="handleReplay" />
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
import StorySection from './StorySection.vue'
import ArtistCards from './ArtistCards.vue'
import RiverSection from './RiverSection.vue'
import PhotoCarousel from './PhotoCarousel.vue'
import FinalStats from './FinalStats.vue'

const store = useAppStore()
const data = computed(() => store.data)
const storyChapters = computed(() => store.data.story || [])
const narutoQuotes = computed(() => store.data.narutoQuotes || [])

const letterRef = ref(null)
const contentRef = ref(null)
const headerRef = ref(null)

const showChakra = ref(true)
const contentVisible = ref(false)

useScrollAnimations(contentRef)

function handleReplay() {
  store.resetExperience()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await nextTick()

  const tl = gsap.timeline({
    onStart: () => { contentVisible.value = true }
  })

  tl.from(contentRef.value, {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3
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

.letter-subtitle {
  font-size: 0.95rem;
  opacity: 0.6;
  margin: 0;
  line-height: 1.5;
}

.letter-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff6b2b, #4a90d9, transparent);
  margin: 24px auto 0;
}

.naruto-quotes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.quote-naruto-card {
  padding: 16px 20px;
  text-align: center;
  border-left: 3px solid #ff6b2b;
}

.quote-text {
  font-size: 0.95rem;
  font-style: italic;
  line-height: 1.6;
  margin: 0 0 6px;
  opacity: 0.9;
}

.quote-author {
  font-size: 0.75rem;
  opacity: 0.5;
  margin: 0;
}
</style>
