<template>
  <div class="qr-preview">
    <div class="qr-card glass-strong glow-accent">
      <h2 class="qr-title text-gradient">Código QR</h2>
      <p class="qr-subtitle">
        Escaneá este código para abrir la carta de cumpleaños
      </p>

      <div class="qr-image-wrapper">
        <img
          v-if="qrDataUrl"
          :src="qrDataUrl"
          alt="QR Code"
          class="qr-image"
        />
        <q-spinner-dots v-else color="primary" size="48px" />
      </div>

      <p class="qr-print-note">
        Para imprimir: negro sobre blanco, mínimo 3×3 cm, superficie plana.
      </p>

      <div class="qr-url">
        <q-icon name="link" size="16px" class="q-mr-xs" />
        <span>{{ siteUrl }}</span>
      </div>

      <div class="qr-actions">
        <q-btn
          unelevated
          rounded
          color="white"
          text-color="dark"
          icon="fullscreen"
          label="QR pantalla completa (para escanear)"
          class="q-mb-sm"
          to="/qr-pantalla"
        />
        <q-btn
          unelevated
          rounded
          color="primary"
          text-color="dark"
          icon="download"
          label="Descargar QR"
          class="q-mb-sm"
          :disable="!qrDataUrl"
          @click="downloadQR"
        />
        <q-btn
          flat
          rounded
          color="white"
          icon="content_copy"
          label="Copiar URL"
          @click="copyUrl"
        />
      </div>

      <p class="qr-hint">
        Imprimí este QR en 3D o en papel y regalalo como sorpresa 🎁
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import QRCode from 'qrcode'
import { useAppStore } from 'src/stores/app'

const $q = useQuasar()
const store = useAppStore()
const qrDataUrl = ref('')
const siteUrl = store.data.siteUrl

onMounted(async () => {
  try {
    qrDataUrl.value = await QRCode.toDataURL(siteUrl, {
      width: 400,
      margin: 4,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })
  } catch (err) {
    console.error('Error generating QR:', err)
  }
})

function downloadQR() {
  if (!qrDataUrl.value) return
  const link = document.createElement('a')
  link.download = 'carta-cumpleanos-qr.png'
  link.href = qrDataUrl.value
  link.click()
  $q.notify({ message: 'QR descargado', color: 'positive', position: 'top' })
}

function copyUrl() {
  navigator.clipboard.writeText(siteUrl).then(() => {
    $q.notify({ message: 'URL copiada', color: 'positive', position: 'top' })
  }).catch(() => {
    $q.notify({ message: 'No se pudo copiar', color: 'negative', position: 'top' })
  })
}
</script>

<style scoped>
.qr-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 24px 16px;
}

.qr-card {
  max-width: 400px;
  width: 100%;
  padding: 32px 24px;
  text-align: center;
}

.qr-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 8px;
}

.qr-subtitle {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0 0 24px;
  line-height: 1.5;
}

.qr-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  margin-bottom: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 16px;
}

.qr-image {
  width: 400px;
  height: 400px;
  display: block;
}

.qr-print-note {
  font-size: 0.75rem;
  opacity: 0.55;
  margin: 0 0 16px;
  line-height: 1.4;
}

.qr-url {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  opacity: 0.6;
  margin-bottom: 24px;
  word-break: break-all;
}

.qr-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
}

.qr-hint {
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 0;
  line-height: 1.4;
}
</style>
