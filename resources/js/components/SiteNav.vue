<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useShared } from '@/composables/useShared'
import { useUiStore } from '@/stores/ui'

const { user } = useShared()
const ui = useUiStore()

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
        <Link
          v-else
          href="/account"
          class="hidden rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold md:inline-flex dark:border-neutral-800"
        >
          {{ user.name }}
        </Link>
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
