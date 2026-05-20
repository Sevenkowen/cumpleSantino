import { defineBoot } from '#q-app/wrappers'
import gsap from 'gsap'

export default defineBoot(({ app }) => {
  app.config.globalProperties.$gsap = gsap
})
