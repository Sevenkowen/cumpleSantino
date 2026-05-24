<template>
  <!-- Quiz autodestruido por refresh -->
  <section v-if="destroyed" class="santino-quiz destroyed-screen">
    <div class="destroyed-card glass">
      <span class="destroyed-icon">💥</span>
      <h3>Quiz autodestruido</h3>
      <p>Refrescaste la pantalla y perdiste el premio.</p>
      <p v-if="lostPrize > 0" class="destroyed-lost">
        Se perdieron ${{ formatPrize(lostPrize) }} en MercadoPago
      </p>
      <p class="destroyed-warn">⚠️ Una sola oportunidad. Sin refresh.</p>
    </div>
  </section>

  <section v-else class="santino-quiz reveal-item" ref="quizRef">
    <!-- Intro del premio -->
    <div class="quiz-intro glass-strong glow-accent">
      <span class="intro-icon">🎁</span>
      <h3 class="quiz-title">Quiz por tu regalo</h3>
      <p class="quiz-rules">
        Completá el quiz para ganar tu regalo de cumpleaños.
        <strong>${{ formatPrize(prizePerCorrect) }}</strong> en MercadoPago
        por cada respuesta correcta.
      </p>
      <div class="quiz-warnings">
        <span class="warn-item">❤️ Solo tenés <strong>una vida</strong></span>
        <span class="warn-item">💥 Si refrescás, el quiz se autodestruye</span>
      </div>
      <div class="prize-total glass">
        <img src="/images/mp-icon.svg" alt="" class="mp-icon" v-if="false" />
        <span class="mp-label">💙 MercadoPago acumulado</span>
        <span class="mp-amount">${{ formatPrize(totalPrize) }}</span>
      </div>
    </div>

    <!-- Game over por error -->
    <div v-if="gameOver && !completed" class="gameover-banner">
      <span>💔 Perdiste tu vida — Quiz terminado</span>
    </div>

    <!-- Preguntas -->
    <div class="quiz-list">
      <article
        v-for="(q, index) in questions"
        :key="q.id"
        class="quiz-card glass"
        :class="[cardClass(q.id), { locked: isLocked(q.id, index) }]"
      >
        <div class="quiz-card-top">
          <span class="quiz-num">{{ index + 1 }}</span>
          <span class="quiz-category">{{ q.emoji }} {{ q.category }}</span>
          <span class="quiz-diff" :class="`diff-${q.difficulty}`">{{ q.difficulty }}</span>
        </div>

        <!-- Premio por acierto -->
        <div class="prize-badge">
          💙 +${{ formatPrize(prizePerCorrect) }} MercadoPago
        </div>

        <p class="quiz-question">{{ q.question }}</p>

        <!-- Ganó en esta pregunta -->
        <div v-if="answers[q.id]?.correct" class="won-badge">
          ✅ Ganaste ${{ formatPrize(prizePerCorrect) }} en MercadoPago
        </div>

        <div class="quiz-options">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="quiz-option"
            :class="optionClass(q.id, oi, q.correct)"
            :disabled="isAnswered(q.id) || isLocked(q.id, index)"
            @click="selectAnswer(q.id, oi, q.correct)"
          >
            <span class="option-letter">{{ ['A', 'B', 'C', 'D'][oi] }}</span>
            <span class="option-text">{{ opt }}</span>
            <q-icon
              v-if="showResult(q.id, oi, q.correct)"
              :name="oi === q.correct ? 'check_circle' : 'cancel'"
              size="18px"
            />
          </button>
        </div>
      </article>
    </div>

    <!-- Pantalla final -->
    <div v-if="completed || (gameOver && answeredCount > 0)" class="final-screen glass-strong">
      <span class="final-cake">🎂</span>
      <h2 class="final-title">¡Feliz Cumpleaños Santino!</h2>
      <p class="final-gift">Tu regalo de cumpleaños son</p>
      <p class="final-amount">${{ formatPrize(totalPrize) }}</p>
      <p class="final-mp">en MercadoPago 💙</p>
      <p class="final-detail">{{ score.correct }} respuestas correctas de {{ questions.length }}</p>

      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener"
        class="btn-whatsapp"
        @click="markWhatsappSent"
      >
        <q-icon name="send" size="20px" />
        Avisar a papá para transferir
      </a>
      <p class="whatsapp-note">Se abre WhatsApp con el monto a transferir</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  quizPool,
  initQuizState,
  saveQuizState,
  QUIZ_COUNT,
  PRIZE_PER_CORRECT,
  formatPrize,
  calculatePrize,
  buildWhatsAppUrl
} from 'src/data/quiz'

