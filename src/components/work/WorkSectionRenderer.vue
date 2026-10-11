<script setup lang="ts">
import type { WorkSection } from '../../content/works'
import ExternalLink from '../common/ExternalLink.vue'
import MediaReveal from '../media/MediaReveal.vue'
import { profile } from '../../content/profile'
import { useI18n } from 'vue-i18n'

defineProps<{ sections: WorkSection[] }>()
const { t, locale } = useI18n({ useScope: 'global' })

function sectionHeading(section: WorkSection): string {
  if (section.title) return section.title
  return section.headingKey ? t(`work.section.${section.headingKey}`) : ''
}
</script>

<template>
  <div class="detail-sections">
    <section
      v-for="(section, index) in sections"
      :key="section.id"
      class="detail-section"
      :class="{ 'detail-section--untitled': !section.title && !section.headingKey }"
      data-reveal
    >
      <div v-if="section.title || section.headingKey" class="detail-section__heading">
        <span class="detail-section__number mono">{{ String(index + 1).padStart(2, '0') }}</span>
        <h2 :lang="section.title ? section.titleLang ?? profile.contentLanguage : locale">{{ sectionHeading(section) }}</h2>
      </div>

      <div v-if="section.type === 'text'" class="detail-section__text">
        <p :lang="section.bodyLang ?? profile.contentLanguage">{{ section.body }}</p>
      </div>

      <figure v-else-if="section.type === 'media'" class="detail-section__figure" :lang="profile.contentLanguage">
        <MediaReveal :src="section.media.src" :alt="section.media.alt" :ratio="section.media.aspectRatio || '16 / 9'" />
        <figcaption v-if="section.media.caption">{{ section.media.caption }}</figcaption>
      </figure>

      <div v-else-if="section.type === 'media-grid'" class="detail-section__grid" :lang="profile.contentLanguage">
        <figure v-for="media in section.media" :key="media.src" class="detail-section__figure">
          <MediaReveal :src="media.src" :alt="media.alt" :ratio="media.aspectRatio || '16 / 10'" />
          <figcaption v-if="media.caption">{{ media.caption }}</figcaption>
        </figure>
      </div>

      <dl v-else-if="section.type === 'metrics'" class="detail-section__metrics" :lang="profile.contentLanguage">
        <div v-for="metric in section.metrics" :key="metric.label" class="detail-section__metric">
          <dt>{{ metric.label }}</dt>
          <dd>{{ metric.value }}</dd>
        </div>
      </dl>

      <div v-else-if="section.type === 'links'" class="detail-section__links" :lang="profile.contentLanguage">
        <ExternalLink v-for="link in section.links" :key="link.url + link.label" :href="link.url" :label="link.label" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail-sections { max-width: 940px; margin-top: 2.8rem; }
.detail-section { display: grid; grid-template-columns: minmax(8rem, 0.8fr) minmax(0, 2.2fr); gap: 1rem 1.5rem; border-top: 1px solid var(--line); padding: 1.1rem 0 1.55rem; }
.detail-section__heading { display: grid; grid-template-columns: 1.25rem minmax(0, 1fr); align-items: baseline; gap: 0.55rem; padding-top: 0.08rem; }
.detail-section__number { color: var(--text-tertiary); font-size: 0.64rem; }
.detail-section__heading h2 { color: var(--text-primary); font-family: var(--font-sans); font-size: 1rem; font-weight: 600; letter-spacing: -0.025em; line-height: 1.35; }
.detail-section__heading h2:lang(zh-Hans) { letter-spacing: 0; }
.detail-section--untitled > :first-child { grid-column: 1 / -1; }
.detail-section__text { max-width: 44rem; color: var(--text-secondary); font-size: 0.91rem; line-height: 1.65; }
.detail-section__figure { min-width: 0; margin: 0; }
.detail-section__figure figcaption { margin-top: 0.45rem; color: var(--text-tertiary); font-size: 0.67rem; line-height: 1.45; }
.detail-section__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.detail-section__metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.7rem; margin: 0; }
.detail-section__metric { border-left: 1px solid var(--line); padding-left: 0.7rem; }
.detail-section__metric dt { color: var(--text-tertiary); font-family: var(--font-mono); font-size: 0.62rem; line-height: 1.4; }
.detail-section__metric dd { margin: 0.35rem 0 0; color: var(--text-primary); font-size: 0.8rem; line-height: 1.4; }
.detail-section__links { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; }

@media (max-width: 700px) {
  .detail-sections { margin-top: 2.1rem; }
  .detail-section { grid-template-columns: 1fr; gap: 0.7rem; }
  .detail-section__heading { padding: 0; }
}

@media (max-width: 480px) {
  .detail-section__grid { gap: 0.6rem; }
  .detail-section__metrics { grid-template-columns: 1fr; gap: 0.8rem; }
  .detail-section__metric { display: grid; grid-template-columns: minmax(6.3rem, 0.75fr) minmax(0, 1fr); align-items: baseline; gap: 0.6rem; }
  .detail-section__metric dd { margin: 0; }
}
</style>
