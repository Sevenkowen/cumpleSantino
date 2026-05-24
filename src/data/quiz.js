/**
 * Banco de preguntas — Santino Quiz
 * Se muestran 10 al azar; las respuestas se guardan en localStorage.
 */

export const QUIZ_STORAGE_KEY = 'santino-quiz-v1'
export const QUIZ_COUNT = 10

export const quizPool = [
  // ── Naruto (medio) ────────────────────────────────────────────
  {
    id: 'naruto-01',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿De qué aldea ninja es Naruto Uzumaki?',
    options: ['Aldea de la Hoja', 'Aldea de la Arena', 'Aldea de la Niebla', 'Aldea de la Roca'],
    correct: 0
  },
  {
    id: 'naruto-02',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Cómo se llama el zorro de nueve colas sellado en Naruto?',
    options: ['Shukaku', 'Kurama', 'Gyūki', 'Matatabi'],
    correct: 1
  },
  {
    id: 'naruto-03',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Quién fue el sensei del Equipo 7?',
    options: ['Jiraiya', 'Kakashi Hatake', 'Iruka Umino', 'Asuma Sarutobi'],
    correct: 1
  },
  {
    id: 'naruto-04',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Cuál es el sueño principal de Naruto?',
    options: ['Ser el ninja más fuerte', 'Ser Hokage', 'Vengar a su clan', 'Encontrar a Sasuke'],
    correct: 1
  },
  {
    id: 'naruto-05',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Cómo se llama el padre de Naruto?',
    options: ['Hiruzen Sarutobi', 'Minato Namikaze', 'Jiraiya', 'Kakashi Hatake'],
    correct: 1
  },
  {
    id: 'naruto-06',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Qué técnica crea Naruto con ayuda de sombras clones?',
    options: ['Chidori', 'Rasengan', 'Amaterasu', 'Katon Gōkakyū'],
    correct: 1
  },
  {
    id: 'naruto-07',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Quién enseña a Naruto a controlar el chakra del Kurama?',
    options: ['Jiraiya', 'Killer Bee', 'Yamato', 'Hiruzen'],
    correct: 1
  },
  {
    id: 'naruto-08',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Cómo se llama la organización criminal de los manto negro con nubes rojas?',
    options: ['Anbu', 'Akatsuki', 'Root', 'Seven Ninja Swordsmen'],
    correct: 1
  },

  // ── River Plate (medio) ───────────────────────────────────────
  {
    id: 'river-01',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Cuál es el apodo de River Plate?',
    options: ['El Ciclón', 'La Banda', 'El Globo', 'El León'],
    correct: 1
  },
  {
    id: 'river-02',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿En qué estadio juega River de local?',
    options: ['La Bombonera', 'El Monumental', 'El Cilindro', 'El Parque'],
    correct: 1
  },
  {
    id: 'river-03',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Cuáles son los colores de River?',
    options: ['Azul y amarillo', 'Rojo y blanco', 'Rojo y negro', 'Verde y blanco'],
    correct: 1
  },
  {
    id: 'river-04',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿En qué año se fundó River Plate?',
    options: ['1899', '1901', '1905', '1913'],
    correct: 1
  },
  {
    id: 'river-05',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Quién es el máximo ídolo histórico conocido como "El Príncipe"?',
    options: ['Borghi', 'Enzo Francescoli', 'Ortega', 'Pescando'],
    correct: 1
  },
  {
    id: 'river-06',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Cuántas Copas Libertadores ganó River hasta 2024?',
    options: ['2', '3', '4', '6'],
    correct: 2
  },
  {
    id: 'river-07',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Cuál es el clásico más importante de River?',
    options: ['Superclásico vs Boca', 'Clásico vs Racing', 'Clásico vs Independiente', 'Clásico vs San Lorenzo'],
    correct: 0
  },
  {
    id: 'river-08',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Qué entrenador llevó a River a ganar la Libertadores 2018?',
    options: ['Gallardo', 'Bianchi', 'Passarella', 'Ramón Díaz'],
    correct: 0
  },

  // ── Duki (medio) ──────────────────────────────────────────────
  {
    id: 'duki-01',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿De qué país es Duki?',
    options: ['Uruguay', 'Argentina', 'Chile', 'España'],
    correct: 1
  },
  {
    id: 'duki-02',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿Qué género musical popularizó Duki?',
    options: ['Cumbia', 'Trap argentino', 'Reggaetón clásico', 'Rock nacional'],
    correct: 1
  },
  {
    id: 'duki-03',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿Cómo se llama el álbum de Duki de 2021?',
    options: ['Desde el Fin del Mundo', 'Antes de Ameri', 'Super Sangre Joven', 'Desde el Oeste'],
    correct: 0
  },
  {
    id: 'duki-04',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿Con quién grabó Duki el tema "Goteo"?',
    options: ['Nicki Nicole', 'Bizarrap', 'Khea', 'No fue un feat, es solo de Duki'],
    correct: 3
  },
  {
    id: 'duki-05',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿De qué ciudad argentina es Duki?',
    options: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
    correct: 0
  },
  {
    id: 'duki-06',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿Qué colectivo/crew estuvo ligado al inicio de Duki?',
    options: ['MDB', 'Duki Records', 'C.R.O y el movimiento freestyle', 'La Mole'],
    correct: 2
  },
  {
    id: 'duki-07',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿Qué tema de Duki incluye la frase "She Don\'t Give a Fo"?',
    options: ['Malbec', 'She Don\'t Give a Fo', 'Como Si Fuera Ayer', 'Si Te Sentís Sola'],
    correct: 1
  },

  // ── Pablo Londra (medio) ──────────────────────────────────────
  {
    id: 'pablo-01',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'medio',
    question: '¿De qué provincia argentina es Pablo Londra?',
    options: ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Tucumán'],
    correct: 1
  },
  {
    id: 'pablo-02',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'medio',
    question: '¿Cuál fue uno de los primeros grandes hits de Pablo Londra?',
    options: ['Adán y Eva', 'No Te Enamores', 'Tal Vez', 'Chica'],
    correct: 1
  },
  {
    id: 'pablo-03',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'medio',
    question: '¿Con quién grabó Pablo Londra el tema "Adán y Eva"?',
    options: ['Es solo de Pablo Londra', 'Duki', 'Maria Becerra', 'Nicki Nicole'],
    correct: 0
  },
  {
    id: 'pablo-04',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'medio',
    question: '¿Qué álbum incluye "Tal Vez" y "Necesitado"?',
    options: ['Homerun', 'Back to the Game', 'Otra Noche', 'Living'],
    correct: 0
  },
  {
    id: 'pablo-05',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'medio',
    question: '¿Qué estilo mezcla principalmente Pablo Londra?',
    options: ['Pop urbano y rap', 'Cumbia villera', 'Heavy metal', 'Folklore'],
    correct: 0
  },
  {
    id: 'pablo-06',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'medio',
    question: '¿En qué año aproximadamente explotó Pablo Londra con "No Te Enamores"?',
    options: ['2015', '2017', '2019', '2022'],
    correct: 1
  },
  {
    id: 'pablo-07',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'medio',
    question: '¿Pablo Londra colaboró con Lenny Tavárez en qué tema famoso?',
    options: ['N.A.V.I', 'Te Amo', 'Solo Pienso en Ti', 'Forever Alone'],
    correct: 0
  },

  // ── Pokémon Gen 1 (difícil) ───────────────────────────────────
  {
    id: 'poke-01',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Qué Pokémon mítico puede aprender cualquier MT y HM en Red/Blue?',
    options: ['Mew', 'Mewtwo', 'Ditto', 'Arceus'],
    correct: 0
  },
  {
    id: 'poke-02',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿En qué ciudad está el gimnasio de Sabrina (tipo Psíquico)?',
    options: ['Ciudad Celeste', 'Ciudad Azafrán', 'Ciudad Carmín', 'Ciudad Azulona'],
    correct: 1
  },
  {
    id: 'poke-03',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Cómo evoluciona Graveler a Golem en la primera generación?',
    options: ['Piedra Lunar', 'Intercambio', 'Nivel 40', 'Piedra Agua'],
    correct: 1
  },
  {
    id: 'poke-04',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Dónde capturás a Articuno en Pokémon Rojo/Azul?',
    options: ['Islas Espuma', 'Meseta Añil', 'Torre Pokémon', 'Calle Victoria'],
    correct: 0
  },
  {
    id: 'poke-05',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Qué fósil revive a Aerodactyl en el laboratorio de Cinnabar?',
    options: ['Fósil Domo', 'Ámbar Viejo', 'Hueso Raro', 'Raíz Grande'],
    correct: 1
  },
  {
    id: 'poke-06',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Cuántas medallas necesitás para usar Surf fuera de combate en Gen 1?',
    options: ['3', '4', '5', '8'],
    correct: 2
  },
  {
    id: 'poke-07',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Qué bug famoso de Red/Blue duplica el 6.º ítem de tu mochila?',
    options: ['MissingNo', 'Mew glitch', 'Pikachu surf', 'Zapdos softlock'],
    correct: 0
  },
  {
    id: 'poke-08',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: 'En Gen 1, ¿por qué los movimientos tipo Fantasma no afectan a Psíquico?',
    options: ['Es inmunidad real', 'Es un bug del juego', 'Psíquico es tipo dual', 'Fantasma no hace daño'],
    correct: 1
  },
  {
    id: 'poke-09',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿En qué piso de Silph S.A. te regalan un Lapras en Rojo/Azul?',
    options: ['Piso 3', 'Piso 5', 'Piso 7', 'Piso 10'],
    correct: 2
  },
  {
    id: 'poke-10',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Qué stat de un Pokémon influye en la probabilidad de golpe crítico en Gen 1?',
    options: ['Ataque', 'Velocidad', 'Defensa', 'Ataque Especial'],
    correct: 1
  },
  {
    id: 'poke-11',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Cuál es la única forma de obtener a Mew de forma legítima en eventos originales?',
    options: ['Torre Pokémon', 'Evento Nintendo distribuido', 'Isla Misteriosa', 'Intercambio con NPC'],
    correct: 1
  }
]

