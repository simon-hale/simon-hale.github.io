<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
import AcademicSummary from '../components/academic/AcademicSummary.vue'
import CourseworkOverview from '../components/academic/CourseworkOverview.vue'
import WorkPreview from '../components/work/WorkPreview.vue'
import WorkRow from '../components/work/WorkRow.vue'
import HonorsList from '../components/sections/HonorsList.vue'
import SectionHeader from '../components/layout/SectionHeader.vue'
import HeroPortrait from '../components/profile/HeroPortrait.vue'
import { honors } from '../content/honors'
import { profile, profileLinks } from '../content/profile'
import { works, type WorkItem } from '../content/works'
import { useReducedMotion } from '../composables/useReducedMotion'
import { useReveal } from '../composables/useReveal'

const page = ref<HTMLElement | null>(null)
const { t, locale } = useI18n({ useScope: 'global' })
const { prefersReducedMotion } = useReducedMotion()
useReveal(page)
const heroContext = ref<gsap.Context | null>(null)
const portrait = profile.photo?.src.trim() ? profile.photo : undefined
const hasConfiguredPortrait = Boolean(portrait)
const featuredWorks = computed(() => works.filter((work) => work.featured))
const honorCount = computed(() => honors.length)
const activeWork = ref<WorkItem | null>(featuredWorks.value[0] ?? null)
const publicLinks = profileLinks.reduce<{ label: string; href: string }[]>((items, { key, label }) => {
  const href = profile.links[key]
  if (href) items.push({ label, href })
  return items
}, [])

watch(locale, () => {
  const title = `${profile.name} — ${t('document.homeTitle')}`
  const description = t('common.pageDescription')
  document.title = title
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description)
}, { immediate: true })

watch(prefersReducedMotion, (reduced) => {
  if (!reduced) return
  heroContext.value?.revert()
  heroContext.value = null
  page.value?.querySelectorAll<HTMLElement>('[data-hero-step]').forEach((element) => {
    element.style.opacity = '1'
    element.style.visibility = 'visible'
    element.style.removeProperty('transform')
  })
})

onMounted(() => {
  if (prefersReducedMotion.value || !page.value) return
  heroContext.value = gsap.context(() => {
    gsap.fromTo(
      '[data-hero-step]',
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.065, ease: 'power3.out', clearProps: 'transform,opacity,visibility' },
    )
  }, page.value)
})

onUnmounted(() => heroContext.value?.revert())

</script>

