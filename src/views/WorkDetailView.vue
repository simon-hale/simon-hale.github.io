<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
import ExternalLink from '../components/common/ExternalLink.vue'
import InlineTag from '../components/common/InlineTag.vue'
import MediaReveal from '../components/media/MediaReveal.vue'
import WorkSectionRenderer from '../components/work/WorkSectionRenderer.vue'
import { profile } from '../content/profile'
import { works } from '../content/works'
import { useReveal } from '../composables/useReveal'
import { useReducedMotion } from '../composables/useReducedMotion'

const route = useRoute()
const { t, locale } = useI18n({ useScope: 'global' })
const page = ref<HTMLElement | null>(null)
const item = computed(() => works.find((work) => work.slug === String(route.params.slug)))
useReveal(page)
const { prefersReducedMotion } = useReducedMotion()
let context: gsap.Context | undefined

watch([item, locale], ([work]) => {
  const title = work ? `${work.title} — ${profile.name}` : `${t('common.workNotFound')} — ${profile.name}`
  const description = work?.summary ?? t('common.unavailableEntry')
  document.title = title
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description)
}, { immediate: true })

onMounted(() => {
  if (!page.value || prefersReducedMotion.value) return
  context = gsap.context(() => {
    gsap.fromTo('[data-detail-intro]', { autoAlpha: 0, y: 12 }, {
      autoAlpha: 1, y: 0, duration: 0.48, ease: 'power2.out', clearProps: 'transform,opacity,visibility',
    })
  }, page.value)
})

onUnmounted(() => context?.revert())
</script>

<template>
  <main ref="page" class="detail-view">
    <template v-if="item">
      <div class="detail-topline" data-detail-intro>
        <RouterLink class="text-link detail-back" to="/#work"><span aria-hidden="true">←</span> {{ t('work.action.back') }}</RouterLink>
        <p class="detail-category eyebrow">{{ t(`work.type.${item.type}`) }}<span v-if="item.year"> · {{ item.year }}</span></p>
      </div>

      <header class="detail-hero" data-detail-intro>
        <h1 :lang="item.titleLang ?? profile.contentLanguage">{{ item.title }}</h1>
        <p class="detail-summary" :lang="item.summaryLang ?? profile.contentLanguage">{{ item.summary }}</p>

        <div class="detail-metadata" :aria-label="t('common.workDetails')">
          <div v-if="item.role" class="detail-metadata__item">
            <span class="eyebrow">{{ t('work.metadata.role') }}</span>
            <p :lang="profile.contentLanguage">{{ item.role }}</p>
          </div>
          <div v-if="item.venue" class="detail-metadata__item">
            <span class="eyebrow">{{ t(item.type === 'research' ? 'work.metadata.researchVenue' : 'work.metadata.venue') }}</span>
            <p :lang="profile.contentLanguage">{{ item.venue }}</p>
          </div>
          <div v-if="item.status" class="detail-metadata__item">
            <span class="eyebrow">{{ t('work.metadata.status') }}</span>
            <p :lang="profile.contentLanguage">{{ item.status }}</p>
          </div>
          <div v-if="item.meta.length" class="detail-metadata__item detail-metadata__tech">
            <span class="eyebrow">{{ t('work.metadata.technologies') }}</span>
            <div class="detail-tags"><InlineTag v-for="tag in item.meta" :key="tag" :label="tag" /></div>
          </div>
          <div v-if="item.links?.length" class="detail-metadata__links" :aria-label="t('common.projectLinks')" :lang="profile.contentLanguage">
            <ExternalLink v-for="link in item.links" :key="link.url + link.label" :href="link.url" :label="link.label" />
          </div>
        </div>
      </header>

      <div class="detail-cover" :lang="profile.contentLanguage" data-reveal>
        <MediaReveal :src="item.cover.src" :alt="item.cover.alt" :ratio="item.cover.aspectRatio || '16 / 10'" eager />
        <p v-if="item.cover.caption" class="detail-cover__caption">{{ item.cover.caption }}</p>
      </div>

      <WorkSectionRenderer :sections="item.sections ?? []" />
    </template>
    <section v-else class="detail-not-found">
      <p class="eyebrow">404 · {{ t('common.workNotFound') }}</p>
      <h1>{{ t('common.unavailableEntry') }}</h1>
      <RouterLink class="text-link" to="/#work">{{ t('common.returnToPortfolio') }} <span aria-hidden="true">↗</span></RouterLink>
    </section>
  </main>
