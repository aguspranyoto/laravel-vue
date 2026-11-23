<script setup lang="ts">
import type { Paginated, ProjectCard, Seo } from '@/types'
import { Link } from '@inertiajs/vue3'
import SeoHead from '@/components/SeoHead.vue'

defineProps<{ seo?: Seo | null, projects: Paginated<ProjectCard> }>()
</script>

<template>
  <SeoHead :seo="seo" />
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <h1 class="text-4xl font-bold tracking-tight">
      Work
    </h1>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        v-for="project in projects.data"
        :key="project.slug"
        :href="`/work/${project.slug}`"
        class="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800"
      >
        <img v-if="project.cover" :src="project.cover" :alt="project.title" loading="lazy" class="aspect-video w-full object-cover">
        <div class="p-4">
          <p class="text-lg font-semibold group-hover:underline">
            {{ project.title }}
          </p>
          <p v-if="project.summary" class="mt-1 text-sm text-neutral-500 line-clamp-2">
            {{ project.summary }}
          </p>
        </div>
      </Link>
    </div>
  </div>
</template>
