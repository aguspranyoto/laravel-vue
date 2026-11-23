<script setup lang="ts">
import type { Paginated, PostCard, Seo } from '@/types'
import { Link } from '@inertiajs/vue3'
import SeoHead from '@/components/SeoHead.vue'

defineProps<{ seo?: Seo | null, posts: Paginated<PostCard> }>()
</script>

<template>
  <SeoHead :seo="seo" />
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <h1 class="text-4xl font-bold tracking-tight">
      Blog
    </h1>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        v-for="post in posts.data"
        :key="post.slug"
        :href="`/blog/${post.slug}`"
        class="flex flex-col rounded-2xl border border-neutral-200 p-5 transition hover:shadow-sm dark:border-neutral-800"
      >
        <img v-if="post.featured" :src="post.featured" :alt="post.title" loading="lazy" class="mb-4 aspect-video w-full rounded-xl object-cover">
        <p class="text-lg font-semibold">
          {{ post.title }}
        </p>
        <p v-if="post.excerpt" class="mt-2 text-sm text-neutral-500 line-clamp-3">
          {{ post.excerpt }}
        </p>
        <p v-if="post.published_at" class="mt-auto pt-4 text-xs text-neutral-400">
          {{ post.published_at }}<span v-if="post.reading_minutes"> · {{ post.reading_minutes }} min read</span>
        </p>
      </Link>
    </div>
    <nav v-if="posts.last_page > 1" class="mt-10 flex flex-wrap gap-2" aria-label="Pagination">
      <template v-for="link in posts.links" :key="link.label">
        <span
          v-if="!link.url"
          class="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm opacity-50 dark:border-neutral-800"
          v-html="link.label"
        />
        <Link
          v-else
          :href="link.url"
          class="rounded-lg border px-3 py-1.5 text-sm" :class="[link.active ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950' : 'border-neutral-200 dark:border-neutral-800']"
        >
          <span v-html="link.label" />
        </Link>
      </template>
    </nav>
  </div>
</template>
