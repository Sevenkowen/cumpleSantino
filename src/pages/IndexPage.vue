<template>
  <q-page class="index-page">
    <!-- Global effects -->
    <BackgroundParticles />
    <FloatingHearts :active="store.isLetterVisible" />

    <!-- Initial loader -->
    <InitialLoader v-if="store.isLoading" @complete="onLoadComplete" />

    <!-- Main experience -->
    <template v-if="!store.isLoading">
      <WelcomeScreen
        v-if="!store.isLetterVisible"
        @open="onLetterOpen"
      />
      <BirthdayLetter v-else />
    </template>

    <!-- Music player (visible after letter opens) -->
    <MusicPlayer v-if="store.isLetterVisible" ref="musicRef" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from 'src/stores/app'
import { preloadImages } from 'src/utils/effects'
import BackgroundParticles from 'src/components/BackgroundParticles.vue'
import FloatingHearts from 'src/components/FloatingHearts.vue'
import InitialLoader from 'src/components/InitialLoader.vue'
import WelcomeScreen from 'src/components/WelcomeScreen.vue'
import BirthdayLetter from 'src/components/BirthdayLetter.vue'
import MusicPlayer from 'src/components/MusicPlayer.vue'

const store = useAppStore()
const musicRef = ref(null)

function onLoadComplete() {
  store.finishLoading()
}

function onLetterOpen() {
  // Music starts on user interaction (mobile-friendly)
  if (store.data.music?.enabled) {
    store.setMusicPlaying(true)
  }
}

onMounted(async () => {
  const photoUrls = (store.data.photos || []).map((p) => p.src)
  await preloadImages(photoUrls)
  store.setImagesPreloaded(true)
})
</script>

<style scoped>
.index-page {
  position: relative;
  background: #0a0a0f;
  overflow: hidden;
}
</style>