<template>
  <main ref="page" class="home-view">
    <section class="hero" :class="{ 'hero--with-portrait': hasConfiguredPortrait }" aria-labelledby="hero-title">
      <div class="hero__main">
        <h1 id="hero-title" :lang="profile.contentLanguage" data-hero-step>{{ profile.name }}</h1>
        <p class="hero__role" :lang="profile.contentLanguage" data-hero-step>{{ profile.role }}</p>
        <p class="hero__tagline" :lang="profile.contentLanguage" data-hero-step>{{ profile.tagline }}</p>
        <nav v-if="publicLinks.length || profile.links.email" class="hero__links" :aria-label="t('common.profileLinks')" data-hero-step>
          <a v-for="link in publicLinks" :key="link.label" :href="link.href" target="_blank" rel="noreferrer noopener">
            {{ link.label }} <span aria-hidden="true">↗</span>
          </a>
          <a v-if="profile.links.email" :href="`mailto:${profile.links.email}`">{{ t('common.email') }} <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
      <HeroPortrait
        v-if="portrait"
        :photo="portrait"
        :content-language="profile.contentLanguage"
      />
    </section>

    <section id="work" class="page-section" aria-labelledby="work-title" data-reveal>
      <div class="section-layout">
        <aside class="section-layout__aside">
          <SectionHeader id="work-title" number="01" :title="t('section.work')" />
        </aside>
        <div class="section-layout__main" :class="{ 'has-active-work': activeWork }">
          <div class="work-showcase">
            <div class="work-showcase__list">
              <WorkRow
                v-for="(work, index) in featuredWorks"
                :key="work.id"
                :work="work"
                :index="index"
                :active="activeWork?.id === work.id"
                @activate="activeWork = $event"
              />
            </div>
            <div class="work-showcase__preview" aria-hidden="true">
              <Transition name="preview" mode="out-in">
                <WorkPreview v-if="activeWork" :key="activeWork.id" :work="activeWork" />
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="academic" class="page-section" aria-labelledby="academic-title" data-reveal>
      <div class="section-layout">
        <aside class="section-layout__aside">
          <SectionHeader id="academic-title" number="02" :title="t('section.academic')" />
        </aside>
        <div class="section-layout__main">
          <AcademicSummary />
          <CourseworkOverview />
        </div>
      </div>
    </section>

    <section v-if="honorCount" id="honors" class="page-section" aria-labelledby="honors-title" data-reveal>
      <div class="section-layout">
        <aside class="section-layout__aside">
          <SectionHeader id="honors-title" number="03" :title="t('section.honors')" />
        </aside>
        <div class="section-layout__main">
          <HonorsList />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-view { padding-bottom: 1rem; }
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0;
  align-content: start;
  padding: clamp(3.25rem, 7vh, 5rem) 0 2.2rem;
}
.hero--with-portrait { grid-template-columns: minmax(0, 1.55fr) minmax(15rem, 0.75fr); gap: clamp(2.5rem, 5vw, 4.5rem); align-items: center; }
.hero__main { min-width: 0; max-width: 48rem; }
.hero h1 { max-width: 14ch; font-size: clamp(3.2rem, 6.2vw, 5.6rem); line-height: 0.98; letter-spacing: -0.055em; overflow-wrap: anywhere; }
.hero h1:lang(zh-Hans) { letter-spacing: 0; }
.hero__role { margin-top: 1rem; color: var(--text-primary); font-size: clamp(1rem, 1.65vw, 1.25rem); letter-spacing: -0.025em; }
.hero__role:lang(zh-Hans) { letter-spacing: 0; }
.hero__tagline { max-width: 38rem; margin-top: 0.45rem; color: var(--text-secondary); font-size: clamp(0.94rem, 1.4vw, 1.08rem); }
.hero__links { display: flex; flex-wrap: wrap; gap: 0.3rem 1.05rem; align-items: center; margin-top: 1.1rem; color: var(--text-secondary); font-size: 0.75rem; }
.hero__links a { display: inline-flex; min-height: 2.75rem; align-items: center; padding-inline: 0.1rem; transition: color 160ms ease; }
.hero__links a:hover { color: var(--accent); }
.hero__links a span { color: var(--accent); }
.page-section { margin-top: clamp(3.1rem, 5.4vw, 5rem); }
.section-layout { display: grid; grid-template-columns: minmax(9rem, 0.24fr) minmax(0, 1fr); gap: clamp(2rem, 4vw, 4rem); }
.section-layout__aside { padding-right: 0.5rem; }
.section-layout__main { min-width: 0; }
.work-showcase { display: grid; grid-template-columns: 1fr; align-items: start; gap: clamp(1.5rem, 3.5vw, 3.25rem); }
.work-showcase__list { display: grid; gap: 0.45rem; min-width: 0; }
.work-showcase__preview { display: none; position: sticky; top: 6rem; min-width: 0; }
.preview-enter-active, .preview-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.preview-enter-from { opacity: 0; transform: translateY(5px); }
.preview-leave-to { opacity: 0; transform: translateY(-4px); }
@media (min-width: 1200px) and (hover: hover) and (pointer: fine) {
  .work-showcase { grid-template-columns: minmax(0, 1.1fr) minmax(15rem, 0.9fr); }
  .work-showcase__preview { display: block; }
}

@media (max-width: 1199px) {
  .hero { padding-top: 3rem; }
  .hero--with-portrait { grid-template-columns: 1fr; gap: 0; }
  .section-layout { grid-template-columns: 1fr; gap: 1rem; }
}

@media (max-width: 520px) {
  .hero { padding-block: 2.25rem 1.7rem; }
  .hero h1 { font-size: clamp(2.65rem, 10.8vw, 4rem); }
  .hero__links { gap: 0.1rem 0.8rem; margin-top: 0.9rem; }
  .page-section { margin-top: 2.75rem; }
}
</style>
