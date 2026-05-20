Colocá aquí tus archivos de audio:

- background.mp3  → Música de fondo (loop)
- tap.mp3         → Sonido al tocar botones
- open.mp3        → Sonido al abrir la carta

Formato recomendado: MP3, 128kbps, menos de 5MB para background.

Si no tenés archivos de audio, la app funciona igual —
simplemente desactivá los sonidos en src/data/message.js:

  music: { enabled: false, ... }
  sounds: { enabled: false, ... }
