import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export type ThemePreference = 'system' | 'light' | 'dark'

const storageKey = 'portfolio-theme'

function readPreference(): ThemePreference {
  try {
    const value = window.localStorage.getItem(storageKey)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

export function useTheme() {
  const { t } = useI18n({ useScope: 'global' })
  const preference = ref<ThemePreference>(readPreference())
  const systemDark = ref(false)
  const resolvedTheme = computed(() => preference.value === 'system'
    ? (systemDark.value ? 'dark' : 'light')
    : preference.value)
  const preferenceLabel = computed(() => {
    if (preference.value === 'system') return t('theme.preference.system')
    if (preference.value === 'light') return t('theme.preference.light')
    return t('theme.preference.dark')
  })
  const toggleLabel = computed(() => {
    const resolvedLabel = resolvedTheme.value === 'dark' ? t('theme.preference.dark') : t('theme.preference.light')
    const nextLabel = preference.value === 'system'
      ? t('theme.preference.light')
      : preference.value === 'light'
        ? t('theme.preference.dark')
        : t('theme.preference.system')
    return t('theme.toggle', { preference: preferenceLabel.value, resolved: resolvedLabel, next: nextLabel })
  })
  const icon = computed(() => preference.value === 'system' ? '◉' : preference.value === 'light' ? '☼' : '◐')

  let mediaQuery: MediaQueryList | undefined

  function applyTheme() {
    const theme = resolvedTheme.value
    document.documentElement.dataset.theme = theme
    const color = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', color)
  }

  function updateSystemTheme() {
    systemDark.value = Boolean(mediaQuery?.matches)
    if (preference.value === 'system') applyTheme()
  }

  function setPreference(next: ThemePreference) {
    preference.value = next
    try {
      if (next === 'system') window.localStorage.removeItem(storageKey)
      else window.localStorage.setItem(storageKey, next)
    } catch {
      // Theme selection remains usable when browser storage is unavailable.
    }
    applyTheme()
  }

  function cyclePreference() {
    const next: ThemePreference = preference.value === 'system'
      ? 'light'
      : preference.value === 'light'
        ? 'dark'
        : 'system'
    setPreference(next)
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    updateSystemTheme()
    mediaQuery.addEventListener('change', updateSystemTheme)
  })

  onUnmounted(() => mediaQuery?.removeEventListener('change', updateSystemTheme))

  return { preferenceLabel, resolvedTheme, toggleLabel, icon, cyclePreference }
}
