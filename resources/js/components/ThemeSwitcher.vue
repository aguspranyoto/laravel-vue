<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

function cycle() {
  const next = theme.theme === 'light'
    ? 'dark'
    : theme.theme === 'dark'
      ? 'system'
      : 'light'
  theme.set(next)
}
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900"
    :aria-label="`Theme: ${theme.theme}. Activate to switch.`"
    :title="`Theme: ${theme.theme}`"
    @click="cycle"
  >
    <span v-if="theme.resolved === 'dark'" aria-hidden="true">◐</span>
    <span v-else aria-hidden="true">◑</span>
  </button>
</template>
