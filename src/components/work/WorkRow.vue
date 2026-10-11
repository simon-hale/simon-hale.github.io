<script setup lang="ts">
import type { WorkItem } from '../../content/works'
import MediaReveal from '../media/MediaReveal.vue'
import { profile } from '../../content/profile'
import { useI18n } from 'vue-i18n'
import WorkMeta from './WorkMeta.vue'

withDefaults(defineProps<{
  work: WorkItem
  index: number
  active?: boolean
}>(), { active: false })

const emit = defineEmits<{
  activate: [work: WorkItem]
}>()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <RouterLink
    class="work-row"
    :class="{ 'is-active': active }"
    :to="{ name: 'work-detail', params: { slug: work.slug } }"
    @pointerenter="emit('activate', work)"
    @focus="emit('activate', work)"
  >
    <div class="work-row__body">
      <WorkMeta :work="work" :index="index" />
      <div class="work-row__main">
        <h3 :lang="work.titleLang ?? profile.contentLanguage">{{ work.title }}</h3>
        <span class="work-row__arrow" aria-hidden="true">↗</span>
      </div>
      <p v-if="work.summary" class="work-row__summary" :lang="work.summaryLang ?? profile.contentLanguage">{{ work.summary }}</p>
      <p class="work-row__meta mono" :aria-label="t('common.areasAndTechnologies')" :lang="profile.contentLanguage">{{ work.meta.join(' · ') }}</p>
    </div>
    <div class="work-row__mobile-media" :lang="profile.contentLanguage">
      <MediaReveal :src="work.cover.src" :alt="work.cover.alt" :ratio="work.cover.aspectRatio || '16 / 10'" />
    </div>
  </RouterLink>
</template>

<style scoped>
.work-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 7.25rem;
  align-items: start;
  gap: 0.85rem;
  border-left: 2px solid transparent;
  border-radius: 2px;
  padding: 0.85rem 0.65rem 0.95rem;
  transition: background-color 180ms ease, border-color 180ms ease;
}
.work-row:hover,
.work-row:focus-visible,
.work-row.is-active { border-color: var(--accent); background: var(--surface-hover); }
.work-row__body { min-width: 0; }
.work-row__main { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-top: 0.65rem; }
.work-row__main h3 { max-width: 28ch; font-size: clamp(1.3rem, 2.35vw, 1.9rem); line-height: 1.12; }
.work-row__arrow { color: var(--text-tertiary); font-size: 1.1rem; transition: color 180ms ease, transform 180ms ease; }
.work-row:hover .work-row__arrow { color: var(--accent); transform: translate(2px, -2px); }
.work-row__summary { max-width: 40rem; margin-top: 0.48rem; color: var(--text-secondary); font-size: 0.79rem; line-height: 1.45; }
.work-row__meta { margin-top: 0.5rem; color: var(--text-tertiary); font-size: 0.61rem; line-height: 1.5; }
.work-row__mobile-media { width: 100%; margin-top: 1.35rem; }

@media (min-width: 1200px) and (hover: hover) and (pointer: fine) {
  .work-row { display: block; }
  .work-row__mobile-media { display: none; }
}

@media (max-width: 520px) {
  .work-row { grid-template-columns: minmax(0, 1fr) 4.6rem; gap: 0.6rem; padding: 0.65rem 0.45rem 0.75rem; }
  .work-row__main { margin-top: 0.55rem; }
  .work-row__summary { font-size: 0.77rem; }
  .work-row__main h3 { font-size: 1.22rem; }
  .work-row__meta { font-size: 0.57rem; }
  .work-row__arrow { font-size: 0.95rem; }
  .work-row__mobile-media { margin-top: 1.2rem; }
}
</style>
