import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'

const { mockFlash, mockUser } = vi.hoisted(() => ({
  mockFlash: { value: {} as { type?: string, message?: string } },
  mockUser: { value: null as null | { id: number, name: string, email: string } },
}))

const { toastSuccess, toastError, toastMessage } = vi.hoisted(() => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
  toastMessage: vi.fn(),
}))

vi.mock('@/composables/useShared', () => ({
  useShared: () => ({
    user: computed(() => mockUser.value),
    flash: computed(() => mockFlash.value),
    serverTheme: computed(() => 'system'),
  }),
}))

vi.mock('vue-sonner', () => ({
  Toaster: { name: 'Toaster', template: '<div />' },
  toast: {
    success: (...args: unknown[]) => (toastSuccess as (...a: unknown[]) => void)(...args),
    error: (...args: unknown[]) => (toastError as (...a: unknown[]) => void)(...args),
    message: (...args: unknown[]) => (toastMessage as (...a: unknown[]) => void)(...args),
  },
}))

vi.mock('@/components/SiteNav.vue', () => ({
  default: { name: 'SiteNav', template: '<nav />' },
}))

vi.mock('@/components/SiteFooter.vue', () => ({
  default: { name: 'SiteFooter', template: '<footer />' },
}))

vi.mock('@inertiajs/vue3', async importOriginal => ({
  ...(await importOriginal<typeof import('@inertiajs/vue3')>()),
  router: {
    on: vi.fn(),
  },
}))

beforeEach(() => {
  setActivePinia(createPinia())
  mockFlash.value = {}
  mockUser.value = null
  toastSuccess.mockClear()
  toastError.mockClear()
  toastMessage.mockClear()
})

describe('appLayout flash toasts', () => {
  it('shows a success toast for success flash', () => {
    mockFlash.value = { type: 'success', message: 'Check your inbox for the sign-in link.' }
    mount(AppLayout, {
      slots: { default: '<p>hi</p>' },
    })
    expect(toastSuccess).toHaveBeenCalledWith('Check your inbox for the sign-in link.')
    expect(toastError).not.toHaveBeenCalled()
  })

  it('shows an error toast for error flash', () => {
    mockFlash.value = { type: 'error', message: 'This sign-in link is invalid or has expired.' }
    mount(AppLayout, {
      slots: { default: '<p>hi</p>' },
    })
    expect(toastError).toHaveBeenCalledWith('This sign-in link is invalid or has expired.')
    expect(toastSuccess).not.toHaveBeenCalled()
  })

  it('shows nothing without a flash message', () => {
    mount(AppLayout, {
      slots: { default: '<p>hi</p>' },
    })
    expect(toastSuccess).not.toHaveBeenCalled()
    expect(toastError).not.toHaveBeenCalled()
    expect(toastMessage).not.toHaveBeenCalled()
  })
})
