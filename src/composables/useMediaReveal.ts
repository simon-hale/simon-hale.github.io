import { nextTick, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from './useReducedMotion'

export function useMediaReveal(container: Ref<HTMLElement | null>, eager: boolean) {
  const shouldLoad = ref(eager)
  const isLoaded = ref(false)
  const isVisible = ref(false)
  const hasError = ref(false)
  const { prefersReducedMotion } = useReducedMotion()
  let loadObserver: IntersectionObserver | undefined
  let visibilityObserver: IntersectionObserver | undefined
  let context: gsap.Context | undefined

  const reveal = async () => {
    if (!isLoaded.value || !isVisible.value) return
    await nextTick()
    const image = container.value?.querySelector('img')
    if (!image) return

    if (prefersReducedMotion.value) {
      image.classList.add('is-revealed')
      return
    }

    context?.revert()
    context = gsap.context(() => {
      gsap.fromTo(
        image,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.025 },
        {
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => image.classList.add('is-revealed'),
        },
      )
    }, container.value ?? undefined)
  }

  const handleLoad = () => {
    isLoaded.value = true
    void reveal()
  }

  const handleError = () => {
    hasError.value = true
    isLoaded.value = true
    isVisible.value = true
  }

  watch(prefersReducedMotion, (reduced) => {
    if (!reduced) return
    context?.revert()
    context = undefined
    const image = container.value?.querySelector('img')
    if (image && isLoaded.value) {
      image.style.opacity = '1'
      image.style.removeProperty('clip-path')
      image.style.removeProperty('transform')
    }
  })

  onMounted(() => {
    if (!container.value) return
    if (!('IntersectionObserver' in window)) {
      shouldLoad.value = true
      isVisible.value = true
      return
    }

    visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        isVisible.value = entry.isIntersecting
        if (entry.isIntersecting) void reveal()
      },
      { threshold: 0.01 },
    )
    visibilityObserver.observe(container.value)

    if (!shouldLoad.value) {
      loadObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            shouldLoad.value = true
            loadObserver?.disconnect()
          }
        },
        { rootMargin: '180px 0px', threshold: 0.01 },
      )
      loadObserver.observe(container.value)
    }
  })

  onUnmounted(() => {
    loadObserver?.disconnect()
    visibilityObserver?.disconnect()
    context?.revert()
  })

  return { shouldLoad, isLoaded, hasError, handleLoad, handleError }
}