export const PRIZE_PER_CORRECT = 10000
export const PARENT_WHATSAPP = '5491163679158'

export function formatPrize(amount) {
  return amount.toLocaleString('es-AR')
}

export function calculatePrize(answers) {
  if (!answers) return 0
  return Object.values(answers).filter((a) => a?.correct).length * PRIZE_PER_CORRECT
}

export function wasPageRefreshed() {
  const nav = performance.getEntriesByType('navigation')[0]
  return nav?.type === 'reload'
}

export function buildWhatsAppUrl(correct, total, prize) {
  const text = `🎂 *Quiz cumple Santino*

Respuestas correctas: ${correct}/${total}
*Total a transferir MercadoPago: $${formatPrize(prize)}*

Enviado desde la carta de cumpleaños ❤️`
  return `https://wa.me/${PARENT_WHATSAPP}?text=${encodeURIComponent(text)}`
}

/** Aviso silencioso al padre — Santino no ve nada */
export async function notifyParentSilently(correct, total, prize) {
  try {
    await fetch('/api/notify-parent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correct, total, prize }),
      keepalive: true
    })
  } catch {
    // Silencioso — no mostrar errores a Santino
  }
}

/** Mezcla y elige N preguntas variadas (al menos 1 por categoría si hay suficientes) */
export function pickQuizQuestions(pool, count = QUIZ_COUNT) {
  const categories = [...new Set(pool.map((q) => q.category))]
  const selected = []
  const usedIds = new Set()

  // Al menos una de cada categoría
  categories.forEach((cat) => {
    const catQuestions = pool.filter((q) => q.category === cat)
    const pick = catQuestions[Math.floor(Math.random() * catQuestions.length)]
    if (pick && !usedIds.has(pick.id)) {
      selected.push(pick)
      usedIds.add(pick.id)
    }
  })

  // Completar hasta count
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  for (const q of shuffled) {
    if (selected.length >= count) break
    if (!usedIds.has(q.id)) {
      selected.push(q)
      usedIds.add(q.id)
    }
  }

  return selected.sort(() => Math.random() - 0.5).slice(0, count)
}