gsap.registerPlugin(ScrollTrigger)

const quizRef = ref(null)
const questions = ref([])
const answers = reactive({})
const gameOver = ref(false)
const completed = ref(false)
const destroyed = ref(false)
const lostPrize = ref(0)
const whatsappSent = ref(false)

const prizePerCorrect = PRIZE_PER_CORRECT

onMounted(() => {
  const state = initQuizState(quizPool, QUIZ_COUNT)

  if (state.destroyed) {
    destroyed.value = true
    lostPrize.value = state.lostPrize || 0
    return
  }

  questions.value = state.questions
  Object.assign(answers, state.answers || {})
  gameOver.value = state.gameOver || false
  completed.value = state.completed || false
  whatsappSent.value = state.whatsappSent || false

  checkCompletion()

  if (completed.value && !whatsappSent.value) {
    notifyWhatsApp()
  }

  if (quizRef.value) {
    gsap.from(quizRef.value, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: quizRef.value, start: 'top 90%', once: true }
    })
  }
})

const score = computed(() => {
  let correct = 0
  Object.values(answers).forEach((a) => { if (a?.correct) correct++ })
  return { correct }
})

const totalPrize = computed(() => calculatePrize(answers))

const answeredCount = computed(() => Object.keys(answers).length)

const whatsappUrl = computed(() =>
  buildWhatsAppUrl(score.value.correct, questions.value.length, totalPrize.value)
)

function persistState(extra = {}) {
  saveQuizState({
    questionIds: questions.value.map((q) => q.id),
    answers: { ...answers },
    gameOver: gameOver.value,
    completed: completed.value,
    whatsappSent: whatsappSent.value,
    ...extra
  })
}

function checkCompletion() {
  if (questions.value.length === 0) return
  const allDone = questions.value.every((q) => answers[q.id] != null)
  if (allDone && !gameOver.value) {
    completed.value = true
    persistState()
    notifyWhatsApp()
  } else if (gameOver.value && answeredCount.value > 0) {
    completed.value = true
    persistState()
    notifyWhatsApp()
  }
}

function notifyWhatsApp() {
  if (whatsappSent.value) return
  whatsappSent.value = true
  persistState()
  setTimeout(() => {
    window.open(whatsappUrl.value, '_blank')
  }, 1500)
}

function markWhatsappSent() {
  whatsappSent.value = true
  persistState()
}

function isAnswered(id) {
  return answers[id] != null
}

function isLocked(id, index) {
  if (gameOver.value || completed.value) return !isAnswered(id)
  // Solo la siguiente pregunta sin responder está activa
  const firstUnanswered = questions.value.findIndex((q) => !answers[q.id])
  return index !== firstUnanswered
}

function selectAnswer(id, selected, correctIndex) {
  if (isAnswered(id) || gameOver.value || completed.value) return

  const isCorrect = selected === correctIndex
  answers[id] = { selected, correct: isCorrect }
  persistState()

  if (!isCorrect) {
    gameOver.value = true
    completed.value = true
    persistState()
    notifyWhatsApp()
    return
  }

  checkCompletion()
}

function cardClass(id) {
  const a = answers[id]
  if (!a) return ''
  return a.correct ? 'card-correct' : 'card-wrong'
}

function optionClass(id, oi, correctIndex) {
  const a = answers[id]
  if (!a) return ''
  if (oi === correctIndex) return 'opt-correct'
  if (oi === a.selected && !a.correct) return 'opt-wrong'
  return 'opt-dim'
}

function showResult(id, oi, correctIndex) {
  const a = answers[id]
  if (!a) return false
  return oi === correctIndex || oi === a.selected
}
</script>

<style scoped>
.santino-quiz {
  margin: 24px auto 40px;
  max-width: 420px;
  padding: 0 4px;
}

/* ── Intro ── */
.quiz-intro {
  text-align: center;
  padding: 24px 18px;
  margin-bottom: 24px;
  border-radius: 20px;
}

.intro-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 8px;
}

.quiz-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 10px;
  background: linear-gradient(135deg, #00bcff, #009ee3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.quiz-rules {
  font-size: 0.9rem;
  line-height: 1.55;
  opacity: 0.85;
  margin: 0 0 14px;
}

.quiz-rules strong {
  color: #00bcff;
}

