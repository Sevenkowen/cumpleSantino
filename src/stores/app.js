import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import messageData from 'src/data/message'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(true)
  const currentScreen = ref('welcome') // 'welcome' | 'letter'
  const letterOpened = ref(false)
  const musicPlaying = ref(false)
  const imagesPreloaded = ref(false)

  const data = messageData

  const isLetterVisible = computed(() => currentScreen.value === 'letter')

  function finishLoading() {
    isLoading.value = false
  }

  function openLetter() {
    letterOpened.value = true
    currentScreen.value = 'letter'
  }

  function toggleMusic() {
    musicPlaying.value = !musicPlaying.value
  }

  function setMusicPlaying(value) {
    musicPlaying.value = value
  }

  function setImagesPreloaded(value) {
    imagesPreloaded.value = value
  }

  function resetExperience() {
    currentScreen.value = 'welcome'
    letterOpened.value = false
    musicPlaying.value = false
  }

  return {
    isLoading,
    currentScreen,
    letterOpened,
    musicPlaying,
    imagesPreloaded,
    data,
    isLetterVisible,
    finishLoading,
    openLetter,
    toggleMusic,
    setMusicPlaying,
    setImagesPreloaded,
    resetExperience
  }
})
