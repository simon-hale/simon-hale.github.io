<script setup lang="ts">
defineProps<{ href: string; label: string }>()
</script>

<template>
  <a class="text-link" :href="href" target="_blank" rel="noreferrer noopener">
    {{ label }} <span aria-hidden="true">↗</span>
  </a>
</template>
