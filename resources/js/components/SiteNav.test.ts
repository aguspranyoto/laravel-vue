import type { AuthUser } from '@/types'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, nextTick } from 'vue'
import SiteNav from '@/components/SiteNav.vue'

const { mockUser, mockToggleNav, mockMobileNavOpen, mockRouterPost } = vi.hoisted(() => ({
  mockUser: { value: null as AuthUser | null },
  mockToggleNav: vi.fn(),
  mockMobileNavOpen: { value: false },
  mockRouterPost: vi.fn(),
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
    post: mockRouterPost,
  },
}))

beforeEach(() => {
  setActivePinia(createPinia())
  mockUser.value = null
  mockMobileNavOpen.value = false
  mockToggleNav.mockClear()
  mockRouterPost.mockClear()
  vi.useRealTimers()
})

function mountNav() {
  return mount(SiteNav, {
    global: {
      stubs: { ThemeSwitcher: true },
    },
  })
}

function menuTrigger(wrapper: ReturnType<typeof mountNav>) {
  return wrapper.find('button[aria-haspopup="menu"]')
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
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('mouseenter')
    const menu = wrapper.find('[role="menu"]')
    expect(menu.isVisible()).toBe(true)
    expect(menu.text()).toContain('Account')
    expect(menu.text()).toContain('Sign out')
    expect(menu.text()).not.toContain('Admin panel')
  })

  it('shows the signed-in email inside the card', async () => {
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('mouseenter')
    expect(wrapper.find('[role="menu"]').text()).toContain('agus@example.com')
  })

  it('marks the trigger expanded and rotates the chevron when open', async () => {
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    const trigger = menuTrigger(wrapper)
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await trigger.trigger('mouseenter')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('button[aria-haspopup="menu"] svg').classes()).toContain('rotate-180')
  })

  it('shows Admin panel only for admins', async () => {
    mockUser.value = {
      id: 1,
      name: 'Agus',
      email: 'agus@example.com',
      is_admin: true,
    }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('mouseenter')
    expect(wrapper.find('[role="menu"]').text()).toContain('Admin panel')
  })

  it('closes the card after the mouseleave delay', async () => {
    vi.useFakeTimers()
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('mouseenter')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(true)
    await wrapper.find('div.relative').trigger('mouseleave')
    vi.advanceTimersByTime(150)
    await nextTick()
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(false)
  })

  it('stays open when re-entering before the delay elapses', async () => {
    vi.useFakeTimers()
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('mouseenter')
    await wrapper.find('div.relative').trigger('mouseleave')
    await menuTrigger(wrapper).trigger('mouseenter')
    vi.advanceTimersByTime(300)
    await nextTick()
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(true)
  })

  it('toggles the card on trigger click', async () => {
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    const trigger = menuTrigger(wrapper)
    await trigger.trigger('click')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(true)
    await trigger.trigger('click')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(false)
  })

  it('opens the card on trigger focus', async () => {
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('focus')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(true)
  })

  it('closes the card when Account is clicked', async () => {
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('mouseenter')
    const account = wrapper.find('[role="menu"] a[href="/account"]')
    await account.trigger('click')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(false)
  })

  it('calls logout and closes the card on Sign out click', async () => {
    mockUser.value = { id: 1, name: 'Agus', email: 'agus@example.com' }
    const wrapper = mountNav()
    await menuTrigger(wrapper).trigger('mouseenter')
    await wrapper.find('[role="menu"] button.text-red-600').trigger('click')
    expect(mockRouterPost).toHaveBeenCalledWith('/logout')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(false)
  })

  it('toggles the mobile menu', async () => {
    const wrapper = mountNav()
    await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
    expect(mockToggleNav).toHaveBeenCalled()
  })
})
