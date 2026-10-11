<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMediaReveal } from '../../composables/useMediaReveal'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  ratio?: string
  eager?: boolean
}>(), {
  ratio: '16 / 9',
  eager: false,
})

const container = ref<HTMLElement | null>(null)
const { shouldLoad, isLoaded, hasError, handleLoad, handleError } = useMediaReveal(container, props.eager)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div ref="container" class="media-reveal" :style="{ aspectRatio: ratio }">
    <div class="media-reveal__skeleton media-skeleton" :class="{ 'is-hidden': isLoaded }" aria-hidden="true" />
    <img
      v-if="shouldLoad && !hasError"
      class="media-reveal__image"
      :class="{ 'is-ready': isLoaded }"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-if="hasError" class="media-reveal__error" role="img" :aria-label="t('common.unavailableWithAlt', { alt })">{{ t('common.previewUnavailable') }}</div>
  </div>
</template>

<style scoped>
.media-reveal { position: relative; overflow: hidden; width: 100%; background: var(--surface); }
.media-reveal__skeleton { position: absolute; z-index: 1; inset: 0; opacity: 1; transition: opacity 240ms ease; }
.media-reveal__skeleton.is-hidden { opacity: 0; }
.media-reveal__image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; }
.media-reveal__image.is-ready { opacity: 1; }
.media-reveal__error { position: absolute; inset: 0; display: grid; place-items: center; color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase; }
</style>
