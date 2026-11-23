<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useShared } from '@/composables/useShared'
import { useUiStore } from '@/stores/ui'

const { user } = useShared()
const ui = useUiStore()
const menuOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null

function openMenu() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  menuOpen.value = true
}

function scheduleClose() {
  if (closeTimer)
    clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    menuOpen.value = false
    closeTimer = null
  }, 150)
}

function logout() {
  menuOpen.value = false
  router.post('/logout')
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Primary">
      <Link href="/" class="text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
        Acme Co
      </Link>

      <div class="hidden items-center gap-1 md:flex">
        <Link
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          {{ link.label }}
        </Link>
      </div>

      <div class="flex items-center gap-2">
        <ThemeSwitcher />
        <Link
          v-if="!user"
          href="/login"
          class="hidden rounded-lg bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex dark:bg-white dark:text-neutral-950"
        >
          Sign in
        </Link>
        <div
          v-else
          class="relative hidden md:block"
          @mouseenter="openMenu"
          @mouseleave="scheduleClose"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold dark:border-neutral-800"
            :aria-expanded="menuOpen"
            aria-haspopup="menu"
            @click="menuOpen = !menuOpen"
            @focus="openMenu"
          >
            {{ user.name }}
            <svg
              class="h-3.5 w-3.5 text-neutral-500 transition-transform dark:text-neutral-400"
              :class="{ 'rotate-180': menuOpen }"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <div
            v-show="menuOpen"
            role="menu"
            class="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
          >
            <p class="truncate border-b border-neutral-100 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-900">
              {{ user.email }}
            </p>
            <Link
              href="/account"
              role="menuitem"
              class="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
              @click="menuOpen = false"
            >
              Account
            </Link>
            <a
              v-if="user.is_admin"
              href="/admin"
              role="menuitem"
              class="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              Admin panel
            </a>
            <button
              type="button"
              role="menuitem"
              class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              @click="logout"
            >
              Sign out
            </button>
          </div>
        </div>
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 md:hidden dark:border-neutral-800"
          aria-label="Toggle menu"
          @click="ui.toggleNav()"
        >
          ☰
        </button>
      </div>
    </nav>

    <div v-if="ui.mobileNavOpen" class="border-t border-neutral-200 px-4 py-3 md:hidden dark:border-neutral-800">
      <div class="grid gap-1">
        <Link
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3 py-2 text-sm font-medium"
          @click="ui.toggleNav(false)"
        >
          {{ link.label }}
        </Link>
      </div>
    </div>
  </header>
</template>
