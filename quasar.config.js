import { configure } from 'quasar/wrappers'

export default configure((/* ctx */) => ({
  boot: ['pinia', 'gsap'],

  css: ['app.scss'],

  extras: [
    'material-icons',
    'material-icons-outlined',
    'roboto-font'
  ],

  build: {
    target: {
      browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
      node: 'node20'
    },
    vueRouterMode: 'history',
    vitePlugins: []
  },

  devServer: {
    open: true
  },

  framework: {
    config: {
      dark: true
    },
    plugins: ['Notify']
  }
}))
