export function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve(url)
          img.onerror = () => resolve(url)
          img.src = url
        })
    )
  )
}

export function fireConfetti(colors) {
  import('canvas-confetti').then(({ default: confetti }) => {
    const palette = colors || ['#ff6b2b', '#4a90d9', '#e8a0bf', '#ffd700', '#ffffff']
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: palette
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: palette
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: palette
    })

    frame()
  })
}

export function fireRiverConfetti() {
  import('canvas-confetti').then(({ default: confetti }) => {
    const colors = ['#ed1c24', '#ffffff', '#ff4444']

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors
    })

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors
      })
    }, 300)
  })
}

export function fireChakraBurst() {
  fireConfetti(['#ff6b2b', '#4a90d9', '#ffd700', '#ffffff'])
}
