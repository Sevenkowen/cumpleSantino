import { onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { typeWithPen } from './usePenWriting'

gsap.registerPlugin(ScrollTrigger)

/**
 * Escribe los párrafos en orden, uno tras otro, con una sola lapicera.
 */
export function useSequentialPenTyping(containerRef, options = {}) {
  const {
    baseSpeed = 55,
    pauseBetween = 450
  } = options

  let running = false

  async function startSequence() {
    if (!containerRef.value || running) return
    running = true

    const paragraphs = [...containerRef.value.querySelectorAll('[data-type-text]')]

    for (const el of paragraphs) {
      const text = el.getAttribute('data-type-text')
      if (!text) continue

      el.textContent = ''
      await typeWithPen(el, text, { baseSpeed })

      if (pauseBetween > 0) {
        await new Promise((resolve) => setTimeout(resolve, pauseBetween))
      }
    }
  }

  onUnmounted(() => {
    running = false
  })

  return { startSequence }
}

export function useScrollAnimations(containerRef) {
  let ctx

  onMounted(() => {
    if (!containerRef.value) return

    ctx = gsap.context(() => {
      const items = containerRef.value.querySelectorAll('.reveal-item')
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true
            }
          }
        )
      })
    }, containerRef.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}

export function useTypingEffect(textRef, fullText, options = {}) {
  const { speed = 50, delay = 0 } = options
  let index = 0
  let timer

  function start() {
    if (!textRef.value) return
    textRef.value.textContent = ''
    index = 0

    timer = setTimeout(() => {
      const type = () => {
        if (index < fullText.length && textRef.value) {
          textRef.value.textContent += fullText[index]
          index++
          timer = setTimeout(type, speed)
        }
      }
      type()
    }, delay)
  }

  function stop() {
    clearTimeout(timer)
  }

  onUnmounted(stop)

  return { start, stop }
}
