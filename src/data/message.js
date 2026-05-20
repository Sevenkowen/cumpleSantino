/**
 * ═══════════════════════════════════════════════════════════════
 *  CONTENIDO EDITABLE — Modificá este archivo para personalizar
 *  la carta de cumpleaños sin tocar el código de los componentes.
 * ═══════════════════════════════════════════════════════════════
 */

export default {
  // URL del sitio deployado (para generar el QR)
  siteUrl: 'https://cumple-santino-gilt.vercel.app',

  // ── Pantalla de bienvenida ──────────────────────────────────
  welcomeText: 'Santino, tengo algo especial para vos ❤️',
  openButtonText: 'Abrir carta',

  // ── Carta ─────────────────────────────────────────────────────
  title: 'Feliz Cumpleaños',
  recipientName: 'Santino',
  subtitle: 'Hoy es tu día, y quería recordarte lo especial que sos.',

  message: `Cada momento a tu lado es un regalo que atesoro.
Gracias por tu risa, tu luz y por ser exactamente quien sos.

Que este nuevo año te traiga todo lo que soñás,
y que sepas que siempre voy a estar acá, celebrándote.`,

  signature: 'Con todo mi amor 💕',

  // ── Frases destacadas ─────────────────────────────────────────
  quotes: [
    {
      text: 'El amor no se mira, se siente.',
      author: '— Para vos, siempre'
    },
    {
      text: 'Contigo, cada día es una aventura.',
      author: '— Nuestra historia'
    },
    {
      text: 'Eres mi lugar favorito en el mundo.',
      author: '— Sin importar dónde estemos'
    }
  ],

  // ── Fechas importantes ────────────────────────────────────────
  importantDates: [
    {
      label: 'Nuestro primer encuentro',
      date: '15 de Marzo, 2023',
      emoji: '🌹'
    },
    {
      label: 'Tu cumpleaños',
      date: '20 de Mayo',
      emoji: '🎂'
    },
    {
      label: 'Nuestra primera aventura',
      date: 'Verano 2023',
      emoji: '✈️'
    }
  ],

  // ── Galería de fotos ────────────────────────────────────────────
  // Reemplazá las URLs con tus propias imágenes en /public/images/
  photos: [
    {
      src: '/images/photo-1.svg',
      alt: 'Momento especial 1',
      caption: 'Un recuerdo que guardo en el corazón'
    },
    {
      src: '/images/photo-2.svg',
      alt: 'Momento especial 2',
      caption: 'Tu sonrisa ilumina todo'
    },
    {
      src: '/images/photo-3.svg',
      alt: 'Momento especial 3',
      caption: 'Juntos, siempre'
    },
    {
      src: '/images/photo-4.svg',
      alt: 'Momento especial 4',
      caption: 'Aventuras que nunca olvidaré'
    }
  ],

  // ── Música de fondo ─────────────────────────────────────────────
  music: {
    enabled: false,
    src: '/audio/background.mp3',
    title: 'Nuestra canción',
    artist: 'Para vos'
  },

  // ── Efectos de sonido ───────────────────────────────────────────
  sounds: {
    enabled: false,
    buttonTap: '/audio/tap.mp3',
    letterOpen: '/audio/open.mp3'
  },

  // ── Configuración visual ────────────────────────────────────────
  theme: {
    accentColor: '#e8a0bf',
    glowColor: 'rgba(232, 160, 191, 0.4)',
    particleColor: '#e8a0bf'
  }
}
