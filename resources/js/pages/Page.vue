<script setup lang="ts">
import type { Seo } from '@/types'
import { Link } from '@inertiajs/vue3'
import RichContent from '@/components/RichContent.vue'
import SeoHead from '@/components/SeoHead.vue'

defineProps<{
  seo?: Seo | null
  page: { title: string, excerpt?: string | null, content_html?: string | null, hero?: string | null }
}>()
</script>

<template>
  <SeoHead :seo="seo" />
  <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <img v-if="page.hero" :src="page.hero" :alt="page.title" class="mb-8 aspect-video w-full rounded-2xl object-cover">
    <h1 class="text-4xl font-bold tracking-tight text-balance">
      {{ page.title }}
    </h1>
    <p v-if="page.excerpt" class="mt-3 text-lg text-neutral-500">
      {{ page.excerpt }}
    </p>
    <RichContent :html="page.content_html" class="mt-6" />
    <p class="mt-10">
      <Link href="/contact" class="inline-flex rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-950">
        Work with us
      </Link>
    </p>
  </article>
</template>
