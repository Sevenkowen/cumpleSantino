<template>
  <section
    class="story-section reveal-item"
    :class="['theme-' + chapter.theme, { unlocked: unlocked }]"
    :data-chapter="chapter.id"
  >
    <div class="chapter-badge" :class="'badge-' + chapter.theme">
      <span class="chapter-emoji">{{ chapter.emoji }}</span>
    </div>

    <h2 class="chapter-title" :class="'title-' + chapter.theme">
      {{ chapter.title }}
    </h2>
    <p class="chapter-subtitle">{{ chapter.subtitle }}</p>

    <div class="chapter-divider" :class="'divider-' + chapter.theme" />

    <div class="chapter-body">
      <p
        v-for="(p, i) in chapter.paragraphs"
        :key="i"
        class="chapter-paragraph"
      >{{ p }}</p>
    </div>

    <div v-if="chapter.quote" class="chapter-quote glass" :class="'quote-' + chapter.theme">
      <p class="quote-text">"{{ chapter.quote.text }}"</p>
      <p class="quote-author">{{ chapter.quote.author }}</p>
    </div>

    <div v-if="chapter.signature" class="chapter-signature">
      <p>{{ chapter.signature }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  chapter: { type: Object, required: true },
  unlocked: { type: Boolean, default: true }
})
</script>

<style scoped>
.story-section {
  margin-bottom: 48px;
  text-align: center;
  padding: 0 4px;
}

.chapter-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
}

.badge-naruto {
  background: rgba(255, 107, 43, 0.15);
  border-color: rgba(255, 107, 43, 0.3);
  box-shadow: 0 0 30px rgba(255, 107, 43, 0.2);
}

.badge-music {
  background: rgba(162, 155, 254, 0.15);
  border-color: rgba(162, 155, 254, 0.3);
  box-shadow: 0 0 30px rgba(162, 155, 254, 0.2);
}

.badge-river {
  background: rgba(237, 28, 36, 0.15);
  border-color: rgba(237, 28, 36, 0.3);
  box-shadow: 0 0 30px rgba(237, 28, 36, 0.2);
}

.badge-family {
  background: rgba(232, 160, 191, 0.15);
  border-color: rgba(232, 160, 191, 0.3);
  box-shadow: 0 0 30px rgba(232, 160, 191, 0.2);
}

.chapter-emoji {
  font-size: 1.8rem;
}

.chapter-title {
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 700;
  margin: 0 0 6px;
  line-height: 1.2;
}

.title-naruto {
  background: linear-gradient(135deg, #ff6b2b, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-music {
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-river {
  background: linear-gradient(135deg, #ed1c24, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-default, .title-family {
  background: linear-gradient(135deg, #e8a0bf, #c9a0dc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chapter-subtitle {
  font-size: 0.9rem;
  opacity: 0.6;
  margin: 0 0 16px;
}

.chapter-divider {
  width: 50px;
  height: 2px;
  margin: 0 auto 20px;
  border-radius: 2px;
}

.divider-naruto { background: linear-gradient(90deg, transparent, #ff6b2b, transparent); }
.divider-music { background: linear-gradient(90deg, transparent, #a29bfe, transparent); }
.divider-river { background: linear-gradient(90deg, transparent, #ed1c24, transparent); }
.divider-default, .divider-family { background: linear-gradient(90deg, transparent, #e8a0bf, transparent); }

.chapter-body {
  margin-bottom: 20px;
}

.chapter-paragraph {
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.85;
  margin: 0 0 14px;
}

.chapter-quote {
  padding: 20px;
  margin-top: 8px;
  text-align: center;
}

.quote-naruto { border-left: 3px solid #ff6b2b; }
.quote-music { border-left: 3px solid #a29bfe; }
.quote-river { border-left: 3px solid #ed1c24; }

.quote-text {
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
  margin: 0 0 8px;
  opacity: 0.9;
}

.quote-author {
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 0;
}

.chapter-signature {
  margin-top: 24px;
  font-size: 1.1rem;
  font-style: italic;
  opacity: 0.85;
}
</style>
