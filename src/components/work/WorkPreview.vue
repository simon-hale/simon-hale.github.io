<script setup lang="ts">
import type { WorkItem } from '../../content/works'
import MediaReveal from '../media/MediaReveal.vue'
import { profile } from '../../content/profile'

defineProps<{ work: WorkItem }>()
</script>

<template>
  <figure class="work-preview" :lang="profile.contentLanguage">
    <MediaReveal :src="work.cover.src" :alt="work.cover.alt" :ratio="work.cover.aspectRatio || '16 / 10'" />
  </figure>
</template>

<style scoped>
.work-preview { margin: 0; }
</style>
