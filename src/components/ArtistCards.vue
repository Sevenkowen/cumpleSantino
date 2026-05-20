<template>
  <section class="artist-section">
    <div class="section-header reveal-item">
      <h3 class="section-title text-gradient">Tus artistas favoritos</h3>
      <EqualizerBar class="header-eq" />
    </div>

    <div class="artist-grid">
      <div
        v-for="(artist, i) in artists"
        :key="artist.name"
        class="artist-card glass reveal-item"
        :style="{ '--artist-color': artist.color, '--artist-gradient': artist.gradient }"
      >
        <div class="artist-glow" />
        <div class="artist-top">
          <span class="artist-emoji">{{ artist.emoji }}</span>
          <EqualizerBar :bars="7" class="artist-eq" />
        </div>
        <h4 class="artist-name">{{ artist.name }}</h4>
        <p class="artist-desc">{{ artist.description }}</p>
        <p class="artist-vibe">{{ artist.vibe }}</p>
      </div>
    </div>

    <!-- Canción especial -->
    <div v-if="featuredSong.enabled" class="featured-song glass reveal-item">
      <div class="song-info">
        <q-icon name="music_note" size="28px" color="primary" />
        <div>
          <p class="song-title">{{ featuredSong.title }}</p>
          <p class="song-artist">{{ featuredSong.artist }}</p>
        </div>
      </div>
      <button class="song-play-btn" @click="toggleSong">
        <q-icon :name="isPlaying ? 'pause' : 'play_arrow'" size="24px" />
      </button>
    </div>
    <div v-else class="featured-song glass reveal-item song-placeholder">
      <q-icon name="music_note" size="28px" color="primary" />
      <p>Pronto una canción especial elegida para vos 🎵</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useAppStore } from 'src/stores/app'
import EqualizerBar from './EqualizerBar.vue'

const store = useAppStore()
const artists = computed(() => store.data.artists || [])
const featuredSong = computed(() => store.data.featuredSong || {})

const audio = ref(null)
const isPlaying = ref(false)

function toggleSong() {
  if (!featuredSong.value.src) return
  if (!audio.value) {
    audio.value = new Audio(featuredSong.value.src)
    audio.value.onended = () => { isPlaying.value = false }
  }
  if (isPlaying.value) {
    audio.value.pause()
    isPlaying.value = false
  } else {
    audio.value.play().catch(() => {})
    isPlaying.value = true
  }
}

onUnmounted(() => {
  audio.value?.pause()
})
</script>

<style scoped>
.artist-section {
  margin: 40px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 12px;
}

.header-eq {
  justify-content: center;
  color: #a29bfe;
}

.artist-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.artist-card {
  position: relative;
  padding: 24px;
  overflow: hidden;
}

.artist-glow {
  position: absolute;
  top: -50%;
  right: -30%;
  width: 150px;
  height: 150px;
  background: var(--artist-gradient);
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(40px);
}

.artist-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.artist-emoji {
  font-size: 2rem;
}

.artist-eq {
  color: var(--artist-color);
}

.artist-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 8px;
  background: var(--artist-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.artist-desc {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0 0 4px;
  line-height: 1.5;
}

.artist-vibe {
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 0;
  font-style: italic;
}

.featured-song {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  margin-top: 16px;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.song-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
}

.song-artist {
  font-size: 0.8rem;
  opacity: 0.6;
  margin: 0;
}

.song-play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #e8a0bf, #c9a0dc);
  color: #0a0a0f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.song-placeholder {
  flex-direction: column;
  gap: 8px;
  text-align: center;
  padding: 20px;
}

.song-placeholder p {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>
