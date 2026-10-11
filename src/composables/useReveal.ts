import { onMounted, onUnmounted, watch, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(root: Ref<HTMLElement | null>) {
  const { prefersReducedMotion } = useReducedMotion()
  let context: gsap.Context | undefined

  function createReveals() {
    if (prefersReducedMotion.value || !root.value || context) return
    context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'transform,opacity,visibility',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })
    }, root.value)
  }

  function revealImmediately() {
    context?.revert()
    context = undefined
    root.value?.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
      element.style.opacity = '1'
      element.style.visibility = 'visible'
      element.style.removeProperty('transform')
    })
  }

  onMounted(createReveals)

  watch(prefersReducedMotion, (reduced) => {
    if (reduced) revealImmediately()
    else createReveals()
  })

  onUnmounted(() => context?.revert())
}
