import { onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { typeWithPen } from './usePenWriting'

gsap.registerPlugin(ScrollTrigger)

/**
 * Escritura con lapicera activada al hacer scroll.
 */
export function useScrollTyping(containerRef, options = {}) {
  const {
    baseSpeed = 55,
    startAt = 'top 92%',
    autoStartFirst = true,
    firstParagraphDelay = 2800
  } = options

  let ctx
  const typed = new Set()

  function writeParagraph(element, text) {
    if (!element || !text || typed.has(element)) return Promise.resolve()
    typed.add(element)
    return typeWithPen(element, text, { baseSpeed })
  }

  function isInView(el) {
    const rect = el.getBoundingClientRect()
    return rect.top < window.innerHeight * 0.92
  }

  onMounted(async () => {
    await nextTick()
    if (!containerRef.value) return

    ctx = gsap.context(() => {
      const paragraphs = [...containerRef.value.querySelectorAll('[data-type-text]')]

      paragraphs.forEach((el, index) => {
        const fullText = el.getAttribute('data-type-text')
        if (!fullText) return

        el.textContent = ''

        ScrollTrigger.create({
          trigger: el,
          start: startAt,
          once: true,
          onEnter: () => writeParagraph(el, fullText)
        })

        if (autoStartFirst && index === 0) {
          setTimeout(() => {
            if (isInView(el)) writeParagraph(el, fullText)
          }, firstParagraphDelay)
        }
      })

      ScrollTrigger.refresh()
    }, containerRef.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })

  return { writeParagraph, typeWithPen }
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
              toggleActions: 'play none none reverse'
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
