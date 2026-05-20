<template>
  <div class="equalizer" aria-hidden="true">
    <span
      v-for="i in bars"
      :key="i"
      class="bar"
      :style="{ animationDelay: `${i * 0.1}s`, height: `${heights[i % heights.length]}%` }"
    />
  </div>
</template>

<script setup>
defineProps({
  bars: { type: Number, default: 5 },
  active: { type: Boolean, default: true }
})

const heights = [40, 70, 50, 90, 60, 80, 45]
</script>

<style scoped>
.equalizer {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 24px;
}

.bar {
  width: 4px;
  min-height: 4px;
  background: currentColor;
  border-radius: 2px;
  animation: eq-bounce 0.8s ease-in-out infinite alternate;
}

@keyframes eq-bounce {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}
</style>
