import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Efecto de escritura activado al hacer scroll.
 * Cada párrafo se "escribe" cuando entra en pantalla.
 */
export function useScrollTyping(containerRef, options = {}) {
  const { speed = 18, startAt = 'top 82%' } = options
  let ctx
  const timers = []

  function typeParagraph(element, text) {
    return new Promise((resolve) => {
      element.textContent = ''
      element.classList.add('is-typing')
      let i = 0

      const tick = () => {
        if (i < text.length) {
          element.textContent += text[i]
          i++
          const delay = text[i - 1] === '.' || text[i - 1] === '?' ? speed * 6 : speed
          const t = setTimeout(tick, delay)
          timers.push(t)
        } else {
          element.classList.remove('is-typing')
          resolve()
        }
      }

      tick()
    })
  }

  onMounted(() => {
    if (!containerRef.value) return

    ctx = gsap.context(() => {
      const paragraphs = containerRef.value.querySelectorAll('[data-type-text]')

      paragraphs.forEach((el) => {
        const fullText = el.getAttribute('data-type-text')
        if (!fullText) return

        el.textContent = ''
        el.style.opacity = '1'

        ScrollTrigger.create({
          trigger: el,
          start: startAt,
          once: true,
          onEnter: () => {
            typeParagraph(el, fullText)
          }
        })
      })
    }, containerRef.value)
  })

  onUnmounted(() => {
    timers.forEach(clearTimeout)
    ctx?.revert()
  })
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
