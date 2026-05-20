<template>
  <canvas
    ref="canvasRef"
    class="particles-canvas"
    aria-hidden="true"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from 'src/stores/app'

const store = useAppStore()
const canvasRef = ref(null)

let animationId = null
let particles = []
let width = 0
let height = 0

const PARTICLE_COUNT = 60

class Particle {
  constructor(w, h, color) {
    this.reset(w, h, color, true)
  }

  reset(w, h, color, randomY = false) {
    this.x = Math.random() * w
    this.y = randomY ? Math.random() * h : h + 10
    this.size = Math.random() * 2.5 + 0.5
    this.speedY = -(Math.random() * 0.4 + 0.1)
    this.speedX = (Math.random() - 0.5) * 0.3
    this.opacity = Math.random() * 0.5 + 0.1
    this.color = color
    this.pulse = Math.random() * Math.PI * 2
  }

  update(w, h, color) {
    this.y += this.speedY
    this.x += this.speedX
    this.pulse += 0.02
    this.currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse))

    if (this.y < -10) {
      this.reset(w, h, color)
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color.replace(')', `, ${this.currentOpacity})`).replace('rgb', 'rgba').replace('#', '')
    // Handle hex color
    if (this.color.startsWith('#')) {
      const r = parseInt(this.color.slice(1, 3), 16)
      const g = parseInt(this.color.slice(3, 5), 16)
      const b = parseInt(this.color.slice(5, 7), 16)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`
    }
    ctx.fill()

    // Soft glow
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
    if (this.color.startsWith('#')) {
      const r = parseInt(this.color.slice(1, 3), 16)
      const g = parseInt(this.color.slice(3, 5), 16)
      const b = parseInt(this.color.slice(5, 7), 16)
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.3})`)
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
    }
    ctx.fillStyle = gradient
    ctx.fill()
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * devicePixelRatio
  canvas.height = height * devicePixelRatio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext('2d')
  ctx.scale(devicePixelRatio, devicePixelRatio)
}

function initParticles() {
  const color = store.data.theme?.particleColor || '#e8a0bf'
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(width, height, color))
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const color = store.data.theme?.particleColor || '#e8a0bf'

  ctx.clearRect(0, 0, width, height)

  // Ambient gradient orbs
  const time = Date.now() * 0.0003
  const orb1 = ctx.createRadialGradient(
    width * 0.3 + Math.sin(time) * 50,
    height * 0.4 + Math.cos(time * 0.7) * 30,
    0,
    width * 0.3,
    height * 0.4,
    width * 0.5
  )
  orb1.addColorStop(0, 'rgba(232, 160, 191, 0.08)')
  orb1.addColorStop(1, 'rgba(232, 160, 191, 0)')
  ctx.fillStyle = orb1
  ctx.fillRect(0, 0, width, height)

  const orb2 = ctx.createRadialGradient(
    width * 0.7 + Math.cos(time * 0.5) * 40,
    height * 0.6 + Math.sin(time * 0.8) * 40,
    0,
    width * 0.7,
    height * 0.6,
    width * 0.4
  )
  orb2.addColorStop(0, 'rgba(201, 160, 220, 0.06)')
  orb2.addColorStop(1, 'rgba(201, 160, 220, 0)')
  ctx.fillStyle = orb2
  ctx.fillRect(0, 0, width, height)

  particles.forEach((p) => {
    p.update(width, height, color)
    p.draw(ctx)
  })

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  resize()
  initParticles()
  animate()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
