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

export function fireConfetti() {
  import('canvas-confetti').then(({ default: confetti }) => {
    const duration = 3000
    const end = Date.now() + duration

    const colors = ['#e8a0bf', '#c9a0dc', '#ffb3c6', '#ffffff', '#ffd93d']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors
    })

    frame()
  })
}
