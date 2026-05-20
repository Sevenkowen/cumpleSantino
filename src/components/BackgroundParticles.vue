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
let leaves = []
let width = 0
let height = 0

const PARTICLE_COUNT = 50
const LEAF_COUNT = 8

const DEFAULT_COLORS = ['#ff6b2b', '#4a90d9', '#e8a0bf', '#ffd700', '#ed1c24']

class Particle {
  constructor(w, h, colors) {
    this.colors = colors
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.reset(w, h, true)
  }

  reset(w, h, randomY = false) {
    this.x = Math.random() * w
    this.y = randomY ? Math.random() * h : h + 10
    this.size = Math.random() * 2.5 + 0.5
    this.speedY = -(Math.random() * 0.4 + 0.1)
    this.speedX = (Math.random() - 0.5) * 0.3
    this.opacity = Math.random() * 0.5 + 0.1
    this.pulse = Math.random() * Math.PI * 2
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
  }

  update(w, h) {
    this.y += this.speedY
    this.x += this.speedX
    this.pulse += 0.02
    this.currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse))
    if (this.y < -10) this.reset(w, h)
  }

  draw(ctx) {
    const hex = this.color
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`
    ctx.fill()

    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4)
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.25})`)
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
  }
}

class Leaf {
  constructor(w, h) {
    this.reset(w, h, true)
  }

  reset(w, h, randomY = false) {
    this.x = Math.random() * w
    this.y = randomY ? Math.random() * h : -20
    this.size = Math.random() * 8 + 6
    this.speedY = Math.random() * 0.8 + 0.3
    this.speedX = (Math.random() - 0.5) * 0.5
    this.rotation = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.03
    this.opacity = Math.random() * 0.4 + 0.2
  }

  update(w, h) {
    this.y += this.speedY
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5
    this.rotation += this.rotSpeed
    if (this.y > h + 20) this.reset(w, h)
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = '#4a7c59'
    ctx.beginPath()
    ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

function getColors() {
  return store.data.theme?.particleColors || DEFAULT_COLORS
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
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
}

function initParticles() {
  const colors = getColors()
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(width, height, colors))
  leaves = Array.from({ length: LEAF_COUNT }, () => new Leaf(width, height))
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, width, height)

  const time = Date.now() * 0.0003

  // Naruto orange orb
  const orb1 = ctx.createRadialGradient(
    width * 0.2 + Math.sin(time) * 40,
    height * 0.3 + Math.cos(time * 0.7) * 30,
    0, width * 0.2, height * 0.3, width * 0.45
  )
  orb1.addColorStop(0, 'rgba(255, 107, 43, 0.1)')
  orb1.addColorStop(1, 'rgba(255, 107, 43, 0)')
  ctx.fillStyle = orb1
  ctx.fillRect(0, 0, width, height)

  // Blue chakra orb
  const orb2 = ctx.createRadialGradient(
    width * 0.8 + Math.cos(time * 0.5) * 35,
    height * 0.5 + Math.sin(time * 0.8) * 35,
    0, width * 0.8, height * 0.5, width * 0.4
  )
  orb2.addColorStop(0, 'rgba(74, 144, 217, 0.08)')
  orb2.addColorStop(1, 'rgba(74, 144, 217, 0)')
  ctx.fillStyle = orb2
  ctx.fillRect(0, 0, width, height)

  // Romantic accent orb
  const orb3 = ctx.createRadialGradient(
    width * 0.5,
    height * 0.7 + Math.sin(time * 0.6) * 20,
    0, width * 0.5, height * 0.7, width * 0.35
  )
  orb3.addColorStop(0, 'rgba(232, 160, 191, 0.06)')
  orb3.addColorStop(1, 'rgba(232, 160, 191, 0)')
  ctx.fillStyle = orb3
  ctx.fillRect(0, 0, width, height)

  leaves.forEach((l) => { l.update(width, height); l.draw(ctx) })
  particles.forEach((p) => { p.update(width, height); p.draw(ctx) })

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
