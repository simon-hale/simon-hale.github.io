<script setup lang="ts">
import { ref } from 'vue'
import type { ProfilePhoto } from '../../content/profile'

defineProps<{ photo: ProfilePhoto; contentLanguage: string }>()
const loaded = ref(false)
const failed = ref(false)

function handleError() {
  failed.value = true
}
</script>

<template>
  <figure
    v-if="photo.src.trim()"
    class="hero-portrait"
    :class="{ 'hero-portrait--square': photo.aspectRatio === '1:1' }"
    data-hero-step
  >
    <img
      v-if="!failed"
      :src="photo.src.trim()"
      :alt="photo.alt"
      :lang="contentLanguage"
      loading="eager"
      fetchpriority="high"
      decoding="async"
      :class="{ 'hero-portrait__image--loaded': loaded }"
      @load="loaded = true"
      @error="handleError"
    >
  </figure>
</template>

<style scoped>
.hero-portrait {
  width: min(100%, 320px);
  aspect-ratio: 4 / 5;
  justify-self: end;
  overflow: hidden;
  margin: 0;
}

.hero-portrait--square { aspect-ratio: 1; }

.hero-portrait img {
  width: 100%;
  height: 100%;
  opacity: 0;
  object-fit: cover;
  transition: opacity 180ms ease;
}

.hero-portrait img.hero-portrait__image--loaded { opacity: 1; }

@media (max-width: 1100px) {
  .hero-portrait {
    width: min(100%, 260px);
    justify-self: center;
    margin: 1.6rem auto 0;
  }
}

@media (max-width: 520px) {
  .hero-portrait {
    width: min(100%, 190px);
    margin-top: 1.3rem;
  }
}
</style>
