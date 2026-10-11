<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { academic } from '../../content/academic'
import { profile } from '../../content/profile'

const focus = computed(() => academic.focus?.filter(Boolean).join(' · ') ?? '')
const studyPeriod = `${academic.startYear}–${academic.endYear}`
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="academic-summary">
    <div class="academic-summary__school">
      <h3 :lang="profile.contentLanguage">{{ academic.university }}</h3>
      <p :lang="profile.contentLanguage">{{ academic.degree }} · {{ academic.major }}</p>
    </div>
    <span class="academic-summary__dates mono">{{ studyPeriod }}</span>

    <dl v-if="academic.gpa || academic.rank || focus" class="academic-summary__facts">
      <div v-if="academic.gpa">
        <dt>{{ t('academic.gpa') }}</dt>
        <dd>{{ academic.gpa }}</dd>
      </div>
      <div v-if="academic.rank">
        <dt>{{ t('academic.rank') }}</dt>
        <dd>{{ academic.rank }}</dd>
      </div>
      <div v-if="focus" class="academic-summary__focus">
        <dt>{{ t('academic.focus') }}</dt>
        <dd :lang="profile.contentLanguage">{{ focus }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.academic-summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.2rem 1.5rem;
  padding: 0.15rem 0 0.35rem;
}
.academic-summary__school { min-width: 0; }
.academic-summary__school h3 { font-size: clamp(1.25rem, 2.2vw, 1.6rem); line-height: 1.2; }
.academic-summary__school h3:lang(zh-Hans) { letter-spacing: 0; }
.academic-summary__school p { margin-top: 0.28rem; color: var(--text-secondary); font-size: 0.86rem; }
.academic-summary__dates { padding-top: 0.18rem; color: var(--text-tertiary); font-size: 0.68rem; white-space: nowrap; }
.academic-summary__facts {
  display: flex;
  grid-column: 1 / -1;
  flex-wrap: wrap;
  gap: 0.9rem 2.25rem;
  margin: 1rem 0 0;
}
.academic-summary__facts > div { min-width: 7rem; }
.academic-summary__facts dt { color: var(--text-tertiary); font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.035em; }
.academic-summary__facts dt:lang(zh-Hans) { letter-spacing: 0; }
.academic-summary__facts dd { margin: 0.15rem 0 0; font-size: 0.91rem; letter-spacing: -0.02em; }
.academic-summary__facts > div:not(.academic-summary__focus) dd { font-family: var(--font-mono); }
.academic-summary__focus { flex: 1 1 14rem; }

@media (max-width: 520px) {
  .academic-summary { gap: 0.2rem 0.75rem; }
  .academic-summary__school h3 { font-size: 1.25rem; }
  .academic-summary__school p { font-size: 0.79rem; }
  .academic-summary__dates { font-size: 0.62rem; }
  .academic-summary__facts { gap: 0.75rem 1rem; margin-top: 0.8rem; }
  .academic-summary__facts > div { min-width: 6.8rem; }
  .academic-summary__focus { flex-basis: 100%; }
}
</style>
