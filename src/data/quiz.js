/**
 * Banco de preguntas — Santino Quiz
 * Se muestran 10 al azar; las respuestas se guardan en localStorage.
 */

export const QUIZ_STORAGE_KEY = 'santino-quiz-v2'
export const QUIZ_COUNT = 10

export const quizPool = [
  // ── Naruto ────────────────────────────────────────────────────
  {
    id: 'naruto-01',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'difícil',
    question: '¿Quién atacó Konoha la noche del nacimiento de Naruto y extrajo al Kurama?',
    options: ['Orochimaru', 'Obito Uchiha', 'Pain', 'Madara Uchiha'],
    correct: 1
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
    difficulty: 'difícil',
    question: '¿Quién fue el sensei de los tres Sannin legendarios (Jiraiya, Tsunade y Orochimaru)?',
    options: ['Minato Namikaze', 'Hiruzen Sarutobi', 'Tobirama Senju', 'Kakashi Hatake'],
    correct: 1
  },
  {
    id: 'naruto-04',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿En qué examen ninja se enfrentó el Equipo 7 contra el Equipo de Guy por primera vez?',
    options: ['Examen Chūnin', 'Examen Genin', 'Examen Jonin', 'Guerra Ninja'],
    correct: 0
  },
  {
    id: 'naruto-05',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Qué Kage era el padre de Naruto?',
    options: ['Tercer Hokage', 'Cuarto Hokage', 'Quinto Hokage', 'Segundo Hokage'],
    correct: 1
  },
  {
    id: 'naruto-06',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'difícil',
    question: '¿Quién le enseñó el Rasengan a Minato, y Minato se lo enseñó a Naruto?',
    options: ['Jiraiya', 'Kakashi', 'Hiruzen', 'Orochimaru'],
    correct: 0
  },
  {
    id: 'naruto-07',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'difícil',
    question: '¿Dónde entrena Naruto para dominar el Modo Sabio con los sapos?',
    options: ['Monte Hokage', 'Monte Myōboku', 'Valle del Fin', 'Aldea de la Niebla'],
    correct: 1
  },
  {
    id: 'naruto-08',
    category: 'Naruto',
    emoji: '🍃',
    difficulty: 'medio',
    question: '¿Cuántas colas tiene el demonio Shukaku, el bijuu de Gaara?',
    options: ['Una', 'Tres', 'Seis', 'Nueve'],
    correct: 0
  },

  // ── River Plate ───────────────────────────────────────────────
  {
    id: 'river-01',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿En qué año River ganó la Libertadores en el Santiago Bernabéu?',
    options: ['2015', '2018', '2019', '2021'],
    correct: 1
  },
  {
    id: 'river-02',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'difícil',
    question: '¿En qué año River descendió por primera vez en su historia?',
    options: ['2008', '2011', '2014', 'Nunca descendió'],
    correct: 1
  },
  {
    id: 'river-03',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿A qué club europeo se fue Enzo Francescoli después de su primera etapa en River?',
    options: ['Juventus', 'AS Mónaco', 'Real Madrid', 'París Saint-Germain'],
    correct: 1
  },
  {
    id: 'river-04',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'difícil',
    question: '¿Quién era el arquero de River en la final de Libertadores 2018 vs Boca?',
    options: ['Franco Armani', 'Germán Lux', 'Juan Pablo Carrizo', 'Gallese'],
    correct: 0
  },
  {
    id: 'river-05',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Cuántas Copas Libertadores ganó River hasta 2024?',
    options: ['2', '3', '4', '6'],
    correct: 2
  },
  {
    id: 'river-06',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'difícil',
    question: '¿Contra qué equipo ganó River la Copa Sudamericana 2014?',
    options: ['San Lorenzo', 'Atlético Nacional', 'Independiente', 'Lanús'],
    correct: 1
  },
  {
    id: 'river-07',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'medio',
    question: '¿Quién pateó el penal decisivo en la final de Libertadores 2018 vs Boca?',
    options: ['Pratto', 'Juanfer Quintero', 'Scocco', 'Pity Martínez'],
    correct: 1
  },
  {
    id: 'river-08',
    category: 'River Plate',
    emoji: '⚽',
    difficulty: 'difícil',
    question: '¿Contra qué equipo colombiano ganó River la Copa Libertadores 1996?',
    options: ['Atlético Nacional', 'América de Cali', 'Millonarios', 'Deportivo Cali'],
    correct: 1
  },

  // ── Duki ──────────────────────────────────────────────────────
  {
    id: 'duki-01',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿En qué año salió el álbum "Antes de Ameri" de Duki?',
    options: ['2017', '2019', '2021', '2023'],
    correct: 1
  },
  {
    id: 'duki-02',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'difícil',
    question: '¿Con quién lanzó Duki el proyecto "$$$" en sus inicios?',
    options: ['Bizarrap y Nicki Nicole', 'Khea y C.R.O', 'Paulo Londra y YSY A', 'Trueno y Wos'],
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
    difficulty: 'difícil',
    question: '¿En qué álbum de Duki está el tema "Goteo"?',
    options: ['Super Sangre Joven', 'Antes de Ameri', 'Desde el Fin del Mundo', 'Desde el Oeste'],
    correct: 1
  },
  {
    id: 'duki-05',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'difícil',
    question: '¿Cuál es el nombre real de Duki?',
    options: ['Mauro Alejandro Lombardo', 'Carlos Nahuel Matías', 'Santiago Gotan Luzardo', 'Joan Agustín Burgos'],
    correct: 0
  },
  {
    id: 'duki-06',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'medio',
    question: '¿Qué sello fundó Duki para lanzar su propia música?',
    options: ['Rimas Entertainment', 'SSJ Records / Duki Records', 'Sony Music Argentina', 'MDB Label'],
    correct: 1
  },
  {
    id: 'duki-07',
    category: 'Duki',
    emoji: '🎵',
    difficulty: 'difícil',
    question: '¿Con quién grabó Duki el tema "Malbec" en "Desde el Fin del Mundo"?',
    options: ['Nicki Nicole', 'Bizarrap', 'Quevedo', 'Es un tema solo de Duki'],
    correct: 3
  },

  // ── Pablo Londra ──────────────────────────────────────────────
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
    difficulty: 'difícil',
    question: '¿En qué álbum está el tema "Adán y Eva" de Pablo Londra?',
    options: ['Homerun', 'Back to the Game', 'Otra Noche', 'Living'],
    correct: 0
  },
  {
    id: 'pablo-03',
    category: 'Pablo Londra',
    emoji: '🎤',
    difficulty: 'difícil',
    question: '¿Con quién colaboró Pablo Londra en el tema "N.A.V.I"?',
    options: ['Lenny Tavárez', 'Duki', 'Maria Becerra', 'Nicki Nicole'],
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
    difficulty: 'difícil',
    question: '¿Cuál fue el primer álbum de estudio de Pablo Londra?',
    options: ['Homerun', 'Back to the Game', 'Living', 'Otra Noche'],
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
    difficulty: 'difícil',
    question: '¿Quién produjo la mayoría del álbum "Homerun" de Pablo Londra?',
    options: ['Timbaland', 'Ovy on the Drums', 'Bizarrap', 'Federico Vindver'],
    correct: 1
  },

  // ── Pokémon Gen 1 ─────────────────────────────────────────────
  {
    id: 'poke-01',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'medio',
    question: '¿Cómo evoluciona Graveler a Golem en la primera generación?',
    options: ['Piedra Lunar', 'Intercambio', 'Nivel 40', 'Piedra Agua'],
    correct: 1
  },
  {
    id: 'poke-02',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'medio',
    question: '¿Qué fósil revive a Aerodactyl en el laboratorio de Isla Canela?',
    options: ['Fósil Domo', 'Ámbar Viejo', 'Hueso Raro', 'Raíz Grande'],
    correct: 1
  },
  {
    id: 'poke-03',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Cuántas medallas necesitás para usar Surf fuera de combate en Gen 1?',
    options: ['3', '4', '5', '8'],
    correct: 2
  },
  {
    id: 'poke-04',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'medio',
    question: '¿En qué ciudad está el gimnasio de Sabrina (tipo Psíquico)?',
    options: ['Ciudad Celeste', 'Ciudad Azafrán', 'Ciudad Carmín', 'Ciudad Azulona'],
    correct: 1
  },
  {
    id: 'poke-05',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Qué tipo era inefectivo contra Psíquico en Gen 1 por un bug del juego?',
    options: ['Lucha', 'Fantasma', 'Veneno', 'Hielo'],
    correct: 1
  },
  {
    id: 'poke-06',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'medio',
    question: '¿Dónde capturás a Articuno en Pokémon Rojo/Azul?',
    options: ['Islas Espuma', 'Meseta Añil', 'Torre Pokémon', 'Calle Victoria'],
    correct: 0
  },
  {
    id: 'poke-07',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿En qué piso de Silph S.A. te regalan un Lapras en Rojo/Azul?',
    options: ['Piso 3', 'Piso 5', 'Piso 7', 'Piso 10'],
    correct: 2
  },
  {
    id: 'poke-08',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'medio',
    question: '¿Qué Pokémon evoluciona con la Piedra Lunar en Gen 1?',
    options: ['Growlithe', 'Clefairy', 'Magikarp', 'Abra'],
    correct: 1
  },
  {
    id: 'poke-09',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Qué líder de gimnasio también es el jefe de Team Rocket en Gen 1?',
    options: ['Lt. Surge', 'Erika', 'Giovanni', 'Brock'],
    correct: 2
  },
  {
    id: 'poke-10',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'medio',
    question: '¿Cómo evoluciona Machoke a Machamp en la primera generación?',
    options: ['Nivel 45', 'Intercambio', 'Piedra Agua', 'Piedra Lucha'],
    correct: 1
  },
  {
    id: 'poke-11',
    category: 'Pokémon Gen 1',
    emoji: '⚡',
    difficulty: 'difícil',
    question: '¿Qué Pokémon mítico puede aprender cualquier MT y HM en Red/Blue?',
    options: ['Mew', 'Mewtwo', 'Ditto', 'Arceus'],
    correct: 0
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
