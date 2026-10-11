<script setup lang="ts">
defineProps<{
  id?: string
  number: string
  title: string
}>()
</script>

<template>
  <div class="section-heading">
    <span class="section-heading__number mono">{{ number }}</span>
    <h2 :id="id">{{ title }}</h2>
  </div>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.section-heading__number {
  min-width: 1.25rem;
  color: var(--text-tertiary);
  font-size: 0.65rem;
}

.section-heading h2 {
  color: var(--text-primary);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.25;
}
.section-heading h2:lang(zh-Hans) { letter-spacing: 0; }

@media (max-width: 520px) {
  .section-heading h2 { font-size: 1rem; }
}
</style>
