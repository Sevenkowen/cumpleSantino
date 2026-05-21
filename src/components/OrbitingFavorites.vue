<template>
  <div class="orbit-scene" ref="sceneRef">
    <div
      v-for="(ring, ri) in rings"
      :key="ri"
      class="orbit-ring"
      :ref="(el) => setRingRef(el, ri)"
      :style="{ '--diameter': ring.diameter + 'px' }"
    >
      <div
        v-for="(item, ii) in ring.items"
        :key="item.src + ii"
        class="orbit-item"
        :style="{ transform: `rotate(${item.angle}deg) translateX(calc(var(--diameter) / 2))` }"
      >
        <div
          class="orbit-counter"
          :ref="(el) => setCounterRef(el, ri, ii)"
          :style="{ transform: `rotate(-${item.angle}deg)` }"
        >
          <div
            class="orbit-image-wrap"
            :class="item.glow"
            :style="{ width: item.size + 'px', height: item.size + 'px' }"
          >
            <img :src="item.src" :alt="item.alt" class="orbit-image" loading="eager" />
          </div>
        </div>
      </div>
    </div>

    <div class="center-card glass-strong glow-accent" ref="cardRef">
      <div class="card-shine" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const sceneRef = ref(null)
const cardRef = ref(null)
const ringRefs = ref([])
const counterRefs = ref({})

let ctx = null

const rings = [
  {
    diameter: Math.min(window.innerWidth * 0.78, 310),
    duration: 36,
    direction: 1,
    items: [
      { src: '/images/favorites/naruto.png', alt: 'Naruto', angle: 0, size: 80, glow: 'glow-naruto' },
      { src: '/images/favorites/duki.png', alt: 'Duki', angle: 72, size: 70, glow: 'glow-duki' },
      { src: '/images/favorites/pablo-londra.png', alt: 'Pablo Londra', angle: 144, size: 76, glow: 'glow-music' },
      { src: '/images/favorites/francescoli.png', alt: 'Francescoli', angle: 216, size: 78, glow: 'glow-river' },
      { src: '/images/favorites/river-escudo.png', alt: 'River Plate', angle: 288, size: 56, glow: 'glow-river' }
    ]
  },
  {
    diameter: Math.min(window.innerWidth * 0.92, 390),
    duration: 50,
    direction: -1,
    items: [
      { src: '/images/favorites/pablo-londra-2.png', alt: 'Pablo Londra', angle: 40, size: 66, glow: 'glow-music' },
      { src: '/images/favorites/naruto.png', alt: 'Naruto', angle: 200, size: 62, glow: 'glow-naruto' },
      { src: '/images/favorites/duki.png', alt: 'Duki', angle: 320, size: 64, glow: 'glow-duki' }
    ]
  }
]

function setRingRef(el, index) {
  if (el) ringRefs.value[index] = el
}

function setCounterRef(el, ri, ii) {
  if (el) {
    if (!counterRefs.value[ri]) counterRefs.value[ri] = []
    counterRefs.value[ri][ii] = el
  }
}

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(cardRef.value, {
      scale: 0.75,
      opacity: 0,
      duration: 1.1,
      ease: 'back.out(1.5)'
    })

    ringRefs.value.forEach((ring, i) => {
      if (!ring) return
      const dir = rings[i].direction
      const dur = rings[i].duration

      gsap.to(ring, {
        rotation: dir * 360,
        duration: dur,
        repeat: -1,
        ease: 'none'
      })

      const counters = counterRefs.value[i] || []
      counters.forEach((counter, ci) => {
        if (!counter) return

        gsap.to(counter, {
          rotation: `-=${dir * 360}`,
          duration: dur,
          repeat: -1,
          ease: 'none'
        })

        gsap.to(counter.querySelector('.orbit-image-wrap'), {
          y: gsap.utils.random(-6, 6),
          duration: gsap.utils.random(1.8, 2.8),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: ci * 0.2
        })
      })
    })

    gsap.from('.orbit-image-wrap', {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'back.out(2)',
      delay: 0.5
    })

    gsap.to(cardRef.value, {
      boxShadow: '0 0 35px rgba(255,107,43,0.3), 0 0 70px rgba(74,144,217,0.15)',
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    })
  }, sceneRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
.orbit-scene {
  position: relative;
  width: 100%;
  min-height: min(92vw, 420px);
  height: min(92vw, 420px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--diameter);
  height: var(--diameter);
  margin-top: calc(var(--diameter) / -2);
  margin-left: calc(var(--diameter) / -2);
  pointer-events: none;
}

.orbit-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-origin: 0 0;
}

.orbit-counter {
  transform-origin: 0 0;
}

.orbit-image-wrap {
  border-radius: 14px;
  overflow: hidden;
  transform: translate(-50%, -50%);
  will-change: transform;
}

.orbit-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  mix-blend-mode: screen;
  filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.6));
}

.glow-naruto { box-shadow: 0 0 18px rgba(255, 107, 43, 0.4); border-radius: 14px; }
.glow-duki { box-shadow: 0 0 18px rgba(237, 28, 36, 0.4); border-radius: 14px; }
.glow-music { box-shadow: 0 0 18px rgba(162, 155, 254, 0.4); border-radius: 14px; }
.glow-river { box-shadow: 0 0 18px rgba(237, 28, 36, 0.35); border-radius: 50%; }

.center-card {
  position: relative;
  z-index: 5;
  width: min(72vw, 280px);
  padding: 24px 18px 20px;
  text-align: center;
  overflow: hidden;
}

.card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 107, 43, 0.07) 0%,
    transparent 45%,
    rgba(74, 144, 217, 0.07) 100%
  );
  pointer-events: none;
}

@media (max-height: 680px) {
  .orbit-scene {
    min-height: min(85vw, 360px);
    height: min(85vw, 360px);
  }

  .center-card {
    width: min(68vw, 250px);
    padding: 18px 14px 16px;
  }
}
</style>
