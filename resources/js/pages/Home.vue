<script setup lang="ts">
import type { PostCard, ProjectCard, Seo } from '@/types'
import { Link } from '@inertiajs/vue3'
import SeoHead from '@/components/SeoHead.vue'

interface Testimonial {
  id: number
  author: string
  role?: string | null
  company?: string | null
  quote: string
}

defineProps<{
  seo?: Seo | null
  posts: PostCard[]
  projects: ProjectCard[]
  testimonials: Testimonial[]
}>()
</script>

<template>
  <SeoHead :seo="seo" />
  <section class="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6">
    <p class="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
      Laravel · Filament · Vue
    </p>
    <h1 class="mt-3 max-w-3xl text-5xl font-bold tracking-tight text-balance">
      Production-grade websites, shipped fast.
    </h1>
    <p class="mt-4 max-w-2xl text-lg text-neutral-500">
      We build company sites with a real CMS, passwordless login, SEO-ready SSR, and media on Cloudflare R2.
    </p>
    <div class="mt-8 flex gap-3">
      <Link href="/work" class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-950">
        See our work
      </Link>
      <Link href="/contact" class="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold dark:border-neutral-700">
        Contact us
      </Link>
    </div>
  </section>

  <section v-if="projects.length" class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <h2 class="text-2xl font-bold tracking-tight">
      Selected work
    </h2>
    <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        v-for="project in projects"
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
  </section>

  <section v-if="posts.length" class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <div class="flex items-baseline justify-between">
      <h2 class="text-2xl font-bold tracking-tight">
        Latest posts
      </h2>
      <Link href="/blog" class="text-sm font-semibold hover:underline">
        All posts →
      </Link>
    </div>
    <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        v-for="post in posts"
        :key="post.slug"
        :href="`/blog/${post.slug}`"
        class="rounded-2xl border border-neutral-200 p-5 transition hover:shadow-sm dark:border-neutral-800"
      >
        <p class="text-lg font-semibold">
          {{ post.title }}
        </p>
        <p v-if="post.excerpt" class="mt-2 text-sm text-neutral-500 line-clamp-3">
          {{ post.excerpt }}
        </p>
      </Link>
    </div>
  </section>

  <section v-if="testimonials.length" class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <h2 class="text-2xl font-bold tracking-tight">
      What clients say
    </h2>
    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <figure v-for="t in testimonials" :key="t.id" class="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
        <blockquote class="text-neutral-700 dark:text-neutral-300">
          “{{ t.quote }}”
        </blockquote>
        <figcaption class="mt-4 text-sm font-semibold">
          {{ t.author }}
          <span v-if="t.company" class="font-normal text-neutral-500"> · {{ t.company }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
