import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
