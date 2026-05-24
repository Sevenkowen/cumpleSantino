<template>
  <div class="qr-scan-page" @click="toggleFullscreen">
    <div class="qr-scan-inner">
      <img
        v-if="qrDataUrl"
        :src="qrDataUrl"
        alt="QR Carta Santino"
        class="qr-scan-image"
      />
      <q-spinner-dots v-else color="dark" size="64px" />
    </div>
    <p class="qr-scan-url">{{ siteUrl }}</p>
    <p class="qr-scan-tip">Tocá la pantalla para pantalla completa · Escaneá con el celular</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'
import { useAppStore } from 'src/stores/app'

const store = useAppStore()
const siteUrl = store.data.siteUrl
const qrDataUrl = ref('')

onMounted(async () => {
  try {
    qrDataUrl.value = await QRCode.toDataURL(siteUrl, {
      width: 1024,
      margin: 4,
      color: { dark: '#000000', light: '#FFFFFF' },
      errorCorrectionLevel: 'H'
    })
  } catch (err) {
    console.error('Error generating QR:', err)
  }
})

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.()
  } else {
    document.documentElement.requestFullscreen?.()
  }
}
</script>

<style scoped>
.qr-scan-page {
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
  user-select: none;
}

.qr-scan-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(92vw, 92vh);
  height: min(92vw, 92vh);
  background: #ffffff;
}

.qr-scan-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.qr-scan-url {
  margin: 20px 0 6px;
  font-family: system-ui, sans-serif;
  font-size: 0.85rem;
  color: #333;
  text-align: center;
  word-break: break-all;
}

.qr-scan-tip {
  margin: 0;
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  color: #888;
  text-align: center;
}
</style>
