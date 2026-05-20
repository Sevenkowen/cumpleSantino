<template>
  <q-page class="qr-page">
    <BackgroundParticles />
    <QRPreview />
  </q-page>
</template>

<script setup>
import BackgroundParticles from 'src/components/BackgroundParticles.vue'
import QRPreview from 'src/components/QRPreview.vue'
</script>

<style scoped>
.qr-page {
  background: #0a0a0f;
  min-height: 100dvh;
}
</style>
