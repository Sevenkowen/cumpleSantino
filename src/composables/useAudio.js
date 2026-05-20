import { ref, onUnmounted } from 'vue'

export function useSound() {
  const audioCache = new Map()

  function play(src, volume = 0.5) {
    if (!src) return

    try {
      let audio = audioCache.get(src)
      if (!audio) {
        audio = new Audio(src)
        audioCache.set(src, audio)
      }
      audio.volume = volume
      audio.currentTime = 0
      audio.play().catch(() => {})
    } catch {
      // Silently fail if audio unavailable
    }
  }

  return { play }
}

export function useBackgroundMusic(src) {
  const audio = ref(null)
  const isPlaying = ref(false)

  function init() {
    if (!src) return
    audio.value = new Audio(src)
    audio.value.loop = true
    audio.value.volume = 0.35
  }

  function play() {
    if (!audio.value) init()
    if (!audio.value) return
    audio.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {})
  }

  function pause() {
    if (!audio.value) return
    audio.value.pause()
    isPlaying.value = false
  }

  function toggle() {
    if (isPlaying.value) pause()
    else play()
  }

  onUnmounted(() => {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }
  })

  return { isPlaying, play, pause, toggle }
}
