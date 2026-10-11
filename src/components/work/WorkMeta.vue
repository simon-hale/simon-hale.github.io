<script setup lang="ts">
import type { WorkItem } from '../../content/works'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ work: WorkItem; index: number }>()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="work-meta">
    <span class="work-meta__index mono">{{ String(index + 1).padStart(2, '0') }}</span>
    <span class="work-meta__type">{{ t(`work.type.${props.work.type}`) }}</span>
    <span v-if="work.year" class="work-meta__year mono">{{ work.year }}</span>
    <span v-else class="work-meta__year mono">—</span>
  </div>
</template>

<style scoped>
.work-meta { display: flex; align-items: center; gap: 0.6rem; color: var(--text-tertiary); font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.04em; text-transform: uppercase; }
.work-meta:lang(zh-Hans) { letter-spacing: 0; }
.work-meta__index { color: var(--text-secondary); }
.work-meta__year { margin-left: auto; }
</style>
