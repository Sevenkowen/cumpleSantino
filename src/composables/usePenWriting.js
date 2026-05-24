/**
 * Escritura letra a letra con efecto de lapicera / tinta.
 * Las palabras nunca se parten a la mitad gracias a .ink-word
 */

const PEN_HTML = `<span class="writing-pen" aria-hidden="true">
  <svg viewBox="0 0 32 32" width="22" height="22" class="pen-svg">
    <path class="pen-body" d="M4 28 L8 24 L22 8 L26 12 L12 26 Z" fill="#1a2744"/>
    <path class="pen-nib" d="M22 8 L26 12 L28 10 L24 6 Z" fill="#c9a227"/>
    <ellipse class="pen-tip" cx="28.5" cy="9.5" rx="1.2" ry="2" fill="#1a2744" transform="rotate(-45 28.5 9.5)"/>
  </svg>
</span>`

function getCharDelay(char, baseSpeed) {
  if ('.!?'.includes(char)) return baseSpeed * 12 + 200
  if (',;:'.includes(char)) return baseSpeed * 5 + 120
  if (char === ' ') return baseSpeed * 0.6
  if (char === '\n') return baseSpeed * 8
  const variance = Math.random() * baseSpeed * 0.45
  return baseSpeed + variance
}

function createInkSpan(char) {
  const span = document.createElement('span')
  span.className = 'ink-letter'
  if (char === ' ') {
    span.innerHTML = '&nbsp;'
    span.classList.add('ink-space')
  } else if (char === '\n') {
    span.innerHTML = '<br>'
    span.classList.add('ink-break')
  } else {
    span.textContent = char
    const rot = (Math.random() - 0.5) * 1.8
    const y = (Math.random() - 0.5) * 1.2
    span.style.setProperty('--ink-rot', `${rot}deg`)
    span.style.setProperty('--ink-y', `${y}px`)
  }
  return span
}

function getPenElement(container) {
  return container.querySelector('.writing-pen')
}

function ensurePen(container) {
  let pen = getPenElement(container)
  if (!pen) {
    container.insertAdjacentHTML('beforeend', PEN_HTML)
    pen = getPenElement(container)
  }
  return pen
}

function movePenToEnd(container) {
  const pen = ensurePen(container)
  if (pen) container.appendChild(pen)
}

/**
 * Escribe texto con efecto de lapicera en un elemento.
 */
export function typeWithPen(element, text, options = {}) {
  const {
    baseSpeed = 55,
    onComplete = null,
    onStart = null
  } = options

  if (!element || !text) return Promise.resolve()

  return new Promise((resolve) => {
    element.textContent = ''
    element.classList.add('is-typing')
    ensurePen(element)
    onStart?.()

    let i = 0
    let cancelled = false
    let currentWordSpan = null

    function resetWordSpan() {
      currentWordSpan = null
    }

    function getWordSpan(pen) {
      if (!currentWordSpan) {
        currentWordSpan = document.createElement('span')
        currentWordSpan.className = 'ink-word'
        element.insertBefore(currentWordSpan, pen)
      }
      return currentWordSpan
    }

    const tick = () => {
      if (cancelled) return

      if (i < text.length) {
        const char = text[i]
        const pen = getPenElement(element)
        const inkSpan = createInkSpan(char)

        if (char === ' ' || char === '\n') {
          if (pen) element.insertBefore(inkSpan, pen)
          else element.appendChild(inkSpan)
          resetWordSpan()
        } else {
          const wordSpan = getWordSpan(pen)
          wordSpan.appendChild(inkSpan)
        }

        movePenToEnd(element)
        i++
        setTimeout(tick, getCharDelay(char, baseSpeed))
      } else {
        const pen = getPenElement(element)
        if (pen) {
          pen.classList.add('pen-finish')
          setTimeout(() => pen.remove(), 600)
        }
        element.classList.remove('is-typing')
        resetWordSpan()
        onComplete?.()
        resolve()
      }
    }

    tick()
    element._cancelPenWriting = () => { cancelled = true }
  })
}

export { getCharDelay, PEN_HTML }