</template>

<style scoped>
.detail-view { min-height: 60vh; padding: 1.15rem 0 1rem; }
.detail-topline { display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--line); padding-bottom: 0.72rem; }
.detail-back { min-height: 2.5rem; border: 0; color: var(--text-secondary); font-size: 0.74rem; }
.detail-back:hover { color: var(--accent); }
.detail-category { margin: 0; color: var(--text-tertiary); font-size: 0.64rem; text-align: right; }
.detail-hero { padding: 1.15rem 0 1.1rem; }
.detail-hero h1 { max-width: 22ch; font-size: clamp(2.25rem, 5vw, 4.45rem); line-height: 0.99; letter-spacing: -0.05em; text-wrap: balance; }
.detail-hero h1:lang(zh-Hans) { letter-spacing: 0; }
.detail-summary { max-width: 54rem; margin-top: 0.6rem; color: var(--text-secondary); font-size: clamp(0.96rem, 1.45vw, 1.15rem); line-height: 1.45; }
.detail-metadata { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.9rem 1.35rem; margin-top: 1.15rem; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 0.8rem 0; }
.detail-metadata__item { min-width: 0; }
.detail-metadata__item > .eyebrow { display: block; margin-bottom: 0.27rem; color: var(--text-tertiary); font-size: 0.59rem; }
.detail-metadata__item p { color: var(--text-secondary); font-size: 0.74rem; line-height: 1.4; }
.detail-metadata__tech { grid-column: span 2; }
.detail-tags { display: flex; flex-wrap: wrap; gap: 0.15rem 0.7rem; }
.detail-metadata__links { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: flex-end; gap: 0.35rem; }
.detail-metadata__links :deep(.text-link) { min-height: 2.45rem; border: 1px solid var(--line); border-radius: 2px; padding: 0.55rem 0.72rem; font-size: 0.68rem; }
.detail-metadata__links :deep(.text-link:hover) { border-color: var(--accent); background: var(--accent-soft); }
.detail-cover { width: min(100%, 940px); }
.detail-cover__caption { margin-top: 0.45rem; color: var(--text-tertiary); font-size: 0.68rem; line-height: 1.45; }
.detail-not-found { display: grid; min-height: 55vh; align-content: center; gap: 1.2rem; }
.detail-not-found h1 { max-width: 13ch; font-size: clamp(2.6rem, 7vw, 5.4rem); }

@media (max-width: 820px) {
  .detail-metadata { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.8rem 1rem; }
  .detail-metadata__tech { grid-column: 1 / -1; }
  .detail-metadata__links { grid-column: 1 / -1; justify-content: flex-start; }
}

@media (max-width: 520px) {
  .detail-view { padding-top: 0.7rem; }
  .detail-topline { align-items: flex-start; gap: 0.35rem; }
  .detail-back { max-width: 72%; font-size: 0.69rem; }
  .detail-category { padding-top: 0.55rem; font-size: 0.58rem; }
  .detail-hero { padding: 0.9rem 0 0.8rem; }
  .detail-hero h1 { max-width: 19ch; font-size: clamp(2rem, 9.3vw, 2.8rem); line-height: 1.02; }
  .detail-summary { margin-top: 0.48rem; font-size: 0.91rem; }
  .detail-metadata { margin-top: 0.8rem; padding-block: 0.65rem; gap: 0.7rem 0.75rem; }
  .detail-metadata__item > .eyebrow { font-size: 0.56rem; }
  .detail-metadata__item p { font-size: 0.71rem; }
  .detail-metadata__links { gap: 0.38rem; }
  .detail-metadata__links :deep(.text-link) { min-height: 2.75rem; padding-inline: 0.62rem; font-size: 0.65rem; }
  .detail-cover { width: 100%; }
  .detail-cover__caption { font-size: 0.63rem; }
}
</style>
