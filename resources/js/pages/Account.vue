<script setup lang="ts">
import type { Seo } from '@/types'
import { router } from '@inertiajs/vue3'
import SeoHead from '@/components/SeoHead.vue'
import { useShared } from '@/composables/useShared'

defineProps<{ seo?: Seo | null }>()

const { user } = useShared()

function logout() {
  router.post('/logout')
}
</script>

<template>
  <SeoHead :seo="seo" />
  <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
    <h1 class="text-4xl font-bold tracking-tight">
      Account
    </h1>
    <div class="mt-8 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
      <p class="text-sm text-neutral-500">
        Signed in as
      </p>
      <p class="mt-1 text-lg font-semibold">
        {{ user?.name }}
      </p>
      <p class="text-sm text-neutral-500">
        {{ user?.email }}
      </p>
      <button type="button" class="mt-6 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold dark:border-neutral-700" @click="logout">
        Sign out
      </button>
    </div>
  </div>
</template>