export function loadQuizState() {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveQuizState(state) {
  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function initQuizState(pool, count = QUIZ_COUNT) {
  const saved = loadQuizState()

  // Refresh = autodestrucción del quiz
  if (wasPageRefreshed() && saved?.questionIds?.length && !saved.destroyed) {
    const lostPrize = calculatePrize(saved.answers)
    const destroyedState = {
      destroyed: true,
      lostPrize,
      destroyedAt: Date.now()
    }
    saveQuizState(destroyedState)
    return { destroyed: true, lostPrize, questions: [], answers: {} }
  }

  if (saved?.destroyed) {
    return {
      destroyed: true,
      lostPrize: saved.lostPrize || 0,
      questions: [],
      answers: {}
    }
  }

  if (saved?.questionIds?.length) {
    const questions = saved.questionIds
      .map((id) => pool.find((q) => q.id === id))
      .filter(Boolean)
    if (questions.length === count) {
      const answers = saved.answers || {}
      const allDone = questions.every((q) => answers[q.id] != null)
      return {
        questionIds: saved.questionIds,
        answers,
        completed: allDone || saved.completed || false,
        parentNotified: saved.parentNotified || saved.whatsappSent || false,
        questions
      }
    }
  }

  const questions = pickQuizQuestions(pool, count)
  const state = {
    questionIds: questions.map((q) => q.id),
    answers: {},
    completed: false,
    parentNotified: false
  }
  saveQuizState(state)
  return { ...state, questions }
}
