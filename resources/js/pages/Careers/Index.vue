<script setup lang="ts">
import type { Seo } from '@/types'
import { Link } from '@inertiajs/vue3'
import SeoHead from '@/components/SeoHead.vue'

interface Vacancy {
  slug: string
  title: string
  location?: string | null
  employment_type?: string | null
}

defineProps<{ seo?: Seo | null, vacancies: Vacancy[] }>()
</script>

<template>
  <SeoHead :seo="seo" />
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <h1 class="text-4xl font-bold tracking-tight">
      Careers
    </h1>
    <p class="mt-3 text-neutral-500">
      Join us in shipping production-grade websites.
    </p>
    <div v-if="vacancies.length" class="mt-8 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
      <Link
        v-for="vacancy in vacancies"
        :key="vacancy.slug"
        :href="`/careers/${vacancy.slug}`"
        class="flex items-center justify-between gap-4 p-5 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
      >
        <div>
          <p class="font-semibold">
            {{ vacancy.title }}
          </p>
          <p class="text-sm text-neutral-500">
            {{ vacancy.location }}<span v-if="vacancy.employment_type"> · {{ vacancy.employment_type }}</span>
          </p>
        </div>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
    <p v-else class="mt-8 rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
      No open roles right now — check back soon.
    </p>
  </div>
</template>
