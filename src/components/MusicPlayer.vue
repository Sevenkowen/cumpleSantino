<template>
  <button
    v-if="enabled"
    class="music-player glass glow-accent"
    :class="{ playing: isPlaying }"
    :aria-label="isPlaying ? 'Pausar música' : 'Reproducir música'"
    @click="handleToggle"
  >
    <q-icon
      :name="isPlaying ? 'pause' : 'play_arrow'"
      size="24px"
      color="white"
    />
    <span v-if="showLabel" class="music-label">{{ title }}</span>
  </button>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useAppStore } from 'src/stores/app'
import { useBackgroundMusic } from 'src/composables/useAudio'

const store = useAppStore()
const { isPlaying, play, pause, toggle } = useBackgroundMusic(store.data.music?.src)

const enabled = computed(() => store.data.music?.enabled !== false)
const title = computed(() => store.data.music?.title || 'Música')
const showLabel = computed(() => store.isLetterVisible)

function handleToggle() {
  toggle()
  store.setMusicPlaying(isPlaying.value)
}

watch(
  () => store.musicPlaying,
  (val) => {
    if (val && !isPlaying.value) play()
    else if (!val && isPlaying.value) pause()
  }
)

onMounted(() => {
  // Auto-play is blocked on mobile; user must tap
  if (store.musicPlaying) play()
})

defineExpose({ play, pause, toggle, isPlaying })
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  right: 20px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.music-player:active {
  transform: scale(0.92);
}

.music-player.playing {
  animation: music-pulse 2s ease-in-out infinite;
}

.music-label {
  font-size: 0.75rem;
  opacity: 0.8;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes music-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(232, 160, 191, 0.3); }
  50% { box-shadow: 0 0 30px rgba(232, 160, 191, 0.5); }
}
</style>
