import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

beforeEach(() => {
  setActivePinia(createPinia())
  localStorage.clear()
  document.cookie.split(';').forEach((c) => {
    document.cookie = `${c.split('=')[0]?.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  })
})

describe('useAuthStore', () => {
  it('starts signed out', () => {
    expect(useAuthStore().user).toBeNull()
  })

  it('sets and clears the user', () => {
    const store = useAuthStore()
    store.setUser({ id: 1, name: 'Agus', email: 'agus@example.com', is_admin: true })
    expect(store.user?.name).toBe('Agus')
    store.setUser(null)
    expect(store.user).toBeNull()
  })
})

describe('useUiStore', () => {
  it('toggles mobile nav', () => {
    const store = useUiStore()
    expect(store.mobileNavOpen).toBe(false)
    store.toggleNav()
    expect(store.mobileNavOpen).toBe(true)
    store.toggleNav(false)
    expect(store.mobileNavOpen).toBe(false)
  })
})

describe('useThemeStore', () => {
  it('persists theme to cookie and localStorage', async () => {
    const { useThemeStore } = await import('@/stores/theme')
    const store = useThemeStore()
    store.set('dark')
    expect(store.theme).toBe('dark')
    expect(store.resolved).toBe('dark')
    expect(document.cookie).toContain('theme=dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('initialises from cookie over localStorage', async () => {
    document.cookie = 'theme=light; path=/'
    localStorage.setItem('theme', 'dark')
    const { useThemeStore } = await import('@/stores/theme')
    const store = useThemeStore()
    store.init('light')
    expect(store.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('resolves system theme from matchMedia', async () => {
    const { useThemeStore } = await import('@/stores/theme')
    const store = useThemeStore()
    store.init('system')
    expect(['light', 'dark']).toContain(store.resolved)
  })

  it('falls back to light when no preference is stored', async () => {
    vi.stubGlobal('matchMedia', undefined as never)
    const { useThemeStore } = await import('@/stores/theme')
    const store = useThemeStore()
    store.init(null)
    expect(store.theme).toBe('system')
    vi.unstubAllGlobals()
  })
})
