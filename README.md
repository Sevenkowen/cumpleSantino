# Carta de Cumpleaños Interactiva

Una experiencia web premium y emocional, diseñada para abrirse desde un celular escaneando un QR impreso en 3D.

## Stack

- **Vue 3** — Composition API
- **Quasar Framework** — UI components
- **Vite** — Build tool
- **Pinia** — State management
- **Vue Router** — Routing
- **GSAP** — Animaciones cinematográficas
- **canvas-confetti** — Efecto confetti
- **qrcode** — Generación de QR

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
# o: quasar dev

# Build de producción
npm run build
```

La app se abre en `http://localhost:9000` (puerto por defecto de Quasar).

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Experiencia principal — carta de cumpleaños |
| `/qr` | Generador de QR para imprimir |

## Personalizar contenido

Todo el contenido editable está en un solo archivo:

```
src/data/message.js
```

### Qué podés modificar

| Campo | Descripción |
|-------|-------------|
| `siteUrl` | URL del sitio deployado (para el QR) |
| `welcomeText` | Texto de bienvenida con efecto typing |
| `openButtonText` | Texto del botón principal |
| `title` | Título de la carta |
| `recipientName` | Nombre del cumpleañero/a |
| `subtitle` | Subtítulo bajo el nombre |
| `message` | Mensaje principal (usá `\n` para párrafos) |
| `signature` | Firma al final |
| `quotes` | Frases destacadas |
| `importantDates` | Fechas importantes |
| `photos` | Galería de fotos |
| `music` | Música de fondo |
| `sounds` | Efectos de sonido |
| `theme` | Colores del tema |

### Reemplazar fotos

1. Colocá tus imágenes en `public/images/`
2. Actualizá las rutas en `message.js`:

```js
photos: [
  {
    src: '/images/mi-foto.jpg',
    alt: 'Descripción',
    caption: 'Texto bajo la foto'
  }
]
```

### Agregar música y sonidos

1. Colocá archivos MP3 en `public/audio/`
2. Configurá en `message.js`:

```js
music: {
  enabled: true,
  src: '/audio/background.mp3',
  title: 'Nuestra canción',
  artist: 'Artista'
},
sounds: {
  enabled: true,
  buttonTap: '/audio/tap.mp3',
  letterOpen: '/audio/open.mp3'
}
```

## Deploy en Vercel (gratis)

### Opción 1: Desde GitHub

1. Subí el proyecto a un repositorio de GitHub
2. Andá a [vercel.com](https://vercel.com) e iniciá sesión
3. Click en **"Add New Project"**
4. Importá tu repositorio
5. Vercel detecta automáticamente la config (`vercel.json` ya incluido)
6. Click en **Deploy**

### Opción 2: Desde CLI

```bash
npm i -g vercel
vercel
```

### Configuración incluida

El archivo `vercel.json` ya configura:
- Build command: `npm run build`
- Output: `dist/spa`
- Rewrites SPA para Vue Router (history mode)

## Generar el QR final

1. Deployá la app en Vercel y copiá tu URL (ej: `https://mi-carta.vercel.app`)
2. Editá `src/data/message.js`:

```js
siteUrl: 'https://mi-carta.vercel.app'
```

3. Volvé a deployar (push a GitHub o `vercel --prod`)
4. Abrí `https://tu-dominio.vercel.app/qr` en el navegador
5. Descargá el QR con el botón **"Descargar QR"**
6. Imprimilo en 3D o en papel y regalalo

## Estructura del proyecto

```
src/
├── boot/           # Inicialización (Pinia, GSAP)
├── components/
│   ├── WelcomeScreen.vue      # Pantalla de bienvenida
│   ├── BirthdayLetter.vue     # Carta interactiva
│   ├── FloatingHearts.vue     # Corazones flotantes
│   ├── MusicPlayer.vue        # Reproductor flotante
│   ├── PhotoCarousel.vue      # Carrusel de fotos
│   ├── QRPreview.vue          # Generador de QR
│   ├── BackgroundParticles.vue # Partículas de fondo
│   └── InitialLoader.vue      # Loader cinematográfico
├── composables/    # useAudio, useScrollAnimations
├── data/
│   └── message.js  # ⭐ CONTENIDO EDITABLE
├── layouts/
├── pages/
├── router/
├── stores/
└── utils/
```

## Componentes

| Componente | Función |
|------------|---------|
| `WelcomeScreen` | Entrada cinematográfica con typing effect |
| `BirthdayLetter` | Carta con animación de sobre + scroll animations |
| `FloatingHearts` | Corazones animados flotando |
| `MusicPlayer` | Botón play/pause flotante |
| `PhotoCarousel` | Galería swipeable con Quasar Carousel |
| `QRPreview` | Genera QR descargable de la URL |
| `BackgroundParticles` | Partículas canvas con glow |
| `InitialLoader` | Loader elegante al iniciar |

## Tips mobile

- La app está optimizada para celulares (mobile-first)
- Los botones son táctiles (min 56px)
- Safe areas para iPhones con notch
- La música requiere interacción del usuario (política de autoplay)
- Imágenes precargadas al iniciar

## Licencia

Proyecto personal — hecho con amor.
