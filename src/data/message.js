/**
 * ═══════════════════════════════════════════════════════════════
 *  CARTA DE SANTINO — Contenido editable
 *  Modificá este archivo para personalizar la experiencia.
 * ═══════════════════════════════════════════════════════════════
 */

export default {
  siteUrl: 'https://cumple-santino-gilt.vercel.app',

  // ── Pantalla de bienvenida ──────────────────────────────────
  welcomeText: 'Santino, tengo algo especial para vos ❤️',
  welcomeEmoji: '🍃',
  openButtonText: 'Abrir mi sorpresa',

  // ── Carta principal ───────────────────────────────────────────
  title: 'Feliz Cumpleaños',
  recipientName: 'Santino',
  subtitle: 'Un niño alegre, soñador y lleno de pasión',

  // ── Carta en pergamino (escritura al hacer scroll) ────────────
  parchmentLetter: {
    date: '26 de Mayo, 2026',
    typingSpeed: 36,
    salutation: 'Querido Santino:',
    paragraphs: [
      'Primero que nada, ¡feliz cumpleaños! Y gracias a Dios por regalarte un año más de vida. Te deseo de corazón que seas muy feliz, que cumplas tus sueños y que este año por fin te puedas comer a Eva.',
      'Como sabrás, no soy una persona muy sentimental ni de andar escribiendo este tipo de cosas, pero, a pesar de nuestras altas y bajas, de las discusiones y de los momentos en los que no nos entendimos, yo igual te quiero. Por más que a veces me veas demasiado ortiva o pesado, nunca cambió el cariño que te tengo y nunca va a cambiar.',
      'Y si muchas veces me tocó marcar límites, corregirte o decirte cosas que quizás no querías escuchar, no lo hice para molestarte ni para hacerte sentir mal, sino porque creo que una de las formas de querer a alguien es enseñarle lo que uno considera correcto. Y a veces eso genera distancia o enojos.',
      'Bueno, no soy un hombre de muchas palabras. ¿Qué más decir? Que te quiero, que te cuides (siempre capuchón) y que sabés que contás conmigo para cualquier consejo, problema o situación que tengas.',
      'Te quiero mucho.'
    ],
    signatureLast: true,
    photo: {
      src: '/images/santino-cumple-14.jpg',
      alt: 'Santino — Feliz cumpleaños 14',
      caption: 'Felices 14, Santino 🎂'
    }
  },

  // ── Historia interactiva (scroll) ─────────────────────────────
  story: [
    {
      id: 'welcome',
      emoji: '👋',
      title: 'Hola Santino...',
      subtitle: 'Hoy es tu día y preparamos algo único',
      paragraphs: [
        'Sos un niño increíble: alegre, soñador, fanático de Naruto, de la música y del fútbol.',
        'Esta carta es un viaje por todo lo que te hace especial. Deslizá hacia abajo y descubrí tu sorpresa...'
      ],
      theme: 'default'
    },
    {
      id: 'ninja',
      emoji: '🎌',
      title: 'Nivel Ninja',
      subtitle: 'Tu camino de superación',
      paragraphs: [
        'Como un verdadero shinobi, cada día entrenás para ser mejor. Caés, te levantás y seguís adelante con una sonrisa.',
        'Tu valentía, tu curiosidad y tu corazón noble te convierten en un ninja de verdad — uno que nunca se rinde.'
      ],
      quote: {
        text: 'La verdadera fuerza no está en nunca caer, sino en levantarse cada vez con más ganas.',
        author: '— Para vos, futuro Hokage'
      },
      theme: 'naruto'
    },
    {
      id: 'music',
      emoji: '🎤',
      title: 'Estrella de la Música',
      subtitle: 'Tus artistas favoritos',
      paragraphs: [
        'La música vive en vos. Cuando suena Pablo Londra o Duki, tus ojos brillan y el mundo se detiene.',
        'Soñás en grande, como las estrellas que admirás. Y nosotros soñamos con vos, siempre.'
      ],
      theme: 'music'
    },
    {
      id: 'river',
      emoji: '⚽',
      title: 'Campeón',
      subtitle: 'Pasión Millonaria',
      paragraphs: [
        'River corre por tus venas. Sos hincha de corazón, con la pasión de un verdadero campeón.',
        'En la cancha y en la vida, sabés que el esfuerzo, el trabajo en equipo y nunca bajar los brazos es lo que te lleva lejos.'
      ],
      theme: 'river'
    },
    {
      id: 'family',
      emoji: '💌',
      title: 'Un mensaje especial',
      subtitle: 'Seguí deslizando...',
      paragraphs: [
        'Después de leer la carta, descubrí todo lo que preparamos pensando en vos.',
        'Naruto, la música, River... y sobre todo, la familia. Siempre vamos a estar acá.'
      ],
      theme: 'family'
    }
  ],

  // ── Frases inspiradas en Naruto (originales) ──────────────────
  narutoQuotes: [
    {
      text: 'Los lazos que unen a los amigos son el verdadero poder.',
      author: '— Espíritu ninja'
    },
    {
      text: 'Cada caída es una lección, cada paso te acerca a tu sueño.',
      author: '— Camino del shinobi'
    },
    {
      text: 'Nunca es tarde para ser quien quieras ser.',
      author: '— Para Santino'
    }
  ],

  // ── Artistas favoritos ────────────────────────────────────────
  artists: [
    {
      name: 'Pablo Londra',
      emoji: '🎤',
      color: '#a29bfe',
      gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      description: 'Tus canciones favoritas, tus momentos de felicidad',
      vibe: 'Melodías que te hacen bailar y soñar'
    },
    {
      name: 'Duki',
      emoji: '🎵',
      color: '#00cec9',
      gradient: 'linear-gradient(135deg, #00b894, #00cec9)',
      description: 'El flow que te enciende y te hace sentir invencible',
      vibe: 'Ritmo, energía y actitud de campeón'
    }
  ],

  // ── Canción especial (elegida por los padres) ─────────────────
  featuredSong: {
    enabled: false,
    src: '/audio/cancion-especial.mp3',
    title: 'Canción elegida para vos',
    artist: 'Con amor de mamá y papá'
  },

  // ── River Plate ───────────────────────────────────────────────
  river: {
    title: 'Pasión Millonaria',
    tagline: 'El más grande, siempre en tu corazón',
    emoji: '⚽'
  },

  // ── Pantalla final ────────────────────────────────────────────
  finalStats: [
    { emoji: '🏆', name: 'Santino', stat: 'Nivel Ninja: Máximo' },
    { emoji: '⚽', name: 'Hincha de River', stat: 'Eterno' },
    { emoji: '🎤', name: 'Fan de la música', stat: 'Legendario' },
    { emoji: '❤️', name: 'Querido por su familia', stat: 'Infinito' }
  ],

  replayButtonText: 'Volver a leer mi sorpresa',

  // ── Imágenes orbitando la carta (pantalla de bienvenida) ──────
  orbitImages: [
    { src: '/images/favorites/naruto.png', alt: 'Naruto', angle: 0, size: 80, glow: 'glow-naruto', ring: 0 },
    { src: '/images/favorites/duki.png', alt: 'Duki', angle: 72, size: 70, glow: 'glow-duki', ring: 0 },
    { src: '/images/favorites/pablo-londra.png', alt: 'Pablo Londra', angle: 144, size: 76, glow: 'glow-music', ring: 0 },
    { src: '/images/favorites/francescoli.png', alt: 'Francescoli', angle: 216, size: 78, glow: 'glow-river', ring: 0 },
    { src: '/images/favorites/river-escudo.png', alt: 'River Plate', angle: 288, size: 56, glow: 'glow-river', ring: 0 }
  ],

  // ── Galería de fotos ────────────────────────────────────────────
  photos: [
    {
      src: '/images/favorites/naruto.png',
      alt: 'Naruto - favorito de Santino',
      caption: '¡Dattebayo! Nuestro ninja favorito'
    },
    {
      src: '/images/favorites/duki.png',
      alt: 'Duki',
      caption: 'Flow y energía de campeón'
    },
    {
      src: '/images/favorites/pablo-londra.png',
      alt: 'Pablo Londra',
      caption: 'La música que te hace brillar'
    },
    {
      src: '/images/favorites/francescoli.png',
      alt: 'Enzo Francescoli - River Plate',
      caption: 'Pasión Millonaria eterna'
    }
  ],

  // ── Música de fondo ───────────────────────────────────────────
  music: {
    enabled: false,
    src: '/audio/background.mp3',
    title: 'Canción especial',
    artist: 'Para Santino'
  },

  // ── Efectos de sonido ─────────────────────────────────────────
  sounds: {
    enabled: false,
    buttonTap: '/audio/tap.mp3',
    letterOpen: '/audio/open.mp3'
  },

  // ── Tema visual ───────────────────────────────────────────────
  theme: {
    accentColor: '#e8a0bf',
    glowColor: 'rgba(232, 160, 191, 0.4)',
    narutoOrange: '#ff6b2b',
    narutoBlue: '#4a90d9',
    riverRed: '#ed1c24',
    riverWhite: '#ffffff',
    particleColors: ['#ff6b2b', '#4a90d9', '#e8a0bf', '#ffd700', '#ed1c24']
  }
}
