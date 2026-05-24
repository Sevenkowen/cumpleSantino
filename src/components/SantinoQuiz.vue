<template>
  <section class="santino-quiz reveal-item" ref="quizRef">
    <div class="quiz-header">
      <h3 class="quiz-title">🧠 Quiz de Santino</h3>
      <p class="quiz-subtitle">10 preguntas — ¿cuántas podés acertar?</p>
      <div class="quiz-score glass">
        <span>{{ score.correct }} / {{ questions.length }} correctas</span>
      </div>
    </div>

    <div class="quiz-list">
      <article
        v-for="(q, index) in questions"
        :key="q.id"
        class="quiz-card glass"
        :class="cardClass(q.id)"
      >
        <div class="quiz-card-top">
          <span class="quiz-num">{{ index + 1 }}</span>
          <span class="quiz-category">{{ q.emoji }} {{ q.category }}</span>
          <span class="quiz-diff" :class="`diff-${q.difficulty}`">{{ q.difficulty }}</span>
        </div>

        <p class="quiz-question">{{ q.question }}</p>

        <div class="quiz-options">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="quiz-option"
            :class="optionClass(q.id, oi)"
            :disabled="isAnswered(q.id)"
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

    <p v-if="allAnswered" class="quiz-done">
      {{ score.correct === questions.length
        ? '¡Perfecto, Santino! Sos un crack 🏆'
        : `Terminaste el quiz — ${score.correct} de ${questions.length} 🎯` }}
    </p>
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
  QUIZ_COUNT
} from 'src/data/quiz'

gsap.registerPlugin(ScrollTrigger)

const quizRef = ref(null)
const questions = ref([])
const answers = reactive({})

onMounted(() => {
  const state = initQuizState(quizPool, QUIZ_COUNT)
  questions.value = state.questions
  Object.assign(answers, state.answers)

  if (quizRef.value) {
    gsap.from(quizRef.value, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: quizRef.value,
        start: 'top 90%',
        once: true
      }
    })
  }
})

const score = computed(() => {
  let correct = 0
  Object.values(answers).forEach((a) => {
    if (a.correct) correct++
  })
  return { correct }
})

const allAnswered = computed(() =>
  questions.value.length > 0 &&
  questions.value.every((q) => answers[q.id] != null)
)

function isAnswered(id) {
  return answers[id] != null
}

function selectAnswer(id, selected, correctIndex) {
  if (isAnswered(id)) return

  answers[id] = {
    selected,
    correct: selected === correctIndex
  }

  saveQuizState({
    questionIds: questions.value.map((q) => q.id),
    answers: { ...answers }
  })
}

function cardClass(id) {
  const a = answers[id]
  if (!a) return ''
  return a.correct ? 'card-correct' : 'card-wrong'
}

function optionClass(id, oi) {
  const a = answers[id]
  if (!a) return ''
  const q = questions.value.find((x) => x.id === id)
  if (!q) return ''
  if (oi === q.correct) return 'opt-correct'
  if (oi === a.selected && !a.correct) return 'opt-wrong'
  if (oi === a.selected) return 'opt-selected'
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
  margin: 40px auto 24px;
  max-width: 420px;
  padding: 0 4px;
}

.quiz-header {
  text-align: center;
  margin-bottom: 24px;
}

.quiz-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 6px;
  background: linear-gradient(135deg, #ff6b2b, #4a90d9, #e8a0bf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.quiz-subtitle {
  font-size: 0.85rem;
  opacity: 0.6;
  margin: 0 0 14px;
}

.quiz-score {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
}

.quiz-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quiz-card {
  padding: 18px 16px;
  border-radius: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.quiz-card.card-correct {
  border-color: rgba(168, 230, 207, 0.4);
  box-shadow: 0 0 20px rgba(168, 230, 207, 0.15);
}

.quiz-card.card-wrong {
  border-color: rgba(255, 107, 107, 0.35);
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.12);
}

.quiz-card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.quiz-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 107, 43, 0.2);
  color: #ff6b2b;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.quiz-category {
  font-size: 0.75rem;
  opacity: 0.7;
  flex: 1;
}

.quiz-diff {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  background: rgba(168, 230, 207, 0.15);
  border-color: rgba(168, 230, 207, 0.5);
  color: #a8e6cf;
}

.quiz-option.opt-wrong {
  background: rgba(255, 107, 107, 0.12);
  border-color: rgba(255, 107, 107, 0.45);
  color: #ffaaaa;
}

.quiz-option.opt-dim {
  opacity: 0.45;
}

.quiz-done {
  text-align: center;
  margin-top: 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #e8a0bf;
}
</style>
