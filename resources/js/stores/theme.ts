import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
    return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('system')

  const resolved = computed<'light' | 'dark'>(() => {
    if (theme.value === 'system') {
      return systemPrefersDark()
        ? 'dark'
        : 'light'
    }
    return theme.value
  })

  function apply(value: 'light' | 'dark') {
    if (typeof document === 'undefined')
      return
    document.documentElement.classList.toggle('dark', value === 'dark')
    document.documentElement.style.colorScheme = value
  }

  function set(value: Theme) {
    theme.value = value
    try {
      document.cookie = `theme=${value}; path=/; max-age=31536000; SameSite=Lax`
      if (typeof localStorage !== 'undefined')
        localStorage.setItem('theme', value)
    }
    catch { /* noop */ }
    apply(resolved.value)
  }

  function init(initial?: Theme | string | null) {
    let start: Theme = 'system'
    if (initial === 'light' || initial === 'dark' || initial === 'system') {
      start = initial
    }
    else if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark' || saved === 'system')
        start = saved
    }
    theme.value = start
    apply(resolved.value)

    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (theme.value === 'system')
          apply(resolved.value)
      })
    }
  }

  return { theme, resolved, set, init }
})
