<script setup lang="ts">
import { computed, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../../content/profile'
import { useTheme } from '../../composables/useTheme'
import { setAppLocale, type AppLocale } from '../../i18n'

const hasContact = computed(() => Object.values(profile.links).some(Boolean))
const { t, locale } = useI18n({ useScope: 'global' })
const { preferenceLabel, toggleLabel, icon, cyclePreference } = useTheme()
const brandLabel = computed(() => `${profile.name} — ${t('common.home')}`)
watch(locale, async () => {
  await nextTick()
  ScrollTrigger.refresh()
})
const languageLabel = computed(() => locale.value === 'zh-Hans' ? 'EN' : '中')
const languageToggleLabel = computed(() => locale.value === 'zh-Hans'
  ? t('language.switchToEnglish')
  : t('language.switchToChinese'))

function toggleLanguage() {
  const nextLocale: AppLocale = locale.value === 'zh-Hans' ? 'en' : 'zh-Hans'
  setAppLocale(nextLocale)
}
</script>

<template>
  <header class="site-header">
    <RouterLink class="site-header__brand" to="/" :aria-label="brandLabel">
      <span class="site-header__brand-name" :lang="profile.contentLanguage">{{ profile.name }}</span>
      <span class="site-header__brand-initials" aria-hidden="true">{{ profile.initials }}</span>
    </RouterLink>
    <div class="site-header__actions">
      <nav class="site-nav" :aria-label="t('common.mainNavigation')">
        <RouterLink to="/#work">{{ t('nav.work') }}</RouterLink>
        <RouterLink to="/#academic">{{ t('nav.academic') }}</RouterLink>
        <RouterLink v-if="hasContact" class="site-nav__contact" to="/#contact">{{ t('nav.contact') }}</RouterLink>
      </nav>
      <button class="language-toggle" type="button" :aria-label="languageToggleLabel" :title="languageToggleLabel" @click="toggleLanguage">
        {{ languageLabel }}
      </button>
      <button class="theme-toggle" type="button" :aria-label="toggleLabel" :title="toggleLabel" @click="cyclePreference">
        <span class="theme-toggle__icon" aria-hidden="true">{{ icon }}</span>
        <span class="theme-toggle__mode">{{ preferenceLabel }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  z-index: 20;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4.1rem;
  border-bottom: 1px solid var(--line);
  background: var(--header-bg);
  backdrop-filter: blur(12px);
}

.site-header__brand { display: inline-flex; min-width: 0; align-items: center; color: var(--text-primary); font-size: 0.84rem; font-weight: 500; }
.site-header__brand-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.site-header__brand-initials { display: none; font-family: var(--font-mono); font-size: 0.76rem; letter-spacing: -0.04em; }
.site-header__actions { display: flex; align-items: center; gap: clamp(0.8rem, 2.5vw, 1.8rem); }
.site-nav { display: flex; align-items: center; gap: clamp(1rem, 3vw, 2.2rem); }
.site-nav a { color: var(--text-secondary); font-size: 0.78rem; transition: color 160ms ease; }
.site-nav a:hover, .site-nav a.router-link-active { color: var(--text-primary); }
.language-toggle { min-width: 2.1rem; min-height: 2.45rem; border: 0; padding: 0.35rem; background: transparent; color: var(--text-secondary); cursor: pointer; font: 500 0.68rem/1 var(--font-mono); transition: color 180ms ease; }
.language-toggle:hover { color: var(--accent); }
.theme-toggle { display: inline-flex; min-height: 2.45rem; align-items: center; justify-content: center; gap: 0.4rem; border: 1px solid var(--line); border-radius: 2px; padding: 0.35rem 0.65rem; background: transparent; color: var(--text-secondary); cursor: pointer; font: 500 0.68rem/1 var(--font-mono); transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease; }
.theme-toggle:hover { border-color: var(--accent); background: var(--accent-soft); color: var(--text-primary); }
.theme-toggle__icon { color: var(--accent); font-size: 0.95rem; line-height: 1; }

@media (max-width: 520px) {
  .site-header { min-height: 3.7rem; }
  .site-header__brand-name { max-width: 7.2rem; }
  .site-header__actions { gap: 0.55rem; }
  .site-nav { gap: 0.75rem; }
  .site-nav a { font-size: 0.7rem; }
  .site-nav__contact { display: none; }
  .language-toggle { min-width: 2.75rem; min-height: 2.75rem; }
  .theme-toggle { min-width: 2.75rem; min-height: 2.75rem; gap: 0.3rem; padding-inline: 0.45rem; font-size: 0.62rem; }
  .theme-toggle__mode { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
}

@media (max-width: 380px) {
  .site-header__brand-name { display: none; }
  .site-header__brand-initials { display: inline; }
  .site-nav { gap: 0.55rem; }
  .site-nav a { font-size: 0.65rem; }
  .site-header__actions { gap: 0.45rem; }
  .theme-toggle { width: 2.75rem; padding: 0; }
}
</style>
