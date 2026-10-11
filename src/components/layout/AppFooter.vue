<script setup lang="ts">
import { profile, profileLinks } from '../../content/profile'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const links = profileLinks.reduce<{ label: string; href: string }[]>((items, { key, label }) => {
  const href = profile.links[key]
  if (href) items.push({ label, href })
  return items
}, [])
</script>

<template>
  <footer id="contact" class="site-footer">
    <div v-if="profile.links.email || links.length" class="site-footer__top">
      <h2 class="eyebrow site-footer__heading">{{ t('section.contact') }}</h2>
      <div class="site-footer__contact">
        <a v-if="profile.links.email" :href="`mailto:${profile.links.email}`" class="site-footer__email">
          {{ profile.links.email }} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="site-footer__links" :aria-label="t('common.profileLinks')">
        <a v-for="link in links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer noopener">{{ link.label }} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>© {{ new Date().getFullYear() }} <span :lang="profile.contentLanguage">{{ profile.name }}</span></span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { margin-top: 4rem; border-top: 1px solid var(--line); }
.site-footer__top { display: grid; grid-template-columns: minmax(2rem, 2.4fr) minmax(0, 6fr) minmax(10rem, 3fr); gap: 1rem; padding: 2.2rem 0 3.5rem; }
.site-footer__heading { margin: 0; font-weight: 400; }
.site-footer__email { font-size: clamp(1.4rem, 3vw, 2rem); letter-spacing: -0.04em; }
.site-footer__email span { color: var(--accent); font-size: 0.85em; }
.site-footer__links { display: flex; flex-direction: column; align-items: flex-start; gap: 0.45rem; color: var(--text-secondary); font-size: 0.78rem; }
.site-footer__links a:hover { color: var(--accent); }
.site-footer__bottom { display: flex; justify-content: flex-start; gap: 1rem; border-top: 1px solid var(--line); padding: 0.85rem 0 1.1rem; color: var(--text-tertiary); font-family: var(--font-mono); font-size: 0.62rem; }

@media (max-width: 640px) {
  .site-footer { margin-top: 3rem; }
  .site-footer__top { grid-template-columns: 2rem 1fr; gap: 0.75rem; padding-bottom: 2.4rem; }
  .site-footer__links { grid-column: 2; flex-flow: row wrap; gap: 1rem; padding-top: 1.1rem; }
}
</style>
