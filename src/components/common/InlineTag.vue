<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <span class="inline-tag">{{ label }}</span>
</template>

<style scoped>
.inline-tag {
  display: inline-flex;
  align-items: center;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.61rem;
  line-height: 1.2;
  white-space: nowrap;
}

.inline-tag:not(:last-child)::after { content: '·'; padding-left: 0.5rem; color: var(--text-tertiary); }
</style>
