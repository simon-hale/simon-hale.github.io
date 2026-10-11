import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import { profile } from './content/profile'
import { applyFavicon } from './utils/applyFavicon'
import './assets/styles/tokens.css'
import './assets/styles/typography.css'
import './assets/styles/base.css'
import './assets/styles/motion.css'

document.title = `${profile.name} — Portfolio`
applyFavicon(profile.initials)

createApp(App).use(i18n).use(router).mount('#app')
requestAnimationFrame(() => {
  document.documentElement.dataset.themeReady = 'true'
})