.quiz-warnings {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.warn-item {
  font-size: 0.78rem;
  opacity: 0.65;
}

.prize-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px;
  border-radius: 14px;
  background: rgba(0, 188, 255, 0.08);
  border: 1px solid rgba(0, 188, 255, 0.25);
}

.mp-label {
  font-size: 0.75rem;
  opacity: 0.7;
}

.mp-amount {
  font-size: 1.8rem;
  font-weight: 800;
  color: #00bcff;
}

/* ── Game over ── */
.gameover-banner {
  text-align: center;
  padding: 12px;
  margin-bottom: 16px;
  background: rgba(255, 107, 107, 0.15);
  border: 1px solid rgba(255, 107, 107, 0.35);
  border-radius: 12px;
  font-size: 0.9rem;
  color: #ffaaaa;
}

/* ── Cards ── */
.quiz-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quiz-card {
  padding: 18px 16px;
  border-radius: 16px;
  transition: opacity 0.3s;
}

.quiz-card.locked {
  opacity: 0.35;
  pointer-events: none;
}

.quiz-card.card-correct {
  border-color: rgba(0, 188, 255, 0.35);
  box-shadow: 0 0 20px rgba(0, 188, 255, 0.12);
}

.quiz-card.card-wrong {
  border-color: rgba(255, 107, 107, 0.35);
}

.prize-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  color: #00bcff;
  background: rgba(0, 188, 255, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.won-badge {
  font-size: 0.85rem;
  font-weight: 600;
  color: #a8e6cf;
  margin-bottom: 10px;
  animation: pop-in 0.4s ease;
}

@keyframes pop-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.quiz-card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.quiz-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0, 188, 255, 0.2);
  color: #00bcff;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quiz-category {
  font-size: 0.75rem;
  opacity: 0.7;
  flex: 1;
}

.quiz-diff {
  font-size: 0.65rem;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.diff-medio {
  background: rgba(74, 144, 217, 0.2);
  color: #7ec8e3;
}

.diff-difícil, .diff-dificil {
  background: rgba(255, 107, 107, 0.2);
  color: #ff8a8a;
}

.quiz-question {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 14px;
  font-weight: 500;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: #f0e6ef;
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
}

.quiz-option:not(:disabled):active {
  transform: scale(0.98);
}

.quiz-option:disabled {
  cursor: default;
}

.option-letter {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  line-height: 1.35;
}

.quiz-option.opt-correct {
  background: rgba(0, 188, 255, 0.12);
  border-color: rgba(0, 188, 255, 0.45);
  color: #7ec8e3;
}

.quiz-option.opt-wrong {
  background: rgba(255, 107, 107, 0.12);
  border-color: rgba(255, 107, 107, 0.45);
  color: #ffaaaa;
}

.quiz-option.opt-dim {
  opacity: 0.45;
}

/* ── Final ── */
.final-screen {
  text-align: center;
  padding: 32px 20px;
  margin-top: 28px;
  border-radius: 24px;
}

.final-cake {
  font-size: 3rem;
  display: block;
  margin-bottom: 8px;
}

.final-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 12px;
  background: linear-gradient(135deg, #ff6b2b, #e8a0bf, #00bcff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.final-gift {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0 0 4px;
}

.final-amount {
  font-size: 2.8rem;
  font-weight: 900;
  color: #00bcff;
  margin: 0;
  line-height: 1.1;
}

.final-mp {
  font-size: 1.1rem;
  color: #00bcff;
  margin: 4px 0 12px;
  opacity: 0.85;
}

.final-detail {
  font-size: 0.85rem;
  opacity: 0.55;
  margin: 0 0 20px;
}

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 50px;
  background: #25d366;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s;
}

.btn-whatsapp:active {
  transform: scale(0.96);
}

.whatsapp-note {
  font-size: 0.72rem;
  opacity: 0.45;
  margin: 10px 0 0;
}

/* ── Destroyed ── */
.destroyed-screen {
  margin: 24px auto;
  max-width: 420px;
  padding: 0 4px;
}

.destroyed-card {
  text-align: center;
  padding: 32px 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.destroyed-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 12px;
}

.destroyed-card h3 {
  color: #ffaaaa;
  margin: 0 0 8px;
}

.destroyed-card p {
  opacity: 0.7;
  margin: 0 0 8px;
  font-size: 0.9rem;
}

.destroyed-lost {
  color: #ff8888 !important;
  font-weight: 600;
}

.destroyed-warn {
  font-size: 0.78rem !important;
  opacity: 0.5 !important;
  margin-top: 16px !important;
}
</style>
