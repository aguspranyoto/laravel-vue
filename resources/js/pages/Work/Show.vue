<script setup lang="ts">
import type { Seo } from '@/types'
import RichContent from '@/components/RichContent.vue'
import SeoHead from '@/components/SeoHead.vue'

defineProps<{
  seo?: Seo | null
  project: {
    title: string
    client?: string | null
    summary?: string | null
    content_html?: string | null
    project_url?: string | null
    year?: number | null
    tags?: string[] | null
    cover?: string | null
    gallery?: string[]
  }
}>()
</script>

<template>
  <SeoHead :seo="seo" />
  <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <img v-if="project.cover" :src="project.cover" :alt="project.title" class="mb-8 aspect-video w-full rounded-2xl object-cover">
    <p v-if="project.client" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
      {{ project.client }}<span v-if="project.year"> · {{ project.year }}</span>
    </p>
    <h1 class="mt-2 text-4xl font-bold tracking-tight text-balance">
      {{ project.title }}
    </h1>
    <RichContent :html="project.content_html" class="mt-6" />
    <div v-if="project.gallery?.length" class="mt-8 grid gap-4 sm:grid-cols-2">
      <img v-for="(src, i) in project.gallery" :key="i" :src="src" :alt="`${project.title} image ${i + 1}`" loading="lazy" class="rounded-xl">
    </div>
    <p v-if="project.project_url" class="mt-8">
      <a :href="project.project_url" target="_blank" rel="noopener" class="text-sm font-semibold underline underline-offset-4">
        Visit live site →
      </a>
    </p>
  </article>
</template>
