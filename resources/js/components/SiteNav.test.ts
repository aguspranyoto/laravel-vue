import type { AuthUser } from '@/types'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import SiteNav from '@/components/SiteNav.vue'

const { mockUser, mockToggleNav, mockMobileNavOpen } = vi.hoisted(() => ({
  mockUser: { value: null as AuthUser | null },
  mockToggleNav: vi.fn(),
  mockMobileNavOpen: { value: false },
}))

vi.mock('@/composables/useShared', () => ({
  useShared: () => ({
    user: computed(() => mockUser.value),
    flash: computed(() => ({})),
    serverTheme: computed(() => 'system'),
  }),
}))

vi.mock('@/stores/ui', () => ({
  useUiStore: () => ({
    mobileNavOpen: mockMobileNavOpen.value,
    toggleNav: mockToggleNav,
  }),
}))

vi.mock('@/components/ThemeSwitcher.vue', () => ({
  default: { name: 'ThemeSwitcher', template: '<button aria-label="theme" />' },
}))

vi.mock('@inertiajs/vue3', async importOriginal => ({
  ...(await importOriginal<typeof import('@inertiajs/vue3')>()),
  Link: {
    name: 'Link',
    props: ['href'],
    template: '<a :href="href"><slot /></a>',
  },
  router: {
    post: vi.fn(),
  },
}))

beforeEach(() => {
  setActivePinia(createPinia())
  mockUser.value = null
  mockMobileNavOpen.value = false
  mockToggleNav.mockClear()
  vi.useRealTimers()
})

function mountNav() {
  return mount(SiteNav, {
    global: {
      stubs: { ThemeSwitcher: true },
    },
  })
}

describe('siteNav', () => {
  it('shows Sign in when logged out', () => {
    const wrapper = mountNav()
    expect(wrapper.text()).toContain('Sign in')
    expect(wrapper.text()).not.toContain('Sign out')
  })

  it('shows the user name when logged in', () => {
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    expect(wrapper.text()).toContain('Agus')
    expect(wrapper.text()).not.toContain('Sign in')
  })

  it('opens the hover card with Account and Sign out', async () => {
    vi.useFakeTimers()
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await wrapper.find('button[aria-haspopup="menu"]').trigger('mouseenter')
    const menu = wrapper.find('[role="menu"]')
    expect(menu.isVisible()).toBe(true)
    expect(menu.text()).toContain('Account')
    expect(menu.text()).toContain('Sign out')
    expect(menu.text()).not.toContain('Admin panel')
  })

  it('shows Admin panel only for admins', async () => {
    mockUser.value = {
      id: 1,
      name: 'Agus',
      email: 'agus@example.com',
      is_admin: true,
    }
    const wrapper = mountNav()
    await wrapper.find('button[aria-haspopup="menu"]').trigger('mouseenter')
    expect(wrapper.find('[role="menu"]').text()).toContain('Admin panel')
  })

  it('calls logout on Sign out click', async () => {
    const { router } = await import('@inertiajs/vue3')
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await wrapper.find('button[aria-haspopup="menu"]').trigger('mouseenter')
    await wrapper.find('[role="menu"] button.text-red-600').trigger('click')
    expect(vi.mocked(router.post)).toHaveBeenCalledWith('/logout')
  })

  it('toggles the mobile menu', async () => {
    const wrapper = mountNav()
    await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
    expect(mockToggleNav).toHaveBeenCalled()
  })
})
