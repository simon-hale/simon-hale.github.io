<script setup lang="ts">
import { academic } from '../../content/academic'
import { profile } from '../../content/profile'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section class="coursework" aria-labelledby="coursework-title">
    <h3 id="coursework-title" class="coursework__heading">{{ t('section.coursework') }}</h3>

    <div v-if="academic.coursework.length" class="coursework__groups">
      <section v-for="group in academic.coursework" :key="group.category" class="coursework__group">
        <h4 class="coursework__category">{{ t(`academic.category.${group.category}`) }}</h4>
        <ul class="course-list">
          <li v-for="course in group.courses" :key="course.name" class="course-list__item">
            <span class="course-list__name" :lang="course.nameLang ?? profile.contentLanguage">{{ course.name }}</span>
            <span class="course-list__grade mono" :aria-label="t('academic.gradeAccessible', { grade: course.grade })">{{ course.grade }}</span>
          </li>
        </ul>
      </section>
    </div>
    <p v-else class="coursework__empty">{{ t('academic.empty') }}</p>
  </section>
</template>

<style scoped>
.coursework { margin-top: 1.45rem; border-top: 1px solid var(--line); padding-top: 0.95rem; }
.coursework__heading { margin-bottom: 1rem; color: var(--text-primary); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.025em; line-height: 1.3; }
.coursework__heading:lang(zh-Hans) { letter-spacing: 0; }
.coursework__groups { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem clamp(1.25rem, 2.4vw, 2rem); }
.coursework__category { margin-bottom: 0.42rem; color: var(--text-secondary); font-size: 0.8rem; font-weight: 600; letter-spacing: -0.01em; line-height: 1.35; }
.coursework__category:lang(zh-Hans) { letter-spacing: 0; }
.course-list { display: grid; gap: 0.18rem; margin: 0; padding: 0; list-style: none; }
.course-list__item { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 0.7rem; color: var(--text-primary); font-size: 0.8rem; line-height: 1.4; }
.course-list__name { min-width: 0; overflow-wrap: anywhere; }
.course-list__grade { min-width: 3ch; color: var(--text-secondary); font-size: 0.75rem; font-variant-numeric: tabular-nums; text-align: right; white-space: nowrap; }
.coursework__empty { color: var(--text-secondary); font-size: 0.82rem; }

@media (max-width: 900px) {
  .coursework__groups { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.05rem 1.5rem; }
  .coursework__group:last-child:nth-child(odd) { grid-column: 1 / -1; }
}

@media (max-width: 520px) {
  .coursework { margin-top: 1.2rem; padding-top: 0.8rem; }
  .coursework__heading { margin-bottom: 0.75rem; font-size: 1rem; }
  .coursework__groups { grid-template-columns: 1fr; gap: 0.85rem; }
  .coursework__group:last-child:nth-child(odd) { grid-column: auto; }
  .coursework__category { margin-bottom: 0.25rem; font-size: 0.77rem; }
  .course-list { gap: 0.14rem; }
  .course-list__item { font-size: 0.8rem; }
  .course-list__grade { font-size: 0.75rem; }
}
</style>
