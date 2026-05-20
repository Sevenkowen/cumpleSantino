<template>
  <div class="photo-carousel">
    <div class="carousel-header reveal-item">
      <h3 class="section-title text-gradient">Nuestros momentos</h3>
      <p class="section-subtitle">Recuerdos que atesoro</p>
    </div>

    <q-carousel
      v-model="slide"
      animated
      swipeable
      infinite
      autoplay
      :autoplay-interval="4000"
      transition-prev="slide-right"
      transition-next="slide-left"
      class="carousel glass glow-accent reveal-item"
      height="280px"
      padding
    >
      <q-carousel-slide
        v-for="(photo, index) in photos"
        :key="index"
        :name="index"
        class="carousel-slide"
      >
        <div class="photo-frame">
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="photo-image"
            loading="lazy"
            @error="handleImageError($event, index)"
          />
          <div class="photo-overlay">
            <p class="photo-caption">{{ photo.caption }}</p>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="carousel-dots reveal-item">
      <span
        v-for="(_, index) in photos"
        :key="index"
        class="dot"
        :class="{ active: slide === index }"
        @click="slide = index"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from 'src/stores/app'

const store = useAppStore()
const slide = ref(0)

const photos = computed(() => store.data.photos || [])

function handleImageError(event, index) {
  // Fallback gradient placeholder
  event.target.style.display = 'none'
  event.target.parentElement.classList.add('placeholder')
  event.target.parentElement.setAttribute('data-index', index + 1)
}
</script>

<style scoped>
.photo-carousel {
  width: 100%;
  margin: 32px 0;
}

.carousel-header {
  text-align: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 4px;
}

.section-subtitle {
  font-size: 0.85rem;
  opacity: 0.6;
  margin: 0;
}

.carousel {
  border-radius: 20px;
  overflow: hidden;
}

.carousel-slide {
  padding: 8px;
}

.photo-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.photo-frame.placeholder {
  background: linear-gradient(135deg, rgba(232,160,191,0.3), rgba(201,160,220,0.3));
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-frame.placeholder::after {
  content: '📷 Foto ' attr(data-index);
  font-size: 1rem;
  opacity: 0.7;
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  border-radius: 0 0 16px 16px;
}

.photo-caption {
  margin: 0;
  font-size: 0.85rem;
  color: white;
  text-align: center;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #e8a0bf;
  width: 24px;
  border-radius: 4px;
}
</style>
