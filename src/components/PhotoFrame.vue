<template>
  <div v-if="photo?.src" class="photo-frame-section" ref="frameRef">
    <div class="frame-outer">
      <div class="frame-mat">
        <div class="frame-inner">
          <img
            :src="photo.src"
            :alt="photo.alt || 'Foto especial'"
            class="frame-photo"
            loading="lazy"
          />
          <div class="frame-gloss" aria-hidden="true" />
        </div>
      </div>
      <span class="frame-corner corner-tl" aria-hidden="true" />
      <span class="frame-corner corner-tr" aria-hidden="true" />
      <span class="frame-corner corner-bl" aria-hidden="true" />
      <span class="frame-corner corner-br" aria-hidden="true" />
    </div>

    <p v-if="photo.caption" class="frame-caption">{{ photo.caption }}</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from 'src/stores/app'

gsap.registerPlugin(ScrollTrigger)

const store = useAppStore()
const photo = computed(() => store.data.parchmentLetter?.photo)
const frameRef = ref(null)

onMounted(() => {
  if (!frameRef.value) return

  gsap.fromTo(frameRef.value,
    { opacity: 0, y: 50, scale: 0.92 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: frameRef.value,
        start: 'top 88%',
        once: true
      }
    }
  )
})
</script>

<style scoped>
.photo-frame-section {
  margin: 32px auto 8px;
  max-width: 320px;
  text-align: center;
}

.frame-outer {
  position: relative;
  padding: 10px;
  background: linear-gradient(145deg, #3d2b1f 0%, #5c4033 30%, #4a3228 70%, #2d1f17 100%);
  border-radius: 4px;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.5),
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.frame-mat {
  padding: 14px 14px 20px;
  background: linear-gradient(180deg, #faf8f4 0%, #f0ebe3 100%);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.06);
}

.frame-inner {
  position: relative;
  overflow: hidden;
  line-height: 0;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.15);
}

.frame-photo {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 3 / 4;
}

.frame-gloss {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    transparent 40%,
    transparent 60%,
    rgba(255, 255, 255, 0.04) 100%
  );
  pointer-events: none;
}

.frame-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: rgba(201, 169, 110, 0.6);
  border-style: solid;
  pointer-events: none;
}

.corner-tl { top: 4px; left: 4px; border-width: 2px 0 0 2px; }
.corner-tr { top: 4px; right: 4px; border-width: 2px 2px 0 0; }
.corner-bl { bottom: 4px; left: 4px; border-width: 0 0 2px 2px; }
.corner-br { bottom: 4px; right: 4px; border-width: 0 2px 2px 0; }

.frame-caption {
  margin: 16px 0 0;
  font-family: 'Caveat', cursive;
  font-size: 1.25rem;
  color: rgba(240, 230, 239, 0.75);
  letter-spacing: 0.02em;
}
</style>
