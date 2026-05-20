<template>
  <q-page class="index-page">
    <BackgroundParticles />
    <FloatingHearts :active="true" />
    <FloatingLeaves :active="true" />
    <FloatingStars />

    <InitialLoader v-if="store.isLoading" @complete="onLoadComplete" />

    <template v-if="!store.isLoading">
      <WelcomeScreen
        v-if="!store.isLetterVisible"
        @open="onLetterOpen"
      />
      <BirthdayLetter v-else />
    </template>

    <MusicPlayer v-if="store.isLetterVisible" />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from 'src/stores/app'
import { preloadImages } from 'src/utils/effects'
import BackgroundParticles from 'src/components/BackgroundParticles.vue'
import FloatingHearts from 'src/components/FloatingHearts.vue'
import FloatingLeaves from 'src/components/FloatingLeaves.vue'
import FloatingStars from 'src/components/FloatingStars.vue'
import InitialLoader from 'src/components/InitialLoader.vue'
import WelcomeScreen from 'src/components/WelcomeScreen.vue'
import BirthdayLetter from 'src/components/BirthdayLetter.vue'
import MusicPlayer from 'src/components/MusicPlayer.vue'

const store = useAppStore()

function onLoadComplete() {
  store.finishLoading()
}

function onLetterOpen() {
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
  overflow-x: hidden;
}
</style>
