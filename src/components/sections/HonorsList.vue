<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { honors } from '../../content/honors'
import { profile } from '../../content/profile'

const sortedHonors = computed(() => [...honors].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)))
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div v-if="sortedHonors.length" class="honors-list">
    <article v-for="honor in sortedHonors" :key="`${honor.type}-${honor.title}`" class="honor-row">
      <span class="honor-row__year mono">{{ honor.year ?? '—' }}</span>
      <div class="honor-row__content">
        <span class="honor-row__type eyebrow">{{ t(`honor.type.${honor.type}`) }}</span>
        <h3 :lang="profile.contentLanguage">{{ honor.title }}</h3>
        <p v-if="honor.issuer || honor.level" :lang="profile.contentLanguage">{{ [honor.issuer, honor.level].filter(Boolean).join(' · ') }}</p>
        <p v-if="honor.description" class="honor-row__description" :lang="profile.contentLanguage">{{ honor.description }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.honors-list { display: grid; gap: 0.75rem; }
.honor-row { display: grid; grid-template-columns: minmax(2rem, 0.24fr) minmax(0, 1fr); gap: clamp(2rem, 4vw, 4rem); padding: 0.35rem 0; }
.honor-row__year { color: var(--text-tertiary); font-size: 0.7rem; }
.honor-row__type { font-size: 0.61rem; }
.honor-row h3 { margin-top: 0.3rem; font-size: 1.05rem; letter-spacing: -0.025em; }
.honor-row h3:lang(zh-Hans) { letter-spacing: 0; }
.honor-row p { margin-top: 0.18rem; color: var(--text-secondary); font-size: 0.78rem; }
.honor-row__description { max-width: 42rem; }
@media (max-width: 1099px) { .honor-row { grid-template-columns: 2.8rem minmax(0, 1fr); gap: 1rem; } }
@media (max-width: 520px) { .honors-list { gap: 0.6rem; } .honor-row { grid-template-columns: 2.5rem minmax(0, 1fr); gap: 0.8rem; } }
</style>
